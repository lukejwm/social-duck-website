import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../contexts/AuthContext";
import businessService, { ChatMessage } from "../../services/businessService";

export const Chat = (): JSX.Element => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!sessionId) return;
      
      try {
        const history = await businessService.getChatHistory(sessionId);
        setMessages(history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setError("Failed to load chat history.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchChatHistory();
    
    const interval = setInterval(fetchChatHistory, 5000);
    return () => clearInterval(interval);
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !sessionId) return;
    
    setSending(true);
    try {
      const userEmail = messages[0]?.user_email || "";
      
      await businessService.sendMessage(
        sessionId,
        newMessage,
        currentUser.email,
        userEmail
      );
      
      const history = await businessService.getChatHistory(sessionId);
      setMessages(history);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="p-8 text-center">
        <p>You need to be logged in to view this page.</p>
        <Button onClick={() => navigate("/login")} className="mt-4">
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#ffde59] min-h-screen">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => navigate("/dashboard")} className="bg-black text-white">
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-patrick-hand">Chat</h1>
        </div>
        
        <Card className="border-2 border-black bg-white">
          <CardContent className="p-4">
            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
              {loading ? (
                <p className="text-center">Loading messages...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.sender === currentUser.email ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender === currentUser.email 
                            ? 'bg-blue-500 text-white rounded-tr-none' 
                            : 'bg-gray-200 text-black rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(msg.timestamp || "").toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <p className="text-center">No messages yet.</p>
              )}
            </div>
            
            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-2 border-black"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={sending}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={sending || !newMessage.trim()}
                className="bg-black text-white"
              >
                {sending ? "Sending..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
