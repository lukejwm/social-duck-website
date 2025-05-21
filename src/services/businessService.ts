import api from './api';

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
    const response = await api.get(`/business/feedback/${businessId}`);
    return response.data;
  },

  getNegativeReviews: async (businessId: number): Promise<Review[]> => {
    const response = await api.get(`/business/feedback/negative/${businessId}`);
    return response.data;
  },

  getAllReviews: async (businessId: number): Promise<Review[]> => {
    const positiveReviews = await businessService.getPositiveReviews(businessId);
    const negativeReviews = await businessService.getNegativeReviews(businessId);
    return [...positiveReviews, ...negativeReviews];
  },

  startChat: async (businessEmail: string, userEmail: string, message: string): Promise<ChatSession> => {
    const response = await api.post('/business/chat/start', {
      business_email: businessEmail,
      user_email: userEmail,
      message: message
    });
    return response.data;
  },

  sendMessage: async (sessionId: string, message: string, sender: string, receiver: string): Promise<void> => {
    await api.post('/business/chat/send', {
      session_id: sessionId,
      message: message,
      sender: sender,
      receiver: receiver
    });
  },

  getChatHistory: async (sessionId: string): Promise<ChatMessage[]> => {
    const response = await api.get(`/business/chat/${sessionId}`);
    return response.data;
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
  }
};

export default businessService;
