import { SearchIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { BusinessCardSection } from "./sections/BusinessCardSection";
import { BusinessListSection } from "./sections/BusinessListSection/BusinessListSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection";
import { SearchSection } from "./sections/SearchSection";

export const Website = (): JSX.Element => {
  // Navigation items data
  const navigationItems = [
    { label: "HOME", path: "#" },
    { label: "ABOUT", path: "#" },
    { label: "BLOG", path: "#" },
    { label: "CATEGORY", path: "#" },
  ];

  return (
    <div className="bg-[#fffdf7] flex flex-row justify-center w-full">
      <div className="bg-[#fffdf7] w-full max-w-[1440px] relative">
        {/* SearchIcon bar */}
        <div className="relative w-[705px] h-12 mx-auto mt-[687px] bg-white rounded-lg border-2 border-solid border-[#1a1a1a] shadow-small">
          <div className="absolute top-2.5 left-[46px] font-['Patrick_Hand',Helvetica] font-normal text-black text-lg tracking-[0.18px] leading-6 whitespace-nowrap">
            {""}
          </div>
          <div className="absolute w-6 h-6 top-3 left-3">
            <SearchIcon className="w-[19px] h-[19px] absolute top-[3px] left-[3px]" />
          </div>
          <XIcon className="absolute w-6 h-6 top-3 right-3" />
        </div>

        {/* Banner section */}
        <div className="w-full h-[324px] mt-56 bg-[#f9cc4b] rounded-lg shadow-[0px_4px_4px_#00000040] relative overflow-hidden">
          <div className="relative w-[222px] h-[204px] mx-auto mt-[60px]">
            <img
              className="w-[212px] h-[164px] mx-auto"
              alt="Social Duck Logo"
              src="/untitled-design--5--1.png"
            />
            <h1 className="h-10 mt-4 font-['Raleway',Helvetica] font-normal text-[#000000] text-[40px] text-center tracking-[0.40px] leading-10 whitespace-nowrap">
              Social Duck
            </h1>
          </div>
        </div>

        {/* SearchIcon heading */}
        <h2 className="text-center h-10 mt-[646px] font-['Raleway',Helvetica] font-normal text-[#000000] text-[22px] tracking-[0.22px] leading-10 whitespace-nowrap">
          SearchIcon for a business
        </h2>

        {/* Navigation menu */}
        <nav className="flex justify-center gap-8 absolute top-[156px] left-1/2 transform -translate-x-1/2">
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="h-10 font-['Raleway',Helvetica] font-normal text-[#000000] text-xl text-center tracking-[0.20px] leading-10 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* View More button */}
        <Button
          variant="link"
          className="absolute top-[2327px] left-1/2 transform -translate-x-1/2 font-['Raleway',Helvetica] font-normal text-[#000000] text-2xl tracking-[0] leading-[normal] whitespace-nowrap"
        >
          View More
        </Button>

        {/* Sections */}
        <HeaderSection />
        <FooterSection />
        <BusinessCardSection />
        <BusinessListSection />
        <BusinessCardSection />
        <BusinessCardSection />
        <MainContentSection />
        <BusinessCardSection />
        <BusinessCardSection />
        <SearchSection />
        <BusinessCardSection />
        <BusinessCardSection />
      </div>
    </div>
  );
};
