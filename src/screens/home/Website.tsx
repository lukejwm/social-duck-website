import { useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import businessService, { BusinessUser } from "../../services/businessService";

export const Website = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BusinessUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Navigation items data
  const navigationItems = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "#about" },
    { label: "LOGIN", path: "/login" },
    { label: "REGISTER", path: "/signup" },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const results = await businessService.searchBusinesses(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to search for businesses.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="bg-[#fffdf7] min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/img/rectangle-1.png"
                alt="Social Duck Logo"
                className="w-12 h-12 mr-2"
              />
              <span className="text-2xl font-bold">Social Duck</span>
            </div>
            <div className="flex gap-6">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-black hover:text-gray-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Find and Review Local Businesses</h1>
          <p className="text-xl mb-8">Discover the best places in your area</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for businesses..."
                  className="pl-10 pr-10 py-3 w-full border-2 border-black rounded-l-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                {searchQuery && (
                  <XIcon
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={clearSearch}
                  />
                )}
              </div>
              <Button
                className="bg-black text-white rounded-r-lg px-6"
                onClick={handleSearch}
                disabled={loading || !searchQuery.trim()}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
            
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </section>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((business) => (
                <Card key={business.id} className="border-2 border-black">
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2">{business.business_name}</h3>
                    <p className="text-gray-700 mb-2">{business.address}, {business.town_city}</p>
                    <p className="text-gray-600 mb-4">{business.type}</p>
                    <Button
                      className="w-full bg-black text-white"
                      onClick={() => navigate(`/business/${business.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Featured Businesses Section */}
        <section className="py-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with actual data in a real implementation */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2 border-black">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">Featured Business {i}</h3>
                  <p className="text-gray-700 mb-2">123 Example St, City</p>
                  <p className="text-gray-600 mb-4">Restaurant</p>
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <Button className="w-full bg-black text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200 text-center">
          <p>© 2023 Social Duck. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
