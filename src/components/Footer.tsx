'use client';

import Image from "next/image";
import BackTopButton from "./microComponents/BackTopButton";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface LegalContent {
    title: string;
    content: string;
}

export default function Footer() {
    const t = useTranslations('Footer');
    const [selectedLegalContent, setSelectedLegalContent] = useState<LegalContent | null>(null);

    const navigation = [
        { name: t("explore-link1"), href: '/' },
        { name: t("explore-link2"), href: '/about-us' },
        { name: t("explore-link3"), href: '/store' },
        { name: t("explore-link4"), href: '/contacts' }
    ]

    const legalLinks = [
        { 
            name: t("privacyPolicy"), 
            href: '/privacy-policy',
            title: t("privacyPolicy"),
            content: t("privacyPolicyContent") // You'll need to add this translation
        },
        { 
            name: t("termsOfService"), 
            href: '/terms-of-service',
            title: t("termsOfService"),
            content: t("termsOfServiceContent") // You'll need to add this translation
        }
    ];

    const openLegalModal = (title: string, content: string): void => {
        setSelectedLegalContent({ title, content });
    };

    const closeLegalModal = (): void => {
        setSelectedLegalContent(null);
    };

    return (
        <>
            <footer className="footer-bg text-white w-full py-24 relative overflow-hidden z-0">
                <div className="container xl:max-w-screen-xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16 md:gap-8 px-4">
                    <div className="flex flex-col gap-12 max-w-[400px]">
                        <div className="flex flex-col items-start justify-start gap-4">
                            <Image
                                src="/logos/logo_1x_white.png"
                                alt="Green Energy Logo"
                                width={150}
                                height={50}
                            />
                            <span>{t("description")}</span>
                        </div>

                        <div className="flex items-center gap-8">
                            <a href="">
                                <Image src={'/social/facebook.svg'} color="#e94222" alt="Facebook" width={22} height={32} />
                            </a>
                            <a href="">
                                <Image src={'/social/instagram.svg'} color="#e94222" alt="Instagram" width={22} height={32} />
                            </a>
                            <a href="">
                                <Image src={'/social/linkedin.svg'} color="#e94222" alt="LinkedIn" width={22} height={32} />
                            </a>
                        </div>

                        {/* <BackTopButton text={t("backToTop")} /> */}
                    </div>
                    <div className="flex gap-28 ">
                        <div className="flex flex-col gap-8">
                            <span className="font-extralight tracking-[1px] text-xl font-heading">{t("explore")}</span>
                            <div className="flex flex-col gap-6 font-medium">
                                {navigation.map((item) => (
                                    <a  key={item.name} 
                                        href={item.href}
                                        className="text-[#ffffff] hover:text-[#e94222] transition-all duration-300 cursor-pointer text-xs uppercase">
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-8">
                            <span className="font-extralight tracking-[1px] text-xl font-heading">Legal</span>
                            <div className="flex flex-col gap-6 font-medium">
                                {legalLinks.map((item) => (
                                    <button 
                                        key={item.name} 
                                        onClick={() => openLegalModal(item.title, item.content)}
                                        className="text-left text-[#ffffff] hover:text-[#e94222] transition-all duration-300 cursor-pointer text-xs uppercase"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Legal Modal */}
            {selectedLegalContent && (
                <div 
                    className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={closeLegalModal}
                >
                    <div 
                        className="bg-white text-black rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{selectedLegalContent.title}</h2>
                            <button
                                onClick={closeLegalModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="prose prose-sm max-w-none">
                            <p className="whitespace-pre-wrap">{selectedLegalContent.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}