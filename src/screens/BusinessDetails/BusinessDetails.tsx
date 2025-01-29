import { useState } from "react";
import { PhoneCallIcon, MapPinCheckIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const BusinessDetails = (): JSX.Element => {
  const [businessType, setBusinessType] = useState("");
  const [telephone, setTelephone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = () => {
    if (!businessType || !telephone || !postcode) {
      setError("All fields must be filled out.");
      return;
    }
    setError("");
    navigate("/tell-us-about"); // Navigate to the /tell-us-about page
  };

  return (
      <div className="bg-[#ffde59] min-h-screen flex flex-col items-center pt-64">
        <h1 className="text-4xl font-patrick-hand-body mb-4">Basic details</h1>
        <Card className="w-[361px] border-3 border-black rounded-lg shadow-[0px_4px_4px_#00000040]">
          <CardContent className="p-6 space-y-6">
            <p className="font-patrick-hand-body text-xl tracking-[0.04px] text-center">
              Please enter some basic details for your business.
            </p>

            {/* Business Type Dropdown */}
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger className="w-full h-[59px] border-3 border-black font-patrick-hand-body-lg">
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

            {/* Telephone Input */}
            <div className="relative">
              <PhoneCallIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 text-black" />
              <Input
                  className="w-full pl-14 h-[60px] border-3 border-black font-patrick-hand-body placeholder:text-gray-400"
                  placeholder="Business Telephone number"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

            {/* Postcode Input */}
            <div className="relative">
              <MapPinCheckIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 text-black" />
              <Input
                  className="w-full pl-14 h-[60px] border-3 border-black font-patrick-hand-body placeholder:text-gray-400"
                  placeholder="Business postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
              />
            </div>

            {error && <p className="text-red-600 font-patrick-hand text-sm text-center">{error}</p>}

            <div className="flex justify-center pt-4">
              <Button
                  className="w-[106px] h-[38px] bg-black text-white border-4 border-black rounded-lg font-patrick-hand-body-lg"
                  onClick={handleSubmit}
                  disabled={!businessType || !telephone || !postcode}
              >
                <span className="font-patrick-hand-body-lg">Next</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};
