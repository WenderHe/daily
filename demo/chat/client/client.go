package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

var msg = make(chan string)

func read() {
	for { //从msg里读出信息并将信息写到控制台
		m := <-msg
		fmt.Print(m)
	}
}

func write(conn net.Conn) {
	for { //读取server端发来地信息,并将信息写到全局的msg里
		s := make([]byte, 10, 10)

		n, err := conn.Read(s)
		if err != nil {
			fmt.Println("err:", err)
		}

		msg <- string(s[:n])

	}

}

func main() {

	conn, err := net.Dial("tcp", "127.0.0.1:9000") //发送连接请求
	if err != nil {
		fmt.Println("err: ", err)
	}
	defer conn.Close()
	go read()
	go write(conn)
	for { //读取用户从控制台输入地信息
		reader := bufio.NewReader(os.Stdin)
		s, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("err:", err)

		}
		if s == "exit\r\n" { //用户退出

			conn.Write([]byte(s))

			break
		} else if s == "change\r\n" { //用户更名

			fmt.Println("请输入要更改的名字")
			s, _ := reader.ReadString('\n')
			s2 := []byte(s[0 : len(s)-2])
			s3 := append([]byte("change "), s2...)
			conn.Write([]byte(s3))
			continue

		}
		conn.Write([]byte(s)) //将消息发送给server端
	}

}
