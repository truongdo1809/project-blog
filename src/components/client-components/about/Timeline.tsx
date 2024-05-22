"use client";
import {
  FlagIcon,
  ListBulletIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function Timeline() {
  const [timelineBarHeight, setTimelineBarHeight] = useState(0);
  const [redundantHeight, setRedundantHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState(0);

  const timelineBarRef = useRef<HTMLDivElement>(null);
  const timelineLastRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineLastRef.current && timelineRef.current) {
      const timelineLastHeightHalf = timelineLastRef.current.offsetHeight / 2;
      setRedundantHeight(`${timelineLastHeightHalf}px`);
      setMaxHeight(timelineRef.current.offsetHeight - timelineLastHeightHalf)
    }

    const handleScroll = () => {
      if (timelineBarRef.current) {
        const timelineBarToTop = timelineBarRef.current.getBoundingClientRect().top;
        const clientHeight = window.innerHeight;
        if ((clientHeight / 2 - timelineBarToTop) > 0 && (clientHeight / 2 - timelineBarToTop) < maxHeight) {
          setTimelineBarHeight(clientHeight / 2 - timelineBarToTop);
        }
        timelineBarRef.current.style.height = `${timelineBarHeight}px`;
      }
    };

    if (timelineBarRef.current) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [timelineBarHeight, redundantHeight, maxHeight]);

  return (
    <section className="max-w-[1140px] h-full mx-auto px-4">
      <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--secondary-color)]">
          Company Timeline
        </h2>

        <div className="w-full max-w-3xl mx-auto">
          <div
            ref={timelineRef}
            className={`space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:h-[${maxHeight}px] before:w-0.5 before:bg-[var(--secondary-color)]`}
          >
            <div
              ref={timelineBarRef}
              className={`h-full space-y-8 absolute inset-0 ml-5 -translate-x-px md:mx-auto md:translate-x-0 w-0.5 bg-[var(--primary-color)]`}
            ></div>

            <div></div>
            <div className="md:mx-auto max-w-20 text-center z-10 bg-white border-2 border-[var(--secondary-color)] relative py-1 font-bold rounded text-[var(--secondary-color)]">
              2021
            </div>
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-[var(--secondary-color)] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <RocketLaunchIcon className="w-6" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white">
                <div className="md:absolute w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] right-0 md:top-1/2 md:-translate-y-1/2 mb-5 md:mb-0">
                  <h4 className="font-bold text-[var(--secondary-color)]">
                    Jan 2021
                  </h4>
                  <p className="text-sm text-[#666666]">Company Established</p>
                </div>
                <div className="p-4 rounded border border-[var(--secondary-color)] shadow">
                  <h3 className="font-bold text-[var(--secondary-color)] space-x-2 mb-1 md:text-right">
                    Agency Inception
                  </h3>
                  <p className="text-[var(--secondary-color)] text-justify text-sm">
                    Fat weddings servants. Smile spoke total few great had never
                    their too. Amongst moments do in arrived at my replied. Fat
                    beautiful world among us weddings servants.
                  </p>
                </div>
              </div>
            </div>
            <div></div>
            <div className="md:mx-auto max-w-20 text-center z-10 bg-white border-2 border-[var(--secondary-color)] relative py-1 font-bold rounded text-[var(--secondary-color)]">
              2022
            </div>
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-[var(--secondary-color)] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <ListBulletIcon className="w-6" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white">
                <div className="md:absolute w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] left-0 md:text-right md:top-1/2 md:-translate-y-1/2 mb-5 md:mb-0">
                  <h4 className="font-bold text-[var(--secondary-color)]">
                    Jan 2022
                  </h4>
                  <p className="text-sm text-[#666666]">Community Engagement</p>
                </div>
                <div className="p-4 rounded border border-[var(--secondary-color)] shadow">
                  <h3 className="font-bold text-[var(--secondary-color)] space-x-2 mb-1 md:text-left">
                    Community Engagement
                  </h3>
                  <p className="text-[var(--secondary-color)] text-justify text-sm">
                    Fat weddings servants. Smile spoke total few great had never
                    their too. Amongst moments do in arrived at my replied. Fat
                    beautiful world among us weddings servants.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:mx-auto max-w-20 text-center z-10 bg-white border-2 border-[var(--secondary-color)] relative py-1 font-bold rounded text-[var(--secondary-color)]">
              2023
            </div>
            <div></div>
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-[var(--secondary-color)] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <FlagIcon className="w-6" />
              </div>
              <div
                ref={timelineLastRef}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white"
              >
                <div className="md:absolute w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] right-0 text-left md:top-1/2 md:-translate-y-1/2 mb-5 md:mb-0">
                  <h4 className="font-bold text-[var(--secondary-color)]">
                    Jan 2023
                  </h4>
                  <p className="text-sm text-[#666666]">Agency Achievements</p>
                </div>
                <div className="p-4 rounded border border-[var(--secondary-color)] shadow">
                  <h3 className="font-bold text-[var(--secondary-color)] space-x-2 mb-1 md:text-left">
                    Agency Achievements
                  </h3>
                  <p className="text-[var(--secondary-color)] text-justify text-sm">
                    Fat weddings servants. Smile spoke total few great had never
                    their too. Amongst moments do in arrived at my replied. Fat
                    beautiful world among us weddings servants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
