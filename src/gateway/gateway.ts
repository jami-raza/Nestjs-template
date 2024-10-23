import { Bind } from "@nestjs/common/decorators";
import { WebSocketGateway, MessageBody, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common'

@WebSocketGateway({
  cors: {
    // origin: ['http://localhost:8000/dashboard/employees'],
    origin: '*',
    
  },
})
export class MyGateway  {
    @WebSocketServer()
    server:Server;
  
    onModuleInit(){
      this.server.on('connection', (socket)=>{
        console.log(socket.local);
        console.log("connected ");
      })
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any){
      // console.log(body)
      this.server.emit('onMessage',{
        msg: "newMessage",
        content: body,
      });
    }
} 