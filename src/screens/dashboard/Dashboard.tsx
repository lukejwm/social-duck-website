import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";

// Navigation menu items data
const navigationItems = [
  {
    icon: "/icon-3.svg",
    label: "Dashboard",
    active: true,
    notification: false,
  },
  { icon: "/icon-7.svg", label: "Website", active: false, notification: false },
  {
    icon: "/icon.svg",
    label: "Media Library",
    active: false,
    notification: false,
  },
  { icon: "/icon-6.svg", label: "SEO", active: false, notification: false },
  { icon: "/icon-2.svg", label: "Menu", active: false, notification: false },
];

// Secondary navigation items data
const secondaryNavItems = [
  {
    icon: "/icon-5.svg",
    label: "Notifications",
    active: false,
    notification: true,
  },
  {
    icon: "/icon-4.svg",
    label: "Settings",
    active: false,
    notification: false,
  },
  { icon: "/icon-1.svg", label: "Support", active: false, notification: false },
];

export const Dashboard = (): JSX.Element => {
  return (
    <div className="bg-[#ffde59] flex flex-row justify-center w-full">
      <div className="bg-[#ffde59] w-[1440px] h-[1024px] relative">
        {/* Sidebar */}
        <Card className="flex flex-col w-[280px] h-[920px] items-center gap-6 absolute top-[52px] left-[70px] bg-[#f6f0e0] rounded-2xl shadow-[0px_16px_44px_#00000012] border-none">
          {/* Sidebar Header */}
          <div className="flex items-center gap-3 p-6 relative self-stretch w-full flex-[0_0_auto] z-[3]">
            <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
              <img
                className="relative w-8 h-8 object-cover"
                alt="Logo"
                src="/logo.png"
              />
              <div className="relative w-fit font-XL-semibold font-[number:var(--XL-semibold-font-weight)] text-[#080f20] text-[length:var(--XL-semibold-font-size)] tracking-[var(--XL-semibold-letter-spacing)] leading-[var(--XL-semibold-line-height)] whitespace-nowrap [font-style:var(--XL-semibold-font-style)]">
                Social Duck
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="inline-flex items-center justify-center p-1 absolute top-[27px] left-[267px] bg-white rounded-full border border-solid border-slate-200 h-6 w-6"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <div className="flex flex-col items-center gap-6 relative flex-1 self-stretch w-full grow z-[2]">
            <div className="flex flex-col items-start gap-1 px-6 py-0 relative self-stretch w-full flex-[0_0_auto]">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex h-11 items-center gap-3 px-4 py-3 relative self-stretch w-full rounded-[99px] overflow-hidden ${
                    item.active ? "bg-indigo-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3 relative flex-1 grow">
                    <div className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]">
                      <img
                        className="relative w-5 h-5"
                        alt={`${item.label} icon`}
                        src={item.icon}
                      />
                    </div>
                    <div
                      className={`relative flex-1 self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] ${
                        item.active ? "text-indigo-600" : "text-slate-500"
                      } text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] whitespace-nowrap [font-style:var(--base-medium-font-style)]`}
                    >
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="self-stretch w-full h-px" />

            {/* Secondary Navigation */}
            <div className="flex flex-col items-start gap-1 px-6 py-0 relative self-stretch w-full flex-[0_0_auto]">
              {secondaryNavItems.map((item, index) => (
                <div
                  key={index}
                  className="flex h-11 items-center gap-3 px-4 py-3 relative self-stretch w-full rounded-[99px] overflow-hidden"
                >
                  <div className="flex items-start gap-3 relative flex-1 grow">
                    <div className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]">
                      <img
                        className="relative w-5 h-5"
                        alt={`${item.label} icon`}
                        src={item.icon}
                      />
                    </div>
                    <div className="relative flex-1 self-stretch mt-[-1.00px] font-base-medium font-[number:var(--base-medium-font-weight)] text-slate-500 text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] whitespace-nowrap [font-style:var(--base-medium-font-style)]">
                      {item.label}
                    </div>
                    {item.notification && (
                      <div className="absolute w-2 h-2 top-[13px] -left-px bg-orange-500 rounded-[99px] border border-solid border-[#ffffff]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Duck Illustration */}
          <div className="flex items-center justify-center gap-2.5 px-6 py-0 relative self-stretch w-full flex-[0_0_auto] z-[1]">
            <div className="flex flex-col h-[221px] items-center gap-3 relative flex-1 grow">
              <img
                className="relative flex-1 w-[248px] grow ml-[-8.00px] mr-[-8.00px]"
                alt="Moneyverse home"
                src="/moneyverse-home-office.png"
              />
            </div>
          </div>

          {/* User Profile Footer */}
          <footer className="flex items-center gap-3 p-6 relative self-stretch w-full flex-[0_0_auto] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] z-0 bg-transparent border-t [border-top-style:solid] [border-right-style:none] [border-bottom-style:none] [border-left-style:none] border-slate-200">
            <div className="flex items-center gap-3 relative flex-1 grow">
              <Avatar className="relative w-10 h-10 bg-[#ffb21f] rounded-[99px] overflow-hidden">
                <AvatarImage
                  src="/big-shoes-avatar.png"
                  alt="User avatar"
                  className="absolute w-10 h-10 top-0 left-0"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="flex-col gap-0.5 relative flex-1 grow flex items-start">
                <div className="relative self-stretch mt-[-1.00px] font-SM-medium font-[number:var(--SM-medium-font-weight)] text-slate-500 text-[length:var(--SM-medium-font-size)] tracking-[var(--SM-medium-letter-spacing)] leading-[var(--SM-medium-line-height)] [font-style:var(--SM-medium-font-style)]">
                  Welcome back 👋
                </div>
                <div className="relative self-stretch font-base-medium font-[number:var(--base-medium-font-weight)] text-[#080f20] text-[length:var(--base-medium-font-size)] tracking-[var(--base-medium-letter-spacing)] leading-[var(--base-medium-line-height)] [font-style:var(--base-medium-font-style)]">
                  Johnathan
                </div>
              </div>
            </div>
            <ChevronRightIcon className="relative w-5 h-5" />
          </footer>
        </Card>

        {/* Main Content - Events Header */}
        <img
          className="w-[748px] h-[125px] top-[76px] absolute left-[473px] object-cover"
          alt="Events header"
          src="/rectangle-2.png"
        />

        {/* Event Image Placeholder */}
        <img
          className="w-[343px] h-[228px] top-[366px] absolute left-[473px] object-cover"
          alt="Event image placeholder"
          src="/rectangle-6.png"
        />

        {/* Event Title Input */}
        <div className="w-[740px] gap-2 pl-3.5 pr-12 py-3 absolute top-[284px] left-[477px] bg-white rounded-lg border-2 border-solid border-[#1a1a1a] flex items-start">
          <Input
            className="relative flex-1 h-6 mt-[-2.00px] font-patrick-hand-body font-[number:var(--patrick-hand-body-font-weight)] text-black text-[length:var(--patrick-hand-body-font-size)] tracking-[var(--patrick-hand-body-letter-spacing)] leading-[var(--patrick-hand-body-line-height)] whitespace-nowrap overflow-hidden text-ellipsis border-none shadow-none focus-visible:ring-0 p-0"
            defaultValue="Event Title"
          />
        </div>

        {/* Description Textarea */}
        <div className="flex w-[370px] h-[219px] items-start gap-2 pl-3.5 pr-12 py-3 absolute top-[367px] left-[847px] bg-white rounded-lg border-2 border-solid border-[#1a1a1a]">
          <Textarea
            className="relative flex-1 h-full mt-[-2.00px] font-patrick-hand-body font-[number:var(--patrick-hand-body-font-weight)] text-black text-[length:var(--patrick-hand-body-font-size)] tracking-[var(--patrick-hand-body-letter-spacing)] leading-[var(--patrick-hand-body-line-height)] overflow-hidden border-none shadow-none focus-visible:ring-0 p-0 resize-none"
            defaultValue="Description"
          />
        </div>

        {/* Date Inputs */}
        <div className="flex w-[337px] items-center gap-3 p-3 absolute top-[619px] left-[476px] bg-white rounded-lg overflow-hidden border-2 border-solid border-[#1a1a1a]">
          <div className="flex w-[142px] items-start gap-3 relative overflow-hidden">
            <CalendarIcon className="relative w-6 h-6" />
            <div className="relative w-[117px] h-6 mt-[-1.00px] font-patrick-hand-body font-[number:var(--patrick-hand-body-font-weight)] text-black text-[length:var(--patrick-hand-body-font-size)] tracking-[var(--patrick-hand-body-letter-spacing)] leading-[var(--patrick-hand-body-line-height)] whitespace-nowrap [font-style:var(--patrick-hand-body-font-style)]">
              Start Time
            </div>
          </div>
          <div className="flex w-[142px] items-start gap-3 relative overflow-hidden">
            <CalendarIcon className="relative w-6 h-6" />
            <div className="relative w-[117px] h-6 mt-[-1.00px] font-patrick-hand-body font-[number:var(--patrick-hand-body-font-weight)] text-black text-[length:var(--patrick-hand-body-font-size)] tracking-[var(--patrick-hand-body-letter-spacing)] leading-[var(--patrick-hand-body-line-height)] whitespace-nowrap [font-style:var(--patrick-hand-body-font-style)]">
              End Time
            </div>
          </div>
        </div>

        {/* Time Inputs */}
        <div className="flex w-[372px] items-center gap-3 p-3 absolute top-[619px] left-[846px] bg-white rounded-lg overflow-hidden border-2 border-solid border-[#1a1a1a]">
          <div className="flex w-[142px] items-start gap-3 relative overflow-hidden">
            <ClockIcon className="relative w-6 h-6" />
            <div className="relative w-[117px] h-6 mt-[-1.00px] font-patrick-hand-body font-[number:var(--patrick-hand-body-font-weight)] text-black text-[length:var(--patrick-hand-body-font-size)] tracking-[var(--patrick-hand-body-letter-spacing)] leading-[var(--patrick-hand-body-line-height)] whitespace-nowrap [font-style:var(--patrick-hand-body-font-style)]">
              Start Time
            </div>
          </div>
          <div className="flex w-[142px] items-start gap-3 relative overflow-hidden">
            <ClockIcon className="relative w-6 h-6" />
            <div className="relative w-[117px] h-6 mt-[-1.00px] font-patrick-hand-body font-[number:var(--patrick-hand-body-font-weight)] text-black text-[length:var(--patrick-hand-body-font-size)] tracking-[var(--patrick-hand-body-letter-spacing)] leading-[var(--patrick-hand-body-line-height)] whitespace-nowrap [font-style:var(--patrick-hand-body-font-style)]">
              End Time
            </div>
          </div>
        </div>

        {/* Update Button */}
        <Button className="flex w-[106px] h-[38px] items-center justify-center gap-2 px-4 py-3 absolute top-[702px] left-[770px] bg-black rounded-lg border-4 border-solid border-[#1a1a1a]">
          <span className="w-fit mt-[-11.00px] mb-[-3.00px] font-patrick-hand-body-lg font-[number:var(--patrick-hand-body-lg-font-weight)] text-white text-[length:var(--patrick-hand-body-lg-font-size)] text-center leading-[var(--patrick-hand-body-lg-line-height)] relative tracking-[var(--patrick-hand-body-lg-letter-spacing)] whitespace-nowrap [font-style:var(--patrick-hand-body-lg-font-style)]">
            Update
          </span>
        </Button>
      </div>
    </div>
  );
};
