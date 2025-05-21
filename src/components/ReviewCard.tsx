import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Review } from '../services/businessService';
import { useNavigate } from 'react-router-dom';
import businessService from '../services/businessService';

interface ReviewCardProps {
  review: Review;
  businessEmail: string;
  onChatStarted?: (sessionId: string) => void;
}

export const ReviewCard = ({ review, businessEmail, onChatStarted }: ReviewCardProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isNegative = review.star_rating <= 3;

  const handleStartChat = async () => {
    if (!isNegative) return;
    
    setLoading(true);
    try {
      const result = await businessService.startChat(
        businessEmail,
        review.username, // Using username as email for demo
        `Hello ${review.username}, I noticed your review about "${review.title}" and would like to discuss it with you.`
      );
      
      if (onChatStarted) {
        onChatStarted(result.session_id);
      } else {
        navigate(`/chat/${result.session_id}`);
      }
    } catch (error) {
      console.error('Failed to start chat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`border-2 ${isNegative ? 'bg-red-100' : 'bg-green-100'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{review.title}</h3>
          <div className="flex">
            {Array.from({ length: review.star_rating }).map((_, i) => (
              <span key={i} className="text-yellow-500">★</span>
            ))}
            {Array.from({ length: 5 - review.star_rating }).map((_, i) => (
              <span key={i} className="text-gray-300">★</span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-2">{review.body}</p>
        <p className="text-xs text-gray-500 mb-2">By {review.username}</p>
        
        {isNegative && (
          <Button 
            onClick={handleStartChat} 
            disabled={loading}
            className="w-full bg-black text-white"
          >
            {loading ? "Starting Chat..." : "Chat with User"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
