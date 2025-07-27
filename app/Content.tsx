"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "./components/CustomButton";
import PhotoFrame from "./components/PhotoFrame";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
} from "framer-motion";
import ContentCard from "./components/ContentCard";
import Image from "next/image";

const Content = () => {
    const { scrollYProgress, scrollY } = useScroll();
    const [scrollDirection, setScrollDirection] = useState("down");
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > prevScrollY ? "down" : "up";
        setScrollDirection(direction);
        setPrevScrollY(latest);
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (progress) => {
            setShowContent(progress > 0.8);
        });
        return unsubscribe;
    }, [scrollYProgress]);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 1,
    });

    const birdProgress = useTransform(
        smoothProgress,
        [0.8, 1],
        showContent ? [0, 1] : [0, 0],
        { clamp: true }
    );
    const birdX = useTransform(birdProgress, [0, 1], ["-20vw", "120vw"], {
        clamp: true,
    });

    useEffect(() => {
        const unsubscribe = birdProgress.on("change", (progress) => {
            if (progress >= 0.9 && scrollDirection === "down") {
                setAnimationFinished(true);
            } else if (progress < 0.3 && scrollDirection === "up") {
                setAnimationFinished(false);
            }
        });
        return unsubscribe;
    }, [birdProgress, scrollDirection]);

    const fairyY = useTransform(birdProgress, [0.1, 0.4], [100, 0], { clamp: true });
    const fairyOpacity = useTransform(birdProgress, [0.1, 0.4], [0, 1], { clamp: true });

    const titleY = useTransform(birdProgress, [0, 0.3], [100, 0], { clamp: true });
    const titleOpacity = useTransform(birdProgress, [0, 0.3], [0, 1], {
        clamp: true,
    });

    const descriptionY = useTransform(birdProgress, [0.2, 0.5], [100, 0], {
        clamp: true,
    });
    const descriptionOpacity = useTransform(birdProgress, [0.2, 0.5], [0, 1], {
        clamp: true,
    });

    const buttonData = [
        { text: "PORTFOLIO", target: "portfolio" },
        { text: "BLOG", target: "blog" },
        { text: "ABOUT ME", target: "about" },
        { text: "CONTACT", target: "contact" },
    ];

    const buttonOpacities = [
        useTransform(birdProgress, [0.1, 0.3], [0, 1], { clamp: true }),
        useTransform(birdProgress, [0.2, 0.4], [0, 1], { clamp: true }),
        useTransform(birdProgress, [0.3, 0.5], [0, 1], { clamp: true }),
        useTransform(birdProgress, [0.4, 0.6], [0, 1], { clamp: true }),
    ];

    const buttonTranslateYs = [
        useTransform(birdProgress, [0.1, 0.3], [50, 0], { clamp: true }),
        useTransform(birdProgress, [0.2, 0.4], [50, 0], { clamp: true }),
        useTransform(birdProgress, [0.3, 0.5], [50, 0], { clamp: true }),
        useTransform(birdProgress, [0.4, 0.6], [50, 0], { clamp: true }),
    ];

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#b6b992",
                width: "100vw",
                height: "100vh",
                fontFamily: "DidotBoldItalic",
                overflow: animationFinished ? "auto" : "hidden",
                position: "relative",
            }}
        >
            {/* Flying Bird */}
            {showContent && (
                <motion.img
                    src="/images/bird.gif"
                    alt="Flying bird"
                    style={{
                        position: "fixed",
                        top: "5vh",
                        left: 0,
                        width: "190px",
                        height: "auto",
                        zIndex: 999,
                        translateX: birdX,
                        scaleX: scrollDirection === "up" ? -1 : 1,
                        transition: "scaleX 0.3s ease-in-out",
                    }}
                />
            )}

            {/* Fixed Navigation Bar */}
            {showContent && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "2rem",
                        left: "0",
                        right: "0",
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        backgroundColor: "rgba(182, 185, 146, 0.9)",
                        padding: "1rem 2rem",
                        margin: "0 2rem",
                        borderRadius: "50px",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    {buttonData.map((btn, index) => (
                        <motion.div
                            key={btn.text}
                            style={{
                                opacity: buttonOpacities[index],
                                translateY: buttonTranslateYs[index],
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CustomButton
                                text={btn.text}
                                onClick={() => handleScroll(btn.target)}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
            {/* Intro Section */}
            <div className="relative h-screen bg-[#b6b992] flex items-center justify-center px-8 overflow-hidden"
                style={{
                    backgroundImage: "url('/images/overlay.jpeg')",
                    backgroundBlendMode: "color-burn",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}>
                {showContent && (
                    <>
                        {/* Fairy Image - positioned to the right of text */}
                        <motion.img
                            src="/images/fairy1.png"
                            alt="fairy"
                            style={{
                                translateY: fairyY,
                                opacity: fairyOpacity,
                            }}
                            width={0}
                            height={0}
                            sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, (max-width: 1024px) 120px, 140px"
                            className="absolute pointer-events-none z-10
                                w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-auto
                                left-1/2 transform -translate-x-1/4 -translate-y-12
                                sm:left-auto sm:transform-none sm:translate-x-0 sm:translate-y-0
                                sm:right-[10%] md:right-[15%] lg:right-[20%] xl:right-[25%]
                                top-[31%] sm:top-[35%] sm:-translate-y-1/2"
                        />
                        {/* Centered Intro Text */}
                        <div className="relative text-center space-y-6 z-10">
                            <motion.h1
                                style={{
                                    translateY: titleY,
                                    opacity: titleOpacity,
                                }}
                                className="text-4xl text-[#454525]"
                            >
                                It's nice to see you!
                            </motion.h1>

                            <motion.p
                                style={{
                                    translateY: descriptionY,
                                    opacity: descriptionOpacity,
                                }}
                                className="text-[#454525] text-lg leading-relaxed max-w-md mx-auto"
                            >
                                This is a single-page scroll-activated website. Feel free to use the navigation
                                buttons below to take a look around.
                            </motion.p>
                        </div>
                    </>
                )}
            </div>
            {/* Other Sections */}
            {["portfolio", "blog", "about", "contact"].map((id, i) => (
                <div
                    key={id}
                    id={id}
                    style={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: ["#a8ab7a", "#9a9d6c", "#c5ca91", "#b6b992"][i],
                        backgroundImage: "url('/images/overlay.jpeg')",
                        backgroundBlendMode: "color-burn",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        color: "#454525",
                        position: "relative"
                    }}
                >
                    {id === "about" ? (
                        // Custom About Section Layout
                        <div className="flex items-center justify-between w-full max-w-6xl px-8">
                            {/* Left Side - Text Content */}
                            <div className="flex-1 pr-12">
                                <h2 className="text-4xl mb-6 text-left">ABOUT ME</h2>
                                <p className="text-lg leading-relaxed text-left max-w-md">
                                    Hello! My name is Hamna, and I&apos;m a rising senior attending Southern Methodist University in Dallas, TX. I have a cat named Silver who I love so much. I also love to code, write poetry, and travel!
                                </p>
                            </div>
                            
                            {/* Right Side - Photo Frames */}
                            <div className="flex-1 relative flex justify-center">
                                <div className="relative right-20">
                                    {/* First Photo Frame - slightly above and skewed */}
                                    <div className="absolute -top-8 left-0 w-[80%] transform rotate-3">
                                        <PhotoFrame 
                                            image="/images/silver.png"
                                        />
                                    </div>
                                    
                                    {/* Second Photo Frame - slightly below and skewed opposite */}
                                    <div className="relative top-16 left-40 transform -rotate-2">
                                        <PhotoFrame 
                                            image="/images/hamna.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Default layout for other sections
                        <div style={{ textAlign: "center"}}>
                            {/* Portfolio Image - positioned on the left edge */}
                            {id === "portfolio" && (
                                <Image
                                    src="/images/horse.png"
                                    alt="horse"
                                    width={516}
                                    height={250}
                                    className="absolute pointer-events-none left-10 z-10"
                                />
                            )}
                            
                            {/* Blog Image - positioned on the right edge */}
                            {id === "blog" && (
                                <Image
                                    src="/images/fairy2.png"
                                    alt="fairy"
                                    width={486}
                                    height={550}
                                    className="absolute pointer-events-none z-10"
                                    style={{
                                        right: 0,
                                        transform: "translateY(-43.5%) scaleX(-1)"
                                    }}
                                />
                            )}
                            
                            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                                {buttonData[i].text}
                            </h2>
                            {id === "portfolio" ? (
                                <ContentCard
                                    image="/images/carebuddy.png"
                                    title="CareBuddy"
                                    githubLink="https://github.com/XINEXPORT/chatgpt-ai-healthapp.git"
                                    style={{ width: "250px", height: "auto" }}
                                />
                            ) : (
                                <p>
                                    {id === "blog"
                                        ? "Coming soon..."
                                        : id === "contact"
                                            ? "Email: hamnatameez1@gmail.com"
                                            : ""}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Content;
