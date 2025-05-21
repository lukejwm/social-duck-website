import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export const Final = (): JSX.Element => {
    const successMessages = [
        "Success!",
        "Congratulations! Your new website management hub have been successfully created.",
        "In the management hub, you can make edits to your website and publish them. Your changes will appear live within minutes after publishing.",
        "Utilize the marketing tools to connect your social media accounts and schedule posts across all your profiles.",
    ];

    return (
        <div className="bg-[#ffde59] flex flex-row justify-center w-full min-h-screen">
            <div className="bg-[#ffde59] w-full max-w-[1440px] h-full py-16">
                <div className="relative mx-auto max-w-[724px] mt-16">
                    {/* Finish heading */}
                    <h1 className="text-4xl font-normal [font-family:'Patrick_Hand',Helvetica] tracking-[0.36px] mb-4">
                        Finish
                    </h1>

                    <div className="relative">
                        {/* Main card */}
                        <Card className="w-full bg-white rounded-lg border-[3px] border-solid border-[#1a1a1a] pt-16">
                            <CardContent className="pt-6 px-6 pb-10">
                                {/* Success messages */}
                                <div className="flex flex-col items-center gap-2 mb-8">
                                    {successMessages.map((message, index) => (
                                        <p
                                            key={index}
                                            className="[font-family:'Patrick_Hand',Helvetica] font-normal text-[#000000] text-xl text-center tracking-[0.04px] leading-[22px]"
                                        >
                                            {message}
                                        </p>
                                    ))}
                                </div>

                                {/* Finish button */}
                                <div className="flex justify-center mt-6">
                                    <Button className="bg-black text-white rounded-lg border-4 border-solid border-[#1a1a1a] h-[38px] px-4 py-3">
                    <span className="font-patrick-hand-body-lg font-[number:var(--patrick-hand-body-lg-font-weight)] text-[length:var(--patrick-hand-body-lg-font-size)] tracking-[var(--patrick-hand-body-lg-letter-spacing)] leading-[var(--patrick-hand-body-lg-line-height)] whitespace-nowrap [font-style:var(--patrick-hand-body-lg-font-style)]">
                      Finish
                    </span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Duck logo */}
                        <img
                            className="absolute w-[74px] h-[60px] top-[7px] left-1/2 -translate-x-[37px] object-cover"
                            alt="Social duck logo"
                            src="/img/social-duck-logo-1.png"
                        />

                        {/* Speech bubble */}
                        <div className="absolute w-[179px] top-0 right-8">
                            <div className="flex flex-col w-[179px] items-start gap-3 pt-3 pb-[18px] px-4 relative bg-white rounded-xl border-[3px] border-solid border-[#1a1a1a] shadow-small">
                                <p className="relative self-stretch mt-[-3.00px] [font-family:'Patrick_Hand',Helvetica] font-normal text-black text-base tracking-[0.16px] leading-[22px]">
                                    Your Part of the social duck community
                                </p>
                                <img
                                    className="absolute w-4 h-[25px] top-[25px] -left-2.5"
                                    alt="Left beak"
                                    src="/img/left-beak.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
