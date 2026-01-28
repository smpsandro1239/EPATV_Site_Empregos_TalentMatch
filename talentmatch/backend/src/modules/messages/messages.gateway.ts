import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const userId = payload.sub;
      this.connectedUsers.set(userId, client.id);
      client.join(`user_${userId}`);

      console.log(`User connected: ${userId} (${client.id})`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  }

  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user_${userId}`).emit(event, data);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // This is handled via REST for persistence
  }

  @SubscribeMessage('callUser')
  handleCallUser(@MessageBody() data: { userToCall: string, signalData: any, from: string }) {
    this.server.to(`user_${data.userToCall}`).emit('callUser', {
      signal: data.signalData,
      from: data.from,
    });
  }

  @SubscribeMessage('answerCall')
  handleAnswerCall(@MessageBody() data: { signal: any, to: string }) {
    this.server.to(`user_${data.to}`).emit('callAccepted', data.signal);
  }

  @SubscribeMessage('endCall')
  handleEndCall(@MessageBody() data: { to: string }) {
    this.server.to(`user_${data.to}`).emit('callEnded');
  }
}
