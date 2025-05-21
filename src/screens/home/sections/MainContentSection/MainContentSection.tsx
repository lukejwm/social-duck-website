import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainContentSection = (): JSX.Element => {
  // Business data that can be easily modified
  const businessData = {
    image: "/rectangle-6-11.png",
    name: "Business Name",
    type: "Type of bussiness",
    description: "Little information on the business and what Business Name",
  };

  return (
    <Card className="flex flex-col w-full max-w-[399px] rounded-[20px] shadow-[0px_4px_4px_#00000040] overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col gap-2.5 p-5">
          <img
            className="w-full h-[151px] object-cover rounded-md"
            alt="Business Image"
            src={businessData.image}
          />

          <h3 className="font-normal text-xl tracking-[0.20px] leading-5 font-['Raleway',Helvetica]">
            {businessData.name}
          </h3>

          <p className="font-normal text-[15px] tracking-[0.15px] leading-5 font-['Raleway',Helvetica]">
            {businessData.type}
          </p>

          <h3 className="font-normal text-xl tracking-[0.20px] leading-5 font-['Raleway',Helvetica]">
            {businessData.name}
          </h3>

          <p className="font-normal text-base tracking-[0.16px] leading-5 font-['Raleway',Helvetica]">
            {businessData.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
