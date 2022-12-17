package server

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"
)

// Conn类型表示WebSocket连接。服务器应用程序从HTTP请求处理程序调用Upgrader.Upgrade方法以获取* Conn：
// var upgrader = websocket.Upgrader{}
var (
	upgrader = websocket.Upgrader{
		// 读取存储空间大小
		ReadBufferSize: 1024,
		// 写入存储空间大小
		WriteBufferSize: 1024,
		// 允许跨域
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

func wsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hava connection")

	//   完成握手 升级为 WebSocket长连接，使用conn发送和接收消息。
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade:", err)
		return
	}
	_, houseCode, _ := conn.ReadMessage()
	fmt.Println("a", string(houseCode))
	fmt.Println(len(string(houseCode)))
	value, ok := houseMap[string(houseCode)]

	if ok {
		value.conn02 = conn
		value.usrCount = 2
	} else {
		var h = House{
			usrCount: 1,
			conn01:   conn,
		}
		h.info = make(chan string, 100)
		houseMap[string(houseCode)] = &h

	}

	go Deal(string(houseCode))
	go ReceiveMessage(string(houseCode), conn)

	//调用连接的WriteMessage和ReadMessage方法以一片字节发送和接收消息。实现如何回显消息：
	//p是一个[]字节，messageType是一个值为websocket.BinaryMessage或websocket.TextMessage的int。

}

func index(w http.ResponseWriter, r *http.Request) {
	file, err := os.ReadFile("static/index.html")
	if err != nil {

	}
	w.WriteHeader(200)
	w.Write(file)

}

func Run() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/msg", wsHandler)
	http.HandleFunc("/", index)

	// 监听 地址 端口
	err := http.ListenAndServe(":80", nil)
	if err != nil {
		log.Fatal("ListenAndServe", err.Error())
	}
}
