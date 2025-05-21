import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import businessService, { Review, BusinessAlert } from "../../services/businessService";
import { ReviewCard } from "../../components/ReviewCard";
import { LogOut } from "lucide-react";

export const Dashboard = (): JSX.Element => {
  const { currentUser, logout } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [alerts, setAlerts] = useState<BusinessAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      
      try {
        const allReviews = await businessService.getAllReviews(currentUser.id);
        setReviews(allReviews);
        
        const positive = allReviews.filter(review => review.star_rating > 3).length;
        const negative = allReviews.length - positive;
        setStats({
          total: allReviews.length,
          positive,
          negative
        });
        
        const alertsData = await businessService.getAlerts(currentUser.id);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);

  const handleChatStarted = (sessionId: string) => {
    navigate(`/chat/${sessionId}`);
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
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-patrick-hand">Dashboard</h1>
          <Button onClick={logout} className="bg-black text-white">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-patrick-hand mb-4">Welcome, {currentUser.business_name}</h2>
          <p className="text-lg">{currentUser.address}, {currentUser.town_city}</p>
          <p className="text-md">{currentUser.type}</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-2 border-black">
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-patrick-hand">Total Reviews</h3>
              <p className="text-3xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-100 border-2 border-black">
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-patrick-hand">Positive Reviews</h3>
              <p className="text-3xl font-bold">{stats.positive}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-100 border-2 border-black">
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-patrick-hand">Negative Reviews</h3>
              <p className="text-3xl font-bold">{stats.negative}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-patrick-hand mb-4">New Negative Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alerts.map((alert, index) => (
                <ReviewCard 
                  key={index} 
                  review={{
                    username: alert.username,
                    title: alert.title,
                    body: alert.body,
                    star_rating: alert.star_rating
                  }}
                  businessEmail={currentUser.email}
                  onChatStarted={handleChatStarted}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* All Reviews Section */}
        <h2 className="text-2xl font-patrick-hand mb-4">All Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {reviews.map((review, index) => (
              <ReviewCard 
                key={index} 
                review={review}
                businessEmail={currentUser.email}
                onChatStarted={handleChatStarted}
              />
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};
