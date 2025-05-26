import { Review, ChatMessage } from '../services/businessService';

export const mockReviews: Review[] = [
  {
    username: "JohnD",
    title: "Amazing dinner experience!",
    body: "The steak was perfectly cooked, and the service was impeccable. Will definitely be back!",
    star_rating: 5
  },
  {
    username: "SarahM",
    title: "Wonderful atmosphere",
    body: "Great ambiance and delicious food. The pasta dishes are to die for!",
    star_rating: 5
  },
  {
    username: "MikeP",
    title: "Best Italian in town",
    body: "Authentic Italian cuisine. The chef clearly knows what they're doing. Loved the tiramisu!",
    star_rating: 4
  },
  {
    username: "EmilyR",
    title: "Lovely date night",
    body: "Perfect spot for a romantic dinner. The wine selection is excellent.",
    star_rating: 5
  },
  {
    username: "DavidW",
    title: "Great family dinner",
    body: "Took my family here for my daughter's birthday. They were very accommodating and the food was delicious.",
    star_rating: 4
  },
  {
    username: "LisaT",
    title: "Excellent lunch spot",
    body: "Quick service and tasty food. Perfect for a business lunch.",
    star_rating: 4
  },
  {
    username: "KarenS",
    title: "Disappointing service",
    body: "Waited 45 minutes for our food. When it finally arrived, it was cold. Very disappointed.",
    star_rating: 2
  },
  {
    username: "RobertJ",
    title: "Overpriced for what you get",
    body: "The portions were tiny for the price. Not worth the money.",
    star_rating: 2
  },
  {
    username: "AmyL",
    title: "Food was bland",
    body: "Everything needed more seasoning. Very bland and uninspiring dishes.",
    star_rating: 3
  },
  {
    username: "JamesB",
    title: "Too noisy",
    body: "Could barely hear my date across the table. The acoustics are terrible.",
    star_rating: 3
  },
  {
    username: "TomH",
    title: "Slow service",
    body: "Our waiter seemed to forget about us. Had to ask for water refills multiple times.",
    star_rating: 2
  },
  {
    username: "PatriciaM",
    title: "Not accommodating for allergies",
    body: "Mentioned my gluten allergy when booking but they had very few options available.",
    star_rating: 1
  }
];

export const generateMoreReviews = (): Review[] => {
  const allReviews = [...mockReviews];
  
  while (allReviews.length < 36) {
    const template = mockReviews[Math.floor(Math.random() * mockReviews.length)];
    const starVariation = Math.floor(Math.random() * 2) - 1; // -1, 0, or 1
    
    const newReview = {
      username: `User${allReviews.length}`,
      title: template.title,
      body: template.body,
      star_rating: Math.max(1, Math.min(5, template.star_rating + starVariation))
    };
    
    allReviews.push(newReview);
  }
  
  return allReviews;
};

export const mockChats: Map<string, ChatMessage[]> = new Map();
