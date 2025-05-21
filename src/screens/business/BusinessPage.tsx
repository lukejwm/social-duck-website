import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import businessService, { BusinessUser, Review } from '../../services/businessService';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

export const BusinessPage = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<BusinessUser | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!id) return;
      
      try {
        const businessId = parseInt(id);
        const businessData = await businessService.getBusinessDetails(businessId);
        setBusiness(businessData);
        
        if (isAuthenticated) {
          const allReviews = await businessService.getAllReviews(businessId);
          setReviews(allReviews);
        } else {
          const positiveReviews = await businessService.getPositiveReviews(businessId);
          setReviews(positiveReviews);
        }
      } catch (error) {
        console.error('Error fetching business details:', error);
        setError('Failed to load business details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id, isAuthenticated]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!business) return <div className="p-8 text-center">Business not found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-patrick-hand mb-4">{business.business_name}</h1>
      <div className="mb-8">
        <p className="text-lg">{business.address}, {business.town_city}</p>
        <p className="text-md">{business.type}</p>
      </div>

      <h2 className="text-2xl font-patrick-hand mb-4">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card 
              key={index} 
              className={`border-2 ${review.star_rating > 3 ? 'bg-green-100' : 'bg-red-100'}`}
            >
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
                <p className="text-xs text-gray-500">By {review.username}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};
