"use client";
import { SiMessenger } from "react-icons/si";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Xác định khi nào cần hiển thị biểu tượng khi cuộn trang
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <section className="w-full py-4 text-white bg-indigo-950">
        <footer className="max-w-[1140px] h-full mx-auto px-4">
          <div className="grid grid-cols-5 text-xs lg:text-base lg:grid-cols-9 gap-8">
            <div className="col-span-3 lg:col-span-3 mt-8 mb-0 lg:mb-8">
              <div className="mb-5">
                <Logo />
              </div>
              <div className="py-2 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                <PhoneIcon className="w-6 mr-2" />
                <span>0866211334</span>
              </div>
              <div className="py-2 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                <EnvelopeIcon className="w-6 mr-2" />
                <span>info@digitalagency.com</span>
              </div>
              <div className="py-2 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                <MapPinIcon className="w-6 mr-2" />
                <span>9574 Second Road Dunedin, FL 34698</span>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-2 mt-8 mb-0 lg:mb-8">
              <h3 className="mb-5 text-xl">About Us</h3>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Our Story
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Team
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Clients
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Testimonials
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Social Media
              </p>
            </div>

            <div className="col-span-3 row-span-2 lg:col-span-2 lg:row-span-1 mb-8 mt-0 lg:mt-8">
              <h3 className="mb-5 text-xl">Services</h3>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Web Design
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Social Media
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                PPC Advertising
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Content Creation
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Testimonials
              </p>
            </div>

            <div className="col-span-2 row-span-2 lg:col-span-2 lg:row-span-1 mb-8 mt-0 lg:mt-8">
              <h3 className="mb-5 text-xl">Portfolio</h3>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Case Studies
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Projects
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Success Stories
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Latest Posts
              </p>
              <p className="py-1 flex items-center text-gray-400 hover:cursor-pointer hover:text-white">
                Web Design
              </p>
            </div>
          </div>
          <div className="border-t border-gray-500">
            <p className="pt-4 text-center text-gray-400">
              © 2024 Created with Royal Elementor Addons
            </p>
          </div>
        </footer>
      </section>
      <div
        className={`w-[60px] h-[60px] bg-[var(--primary-color)] transition-all rounded-full fixed right-8 bottom-[100px] flex justify-center items-center z-[10000] cursor-pointer ${
          isVisible ? " opacity-[1]" : " opacity-0"
        }`}
        onClick={scrollToTop}
      >
        <FaArrowUp className="text-3xl text-white" />
      </div>
      <div className="  w-[60px] h-[60px] bg-[var(--primary-color)]  rounded-full fixed right-8 bottom-4  flex justify-center items-center z-[10000] cursor-pointer">
        <SiMessenger className="text-3xl text-white" />
      </div>
    </div>
  );
}
