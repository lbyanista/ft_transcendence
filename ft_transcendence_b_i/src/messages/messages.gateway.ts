import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  // namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer() //Socket.io has already method to emit msg to all clinet
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket, ) {
    const message = await this.messagesService.create(createMessageDto, client.id,);
    
    this.server.emit('message', message);
    
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }


  @SubscribeMessage('test')
  test(@MessageBody() body) {
    this.server.emit("test", {message : "test"})
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,) { //ConnectedSocket for msg come from

      return this.messagesService.identify(name, client.id)
  }

  handleConnection(client: Socket) {
    
  }

  // @SubscribeMessage('typing')
  // async typing(
  //   @MessageBody('isTyping') isTyping: boolean,
  //   @ConnectedSocket() client: Socket,) {
  //     const name = await this.messagesService.getClientName(client.id);

  //     //this.server.emit('message', message); => this emit can inform all clients connected // also the sender can show him self is typing
  //     client.broadcast.emit('typing', {name, isTyping});
  // }
}