import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button.tsx";
import { Card, CardContent } from "../../../components/ui/card.tsx";
import { Textarea } from "../../../components/ui/textarea.tsx";

export const PreviewText = (): JSX.Element => {
    const navigate = useNavigate();

    const sections = [
        { id: 1, title: "Welcome Section", hasTooltip: true },
        { id: 2, title: "About Us", hasTooltip: false },
        { id: 3, title: "What We Offer", hasTooltip: false },
        { id: 4, title: "Events and Entertainment", hasTooltip: false },
    ];

    return (
        <main className="bg-[#ffde59] flex flex-row justify-center w-full min-h-screen">
            <div className="bg-[#ffde59] w-full max-w-[1440px] relative px-4 py-16">
                <section className="max-w-[995px] mx-auto mb-10">
                    <h1 className="[font-family:'Patrick_Hand',Helvetica] font-normal text-[#000000] text-4xl tracking-[0.36px] leading-[22px] mb-6">
                        Preview
                    </h1>

                    <div className="relative">
                        <h2 className="[font-family:'Patrick_Hand',Helvetica] font-normal text-[#000000] text-4xl tracking-[0.36px] leading-[22px] mb-4">
                            Welcome Section
                        </h2>

                        {/* Welcome Section Card with Tooltip */}
                        <div className="relative">
                            <Card className="border-[3px] border-solid border-[#1a1a1a] rounded-lg overflow-hidden">
                                <CardContent className="p-3">
                                    <Textarea
                                        className="min-h-[133px] [font-family:'Patrick_Hand',Helvetica] font-normal text-[#000000] text-[13px] tracking-[0.13px] leading-[22px] border-none focus:ring-0 resize-none"
                                        defaultValue={""}
                                    />
                                    <div className="absolute bottom-3 right-3 w-6 h-6">
                                        <img
                                            className="w-3.5 h-3.5 absolute top-1.5 left-1.5"
                                            alt="Edit icon"
                                            src="/img/union.svg"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tooltip */}
                            <div className="absolute top-0 right-0">
                                <div className="flex flex-col w-[179px] items-start gap-3 pt-3 pb-[18px] px-4 relative bg-white rounded-xl border-[3px] border-solid border-[#1a1a1a] shadow-small">
                                    <p className="relative self-stretch mt-[-3.00px] [font-family:'Patrick_Hand',Helvetica] font-normal text-black text-base tracking-[0.16px] leading-[22px]">
                                        Feel free to click and edit it in the window
                                    </p>
                                    <img
                                        className="absolute w-4 h-[25px] top-[25px] -left-2.5"
                                        alt="Left beak"
                                        src="/img/left-beak.svg"
                                    />
                                </div>
                            </div>

                            {/* Duck Logo */}
                            <img
                                className="absolute w-[74px] h-[60px] top-[-35px] right-[90px] object-cover"
                                alt="Social duck logo"
                                src="/img/social-duck-logo-1.png"
                            />
                        </div>
                    </div>

                    {/* Map through remaining sections */}
                    {sections.slice(1).map((section) => (
                        <section key={section.id} className="mt-10">
                            <h2 className="[font-family:'Patrick_Hand',Helvetica] font-normal text-[#000000] text-4xl tracking-[0.36px] leading-[22px] mb-4">
                                {section.title}
                            </h2>
                            <Card className="border-[3px] border-solid border-[#1a1a1a] rounded-lg overflow-hidden">
                                <CardContent className="p-3 min-h-[152px] relative">
                                    <Textarea
                                        className="min-h-[120px] [font-family:'Patrick_Hand',Helvetica] font-normal text-[#000000] text-[13px] tracking-[0.13px] leading-[22px] border-none focus:ring-0 resize-none"
                                        defaultValue={""}
                                    />
                                    <div className="absolute bottom-3 right-3 w-6 h-6">
                                        <img
                                            className="w-3.5 h-3.5 absolute top-1.5 left-1.5"
                                            alt="Edit icon"
                                            src="/img/union.svg"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    ))}

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-6 mt-10">
                        <Button
                            className="w-[106px] h-[38px] bg-black text-white rounded-lg border-4 border-solid border-[#1a1a1a] font-patrick-hand-body-lg"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                        <Button
                            className="w-[106px] h-[38px] bg-black text-white rounded-lg border-4 border-solid border-[#1a1a1a] font-patrick-hand-body-lg"
                            onClick={() => navigate("/onboarding/4/upload-images")}
                        >
                            Next
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
};
