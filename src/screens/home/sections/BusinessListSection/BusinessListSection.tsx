import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const BusinessListSection = (): JSX.Element => {
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
          className="w-full h-[151px] object-cover rounded-md"
          alt="Business"
          src={businessData.image}
        />

        <h3 className="font-['Raleway',Helvetica] font-normal text-xl tracking-[0.20px] leading-5">
          {businessData.name}
        </h3>

        <p className="font-['Raleway',Helvetica] font-normal text-[15px] tracking-[0.15px] leading-5">
          {businessData.type}
        </p>

        <h3 className="font-['Raleway',Helvetica] font-normal text-xl tracking-[0.20px] leading-5">
          {businessData.name}
        </h3>

        <p className="font-['Raleway',Helvetica] font-normal text-base tracking-[0.16px] leading-5">
          {businessData.description}
        </p>
      </CardContent>
    </Card>
  );
};
