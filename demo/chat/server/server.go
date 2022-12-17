package main

import (
	"fmt"
	"net"
	"strconv"
	"strings"
)

type user struct {
	conn net.Conn
	name string
} //定义用户结构体

var online map[string]*user //该map储存在线用户

var msg chan string //定义全局的消息channel,接受到的消息会储存在这里,然后通过manager读取消息,做出相应处理

func manager() {

	online = make(map[string]*user)
	msg = make(chan string)
	//初始化online和msg
	for { //从msg中不断地取数据
		m := <-msg

		var name = ""
		for _, ss := range m {
			if ss != ' ' {
				name += string(ss)
			} else {
				break
			}
		}
		fmt.Println(name)
		if name == "online" {
			use := strings.Split(m, " ")[1]
			for _, u := range online {
				if u.name == use {
					var joint string = "当前在线人数为:"
					joint += strconv.Itoa(len(online)) + "人\n"
					u.conn.Write([]byte(joint))
				}
				//u.conn.Write([]byte("当前在线人数为:" + string(rune(len(online))) + "人"))

			}
			continue
		}

		for _, u := range online {
			if u.name != name {
				u.conn.Write([]byte(m)) //将数据群发给每个在线用户
			}
		}
	}
}

func userHander(conn net.Conn) {

	defer conn.Close()

	addr := conn.RemoteAddr().String() + "login" + "\n"
	msg <- addr                                     //将用户登录的消息发到全局msg里
	var uu = user{conn, conn.RemoteAddr().String()} //初始化结构体

	online[conn.RemoteAddr().String()] = &uu //把该用户结构体加到在线用户map中

	for { //接受用户发来的消息
		by := make([]byte, 1024)
		n, _ := conn.Read(by)
		line := string(by[:n])
		//处理online关键字,展示在线人数
		if line == "online\r\n" {
			msg <- "online " + uu.name
			continue

		}
		//处理exit关键字,用户退出
		if line == "exit\r\n" {

			delete(online, conn.RemoteAddr().String())
			msg <- uu.name + " 已成功退出"

			return
		}
		//处理change关键字,修改用户姓名
		var name = ""
		for _, ss := range line {

			if ss != ' ' {
				name += string(ss)
			} else {
				break
			}
		}
		if name == "change" {

			newName := strings.Split(line, " ")
			oldName := uu.name
			uu.name = newName[1]
			online[conn.RemoteAddr().String()].name = newName[1]
			msg <- "用户" + oldName + "已更名为" + newName[1] + "\n"
			continue
		}

		msg <- uu.name + ":  " + string(by[:n]) //将消息存到全局的msg

	}
}

func main() {

	listener, err := net.Listen("tcp", "127.0.0.1:9000") //实现tcp连接监听本机的9000端口
	if err != nil {
		fmt.Println("err:", err)
	}
	go manager() //该go程负责从全局的消息channel中取出数据并发送数据
	for {        //利用for循环处理连接上来的用户
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("err", err)
		}
		go userHander(conn) //把连接上来的用户交给该go程

	}

}
