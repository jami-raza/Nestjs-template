import { Injectable, OnModuleInit } from "@nestjs/common";
import { MessageBody, WebSocketServer } from "@nestjs/websockets/decorators";
import { Server } from "socket.io";
import { io, Socket } from 'socket.io-client'

@Injectable()
export class SocketClient implements OnModuleInit {

    // @WebSocketServer()
    // server:Server;

    public socketClient:Socket;
    constructor(){
        this.socketClient = io('http://localhost:3000');
    }

    onModuleInit() {
            this.registerConsumerEvents()
    }

    private registerConsumerEvents(){
        this.socketClient.emit('newMessage', { msg: "hey there"})
        this.socketClient.on('connect', ()=>{
            console.log("connected");
         });
         this.socketClient.on('onMessage', (payload:any)=>{
            console.log(payload);
         });
    }
}