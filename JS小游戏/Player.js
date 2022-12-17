//键盘监听类
function player(main){
    addEventListener("keydown",function (e){

        // console.log(e.keyCode);
        if(e.keyCode===38){
            main.direction=1;
main.bulletdirection=1;

        }else if(e.keyCode===40){

            main.direction=2;
main.bulletdirection=2;
        }else if(e.keyCode===37){

            main.direction=3;
            main.bulletdirection=3;
        }else if(e.keyCode===39){

            main.direction=4;
            main.bulletdirection=4
        }else if(e.keyCode===32){
            if(main.isCanshot){
                main.my.shot();
                new shotinterval(main);
            }



        }


    })
    addEventListener("keyup",function (){

        main.direction=0;
    })


}
//键盘监听类

