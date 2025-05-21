import { Card, CardContent } from "../../../components/ui/card.tsx";
import { Link } from "react-router-dom";

export const ForgotPassword = (): JSX.Element => {
  const content = {
    title: "Help is on the way",
    message:
        "We're combing through our records to find your Social Duck account. If we find a match, you'll get an email with further instructions. If you don't hear from us in the next 15 minutes, please double check that you entered the correct email address and check your spam folder.",
    backToSignIn: "Back to sign in",
  };

  return (
      <div className="min-h-screen bg-[#ffde59] flex items-center justify-center">
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="flex flex-col items-center space-y-8 pt-6">
            <div className="flex flex-col items-center space-y-4">
              <img
                  src="/img/rectangle-1.png"
                  alt="Social Duck Logo"
                  className="w-[200px] h-[200px] object-cover"
              />
              <h1 className="font-['Patrick_Hand'] text-[32px] text-[#30100b] leading-7">
                {content.title}
              </h1>
            </div>

            <p className="font-['Patrick_Hand'] text-[22px] text-black text-center max-w-[339px] leading-7">
              {content.message}
            </p>

            <Link to="/login" className="font-['Patrick_Hand'] text-[22px] text-[#0a0dad] hover:text-[#0a0dad]/80">
              {content.backToSignIn}
            </Link>
          </CardContent>
        </Card>
      </div>
  );
};

