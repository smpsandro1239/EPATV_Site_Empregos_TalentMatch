'use client';

import { useAuth } from '@/providers/AuthProvider';
import { Message, messagesService } from '@/services/messagesService';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatProps {
  applicationId: string;
}

export default function Chat({ applicationId }: ChatProps) {
  const { user, authToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();

    // Setup Socket.io
    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
      auth: { token: authToken },
    });

    socket.on('newMessage', (message: Message) => {
      if (message.applicationId === applicationId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [applicationId, authToken]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await messagesService.getMessages(applicationId);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const sentMessage = await messagesService.sendMessage(applicationId, newMessage);
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-500 italic">A carregar chat...</div>;
  }

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg border border-gray-200">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
        <h3 className="font-bold text-gray-800">Mensagens</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 my-8">Ainda não há mensagens. Inicie a conversa!</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderType === user?.role;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    isMe
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span
                    className={`text-[10px] block mt-1 ${
                      isMe ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreva uma mensagem..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
