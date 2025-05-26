import api from './api';
import { mockReviews, mockChats, generateMoreReviews } from '../utils/mockData';

export interface BusinessInfo {
  email: string;
  business_name: string;
  address: string;
  town_city: string;
  type: string;
  password?: string;
}

export interface BusinessUser extends BusinessInfo {
  id: number;
}

export interface Review {
  username: string;
  title: string;
  body: string;
  star_rating: number;
}

export interface ChatSession {
  session_id: string;
  message: string;
}

export interface ChatMessage {
  session_id: string;
  business_id: number;
  business_email: string;
  user_id: number;
  user_email: string;
  message: string;
  sender: string;
  receiver: string;
  timestamp?: string;
}

export interface BusinessAlert {
  feedback_id: number;
  username: string;
  title: string;
  body: string;
  star_rating: number;
}

const businessService = {
  register: async (businessData: BusinessInfo & { password: string }): Promise<BusinessUser> => {
    const response = await api.post('/business/register', businessData);
    return response.data;
  },
  
  login: async (email: string, password: string): Promise<{id: number; email: string; business_name: string; token: string}> => {
    const response = await api.post('/business/login', {
      email,
      password
    });
    return response.data;
  },

  getBusinessDetails: async (businessId: number): Promise<BusinessUser> => {
    const response = await api.get(`/business/account/${businessId}`);
    return response.data;
  },

  getPositiveReviews: async (businessId: number): Promise<Review[]> => {
    try {
      const response = await api.get(`/business/feedback/${businessId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching positive reviews:", error);
      return mockReviews.filter((review: Review) => review.star_rating > 3);
    }
  },

  getNegativeReviews: async (businessId: number): Promise<Review[]> => {
    try {
      const response = await api.get(`/business/feedback/negative/${businessId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching negative reviews:", error);
      return mockReviews.filter((review: Review) => review.star_rating <= 3);
    }
  },

  getAllReviews: async (businessId: number): Promise<Review[]> => {
    try {
      const positiveReviews = await businessService.getPositiveReviews(businessId);
      const negativeReviews = await businessService.getNegativeReviews(businessId);
      return [...positiveReviews, ...negativeReviews];
    } catch (error) {
      console.error("Error fetching all reviews:", error);
      return generateMoreReviews();
    }
  },

  startChat: async (businessEmail: string, userEmail: string, message: string): Promise<ChatSession> => {
    try {
      const response = await api.post('/business/chat/start', {
        business_email: businessEmail,
        user_email: userEmail,
        message: message
      });
      return response.data;
    } catch (error) {
      console.error("Error starting chat:", error);
      const sessionId = `chat-${Date.now()}`;
      const timestamp = new Date().toISOString();
      
      const initialMessage: ChatMessage = {
        session_id: sessionId,
        business_id: 1,
        business_email: businessEmail,
        user_id: 1,
        user_email: userEmail,
        message: message,
        sender: businessEmail,
        receiver: userEmail,
        timestamp: timestamp
      };
      
      mockChats.set(sessionId, [initialMessage]);
      
      return {
        session_id: sessionId,
        message: message
      };
    }
  },

  sendMessage: async (sessionId: string, message: string, sender: string, receiver: string): Promise<void> => {
    try {
      await api.post('/business/chat/send', {
        session_id: sessionId,
        message: message,
        sender: sender,
        receiver: receiver
      });
    } catch (error) {
      console.error("Error sending message:", error);
      const existingChat = mockChats.get(sessionId) || [];
      const timestamp = new Date().toISOString();
      
      const newMessage: ChatMessage = {
        session_id: sessionId,
        business_id: 1,
        business_email: sender.includes('@business') ? sender : receiver,
        user_id: 1,
        user_email: sender.includes('@business') ? receiver : sender,
        message: message,
        sender: sender,
        receiver: receiver,
        timestamp: timestamp
      };
      
      mockChats.set(sessionId, [...existingChat, newMessage]);
    }
  },

  getChatHistory: async (sessionId: string): Promise<ChatMessage[]> => {
    try {
      const response = await api.get(`/business/chat/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting chat history:", error);
      return mockChats.get(sessionId) || [];
    }
  },

  getAlerts: async (businessId: number): Promise<BusinessAlert[]> => {
    const response = await api.get(`/business/feedback/alert/${businessId}`);
    return response.data;
  },

  searchBusinesses: async (query: string): Promise<BusinessUser[]> => {
    const response = await api.get(`/business/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  updateBusinessDetails: async (businessId: number, businessData: BusinessInfo): Promise<BusinessUser> => {
    console.log(`Updating business ${businessId} with data:`, businessData);
    
    return {
      id: businessId,
      ...businessData
    };
  },
  
  calculateBusinessScore: (reviews: Review[]): number => {
    if (!reviews || reviews.length === 0) return 0;
    
    const totalPossiblePoints = reviews.length * 5; // If all reviews were 5-star
    const actualPoints = reviews.reduce((sum, review) => sum + review.star_rating, 0);
    
    const percentage = (actualPoints / totalPossiblePoints);
    const score = Math.round(percentage * 1000);
    
    return score;
  }
};

export default businessService;
