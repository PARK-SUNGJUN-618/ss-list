import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";

export default function About() {
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const { skills, lottieURL, description1, description2 } =
    portfolioData.filter((data) => data.category === "about")[0];

  return (
    <div>
      <SectionTitle title="About" />
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[70vh] w-1/2 sm:w-full sm:h-[40vh]">
          <lottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            loop
            // controls
            autoplay
            // style="width: 300px; height: 300px;"
          ></lottie-player>
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white whitespace-pre-wrap">{description1 || ""}</p>
          <p className="text-white whitespace-pre-wrap">{description2 || ""}</p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Here are a few technologies I've been working with recently:
        </h1>
        <div className="flex flex-wrap gap-10 mt-5 sm:grid sm:grid-cols-2 sm:justify-center sm:justify-items-center sm:gap-8">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="border border-tertiary py-3 px-10 rounded sm:w-4/5 sm:text-center sm:px-0"
              >
                <h1 className="text-tertiary">{skill}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
