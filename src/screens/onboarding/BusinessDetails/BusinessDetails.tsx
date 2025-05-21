import { useState } from "react";
import { PhoneCallIcon, MapPinCheckIcon } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card.tsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select.tsx";
import { Input } from "../../../components/ui/input.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

const mockPostcodeSuggestions = (query: string): string[] => {
  const suggestions = [
    "EC1A 1BB", "W1A 0AX", "M1 1AE", "B33 8TH", "CR2 6XH", "DN55 1PT"
  ];
  return suggestions.filter((s) => s.toLowerCase().startsWith(query.toLowerCase()));
};

export const BusinessDetails = (): JSX.Element => {
  const [businessType, setBusinessType] = useState("");
  const [telephone, setTelephone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!businessType || !telephone || !postcode) {
      setError("All fields must be filled out.");
      return;
    }
    setError("");
    navigate("/onboarding/2/tell-us-about");
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostcode(value);

    if (value.trim().length >= 2) {
      const matches = mockPostcodeSuggestions(value);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestedPostcode: string) => {
    setPostcode(suggestedPostcode);
    setShowSuggestions(false);
  };

  return (
      <div className="bg-[#ffde59] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <img
              className="w-[160px] h-[160px] object-cover -mt-12"
              alt="Social Duck Logo"
              src="/img/rectangle-1.png"
          />
          <h1 className="text-4xl font-patrick-hand-body text-black">Basic details</h1>
          <Card className="w-[361px] border-[3px] border-black rounded-lg shadow-md">
            <CardContent className="p-6 space-y-6">
              <p className="font-patrick-hand-body text-xl tracking-[0.04px] text-center">
                Please enter some basic details for your business.
              </p>

              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="w-full h-[59px] border-[3px] border-black font-patrick-hand-body-lg">
                  <SelectValue placeholder="Type of Business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pub">Pub</SelectItem>
                  <SelectItem value="Bar">Bar</SelectItem>
                  <SelectItem value="Pub/Restaurant">Pub/Restaurant</SelectItem>
                  <SelectItem value="Gatropub">Gatropub</SelectItem>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Cafe">Cafe</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <PhoneCallIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-black" />
                <Input
                    className="w-full pl-16 h-[60px] border-[3px] border-black font-patrick-hand-body placeholder:text-gray-400"
                    placeholder="Business Telephone number"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
              </div>

              <div className="relative">
                <MapPinCheckIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-black" />
                <Input
                    className="w-full pl-16 h-[60px] border-[3px] border-black font-patrick-hand-body placeholder:text-gray-400"
                    placeholder="Business postcode"
                    value={postcode}
                    onChange={handlePostcodeChange}
                    onFocus={() => postcode && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // allow click selection
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 bg-white border border-black w-full rounded-md max-h-48 overflow-auto shadow-md">
                      {suggestions.map((suggestion, index) => (
                          <li
                              key={index}
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-patrick-hand-body"
                              onClick={() => handleSuggestionSelect(suggestion)}
                          >
                            {suggestion}
                          </li>
                      ))}
                    </ul>
                )}
              </div>

              {error && (
                  <p className="text-red-600 font-patrick-hand text-sm text-center">
                    {error}
                  </p>
              )}

              <div className="flex justify-center pt-2">
                <Button
                    className="w-[106px] h-[38px] bg-black text-white border-4 border-black rounded-lg font-patrick-hand-body-lg"
                    onClick={handleSubmit}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};
