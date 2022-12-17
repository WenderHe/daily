window.onload=()=>{

    let local_video=document.querySelector("#local_video")
    let remote_video=document.querySelector("#remote_video")
    let open_camera=document.querySelector(".open_camera")
    let home_code=document.querySelector(".home_code")
    let create=document.querySelector(".create")
    let join=document.querySelector(".join")
    let house_code //房间id
   let local_stream=null
    // local_video.srcObject=local_stream
    let rtc=null
    let ws=null
    let uId =null
    // ws = new WebSocket("ws://localhost:8080/msg");
    //
    // ws.onopen = function(evt) {
    //     console.log("Connection open ...");
    //     // ws.send("Hello WebSockets!");
    // };
    //
    // ws.onmessage = message
    //
    // ws.onclose = function(evt) {
    //     console.log("Connection closed.");
    // };
function initWs(){
    ws = new WebSocket("ws://43.142.38.198:80/msg");

    ws.onopen = function(evt) {
        console.log("Connection open ...");
        // ws.send("Hello WebSockets!");
    };

    ws.onmessage = message

    ws.onclose = function(evt) {
        console.log("Connection closed.");
    };
}
    initWs()
    function message(e){
        console.log("receive msg")
        const wsData = JSON.parse(e.data)
        // console.log('wsData', wsData)
        let u_id=wsData['uId']
        if(u_id===uId){
            console.log("return")
            return  //如果是本链接发的消息就忽略

        }

        const wsType = wsData['type']
        console.log('wsType', wsType)

        if (wsType === 'offer') {
            const wsOffer = wsData['data']
            rtc.setRemoteDescription(new RTCSessionDescription(JSON.parse(wsOffer)))
            create_answer()
            // addLocalStreamToRtcConnection()

        }
        if (wsType === 'answer') {
            const wsAnswer = wsData['data']
            rtc.setRemoteDescription(new RTCSessionDescription(JSON.parse(wsAnswer)))

        }

        if (wsType === 'candidate') {
            const wsCandidate = JSON.parse(wsData['data'])
            rtc.addIceCandidate(new RTCIceCandidate(wsCandidate))
            console.log('添加候选成功', wsCandidate)
        }

    }

//打开相机
open_camera.addEventListener("click",()=>{
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio:false
    }).then(stream=>{
        local_stream=stream
        local_video.srcObject=local_stream
    })
})

    function create_rtcConnection(){
        rtc=new RTCPeerConnection({
            iceServers: [
                {
                    urls: ['stun:stun.stunprotocol.org:3478'],
                },{
                    urls: "turn:43.142.38.198:3478",
                    username:"chr",
                    credential:"123456"
                }
            ]
        })
        rtc.onicecandidate=e=>{
            if (e.candidate) {
                console.log('candidate', JSON.stringify(e.candidate))

                ws.send(JSON.stringify({
                    "uId":uId,
                    "houseCode":house_code,
                    "type":"candidate",
                    "data":JSON.stringify(e.candidate)
                }))
                //wsSend(house_code,'candidate', JSON.stringify(e.candidate))
            }
        }
        rtc.ontrack=e=>{
            remote_video.srcObject=e.streams[0]
        }

    }

    let create_offer=()=>{
        rtc.createOffer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
        }).then(sdp=>{
            rtc.setLocalDescription(sdp).then(()=>{
                //将sdp发送给远端
                //wsSend(house_code,'offer',JSON.stringify(sdp))
                ws.send(JSON.stringify({
                    "uId":uId,
                    "houseCode":house_code,
                    "type":"offer",
                    "data":JSON.stringify(sdp)
                }))
            })
        })
    }

    let create_answer=()=>{
        rtc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
        }).then(sdp=>{
            rtc.setLocalDescription(sdp).then(()=>{
                //将sdp发送给远端
                ws.send(JSON.stringify({
                    "uId":uId,
                    "houseCode":house_code,
                    "type":"answer",
                    "data":JSON.stringify(sdp)
                }))
                //wsSend(house_code,'answer',JSON.stringify(sdp))
            })
        })
    }

    let addLocalStreamToRtcConnection = () => {

        // let localStream = localStreamRef.current!
        //     localStream.getTracks().forEach(track => {
        //         pc.current!.addTrack(track, localStream)
        //     })
        // console.log('将本地视频流添加到 RTC 连接成功')
        local_stream.getTracks().forEach(track=>{
            rtc.addTrack(track,local_stream)


        })


    }

    create.addEventListener("click",()=>{
        house_code=home_code.value
        if(house_code.length>0&&house_code.length<=8){

            ws.send(house_code)
           uId=Math.floor(Math.random()*1000000)+""


            create_rtcConnection()
            addLocalStreamToRtcConnection()
            create_offer()


        }

    })

    join.addEventListener("click",()=>{
        house_code=home_code.value
        if(house_code.length>0&&house_code.length<=8){
            uId=Math.floor(Math.random()*1000000)+""
            ws.send(house_code)
            create_rtcConnection()

           // create_answer()
            addLocalStreamToRtcConnection()



        }
    })


  



}