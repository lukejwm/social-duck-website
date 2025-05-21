import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const BusinessCardSection = (): JSX.Element => {
  // Business card data
  const businessData = {
    image: "/rectangle-6-11.png",
    name: "Business Name",
    type: "Type of bussiness",
    description: "Little information on the business and what Business Name",
  };

  return (
    <Card className="flex flex-col w-full max-w-[399px] rounded-[20px] shadow-[0px_4px_4px_#00000040]">
      <CardContent className="p-5 flex flex-col gap-2.5">
        <img
          className="w-full h-[151px] object-cover"
          alt="Business Image"
          src={businessData.image}
        />

        <div className="font-['Raleway',Helvetica] font-normal text-[#000000] text-xl tracking-[0.20px] leading-5">
          {businessData.name}
        </div>

        <div className="font-['Raleway',Helvetica] font-normal text-[#000000] text-[15px] tracking-[0.15px] leading-5">
          {businessData.type}
        </div>

        <div className="font-['Raleway',Helvetica] font-normal text-[#000000] text-xl tracking-[0.20px] leading-5">
          {businessData.name}
        </div>

        <div className="font-['Raleway',Helvetica] font-normal text-[#000000] text-base tracking-[0.16px] leading-5">
          {businessData.description}
        </div>
      </CardContent>
    </Card>
  );
};
