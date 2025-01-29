import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { useNavigate } from "react-router-dom";

export const TellUsAbout = (): JSX.Element => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (newContent.length < 150) {
      setError("Content must be at least 150 characters.");
    } else if (newContent.length > 500) {
      setError("Content must be less than 500 characters.");
    } else {
      setError(""); // Clear error if valid
    }
  };

  const handleSubmit = () => {
    if (content.length >= 150 && content.length <= 500) {
      navigate("/preview-content");
    }
  };

  return (
      <div className="bg-[#ffde59] min-h-screen flex justify-center items-center">
        <div className="w-full max-w-[1440px] px-4">
          <div className="max-w-[724px] mx-auto relative pt-[214px]">
            <h1 className="font-patrick-hand-body text-4xl mb-8 tracking-[0.36px]">
              Tell us More
            </h1>

            <Card className="relative border-3 border-black rounded-lg p-6">
              <CardContent className="space-y-6">
                <p className="font-patrick-hand-body text-xl tracking-[0.20px] leading-[22px]">
                  We need a few details about your business. This information will be used by our platform's AI to craft your website content, ensuring it perfectly represents your brand and services.
                </p>

                <div className="relative">
                  <Textarea
                      className="min-h-[184px] p-4 border-3 border-black rounded-lg font-patrick-hand-body text-lg placeholder:text-gray-400"
                      placeholder="Tell us about your business..."
                      value={content}
                      onChange={handleChange}
                  />
                  <img
                      className="absolute bottom-2 right-2 w-3.5 h-3.5"
                      alt="Union"
                      src="/img/union.svg"
                  />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div className="flex justify-center">
                  <Button
                      onClick={handleSubmit}
                      className="bg-black text-white border-4 border-black rounded-lg px-4 py-3 font-patrick-hand-body-lg"
                      disabled={content.length < 150 || content.length > 500}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>

              <div className="absolute right-0 -top-24">
                <Card className="w-[179px] border-[3px] border-black rounded-xl shadow-small relative">
                  <CardContent className="p-4">
                    <p className="font-patrick-hand-body text-base tracking-[0.16px] leading-[22px]">
                      If you have a website, just copy and paste it from there.
                    </p>
                    <img
                        className="absolute w-4 h-[25px] top-9 -left-2.5"
                        alt="Left beak"
                        src="/img/left-beak.svg"
                    />
                  </CardContent>
                </Card>
              </div>

              <img
                  className="absolute w-[74px] h-[60px] -top-14 left-1/2 -translate-x-1/2 object-cover"
                  alt="Social Duck Logo"
                  src="/img/social-duck-logo-1.png"
              />
            </Card>
          </div>
        </div>
      </div>
  );
};
