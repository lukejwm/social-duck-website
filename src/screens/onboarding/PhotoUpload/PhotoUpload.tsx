import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import { ImageIcon } from "lucide-react";
import { Button } from "../../../components/ui/button.tsx";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card.tsx";

// Define card data
const uploadCards = [
    {
        id: "banner",
        title: "Banner",
        description:
            "Please upload a min of 3 photos that show off your business. These will be used for the banner.",
    },
    {
        id: "about",
        title: "About us",
        description: "Please upload 2 photos that best show what your company does.",
    },
    {
        id: "events",
        title: "Events",
        description: "Please upload some photos of past events.",
    },
    {
        id: "offer",
        title: "What we offer",
        description: "Please upload 2 photos of your food and drink.",
    },
    {
        id: "logo",
        title: "Logo",
        description: "Please upload your logo.",
    },
];

export const PhotoUpload = (): JSX.Element => {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({});

    useEffect(() => {
        uploadCards.forEach((card) => {
            const dropzoneId = `dropzone-${card.id}`;
            const element = document.getElementById(dropzoneId);
            if (element && !element.classList.contains("dz-loaded")) {
                new Dropzone(element, {
                    url: "/mock-upload",
                    autoProcessQueue: false,
                    maxFiles: 10,
                    acceptedFiles: "image/*",
                    previewsContainer: false,
                    clickable: true,
                    init: function () {
                        this.on("addedfile", (file) => {
                            setUploadedFiles((prev) => ({
                                ...prev,
                                [card.id]: [...(prev[card.id] || []), file],
                            }));
                        });
                    },
                });
                element.classList.add("dz-loaded");
            }
        });
    }, []);

    return (
        <div className="bg-[#ffde59] flex flex-col items-center w-full min-h-screen px-4 py-10">
            <div className="w-full max-w-[1440px]">
                <h1 className="font-patrick-hand-body-lg text-black text-4xl mb-8">
                    Gallery upload
                </h1>

                {/* Tooltip & Duck logo */}
                <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                        <div className="flex flex-col w-[179px] gap-3 p-4 bg-white rounded-xl border-[3px] border-solid border-[#1a1a1a] shadow-sm">
                            <p className="text-black text-base leading-[22px]">
                                Feel free to click and edit it in the window
                            </p>
                            <img
                                className="absolute w-4 h-[25px] top-[25px] -left-2.5"
                                alt="Left beak"
                                src="/img/left-beak.svg"
                            />
                        </div>
                    </div>
                    <img
                        className="w-[74px] h-[60px] object-cover"
                        alt="Social duck logo"
                        src="/img/social-duck-logo-1.png"
                    />
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {uploadCards.map((card) => (
                        <Card
                            key={card.id}
                            className="bg-white w-full rounded-xl border-[3px] border-solid border-[#1a1a1a] overflow-hidden"
                        >
                            <CardHeader className="pt-5 px-5">
                                <CardTitle className="font-patrick-hand-body-lg text-black text-xl">
                                    {card.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-5">
                                <p className="text-black text-sm mb-4">
                                    {card.description}
                                </p>
                                <div
                                    id={`dropzone-${card.id}`}
                                    className="dropzone w-full h-32 bg-gray-100 rounded-sm border border-dashed border-black flex items-center justify-center cursor-pointer hover:bg-gray-200 transition dz-clickable"
                                >
                                    <ImageIcon className="w-6 h-6 text-black" />
                                </div>
                                {uploadedFiles[card.id] && uploadedFiles[card.id].length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        {uploadedFiles[card.id].map((file, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(file)}
                                                alt={`Uploaded ${card.id} ${index}`}
                                                className="w-20 h-20 object-cover rounded border border-black"
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="px-5 pb-5">
                                <Button
                                    variant="outline"
                                    className="w-full h-[52px] bg-white rounded-lg border-4 border-solid border-[#1a1a1a] font-patrick-hand-body-lg text-black text-[22px]"
                                >
                                    Upload
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

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
                        onClick={() => navigate("/onboarding/5/complete")}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
