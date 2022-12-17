package server

import (
	"fmt"
	"github.com/gorilla/websocket"
	"time"
)

type House struct {
	conn01   *websocket.Conn
	conn02   *websocket.Conn
	info     chan string
	usrCount int
}

var houseMap map[string]*House

func Deal(houseCode string) {
	var h = houseMap[houseCode]
	for {
		if h.usrCount == 2 {
			for {
				select {
				case inf := <-h.info:
					fmt.Println("相互发送消息")
					h.conn01.WriteMessage(websocket.TextMessage, []byte(inf))
					h.conn02.WriteMessage(websocket.TextMessage, []byte(inf))

				}
			}

		}
		time.Sleep(time.Second)
	}

}

func ReceiveMessage(houseCode string, conn *websocket.Conn) {
	var h = houseMap[houseCode]
	for {
		_, msg, _ := conn.ReadMessage()
		fmt.Println("ReceiveMessage():", string(msg))
		h.info <- string(msg)

	}
}

func init() {
	houseMap = make(map[string]*House, 100)

}
