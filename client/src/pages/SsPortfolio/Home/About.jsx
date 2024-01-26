import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";

// function About() {
const About = forwardRef((props, ref) => {
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const { skills, lottieURL, description1, description2 } =
    portfolioData.filter((data) => data.category === "about")[0];

  return (
    <div ref={ref}>
      <SectionTitle title="About"/>
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[70vh] w-6/12 sm:w-full sm:h-[40vh]">
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
        <div className="flex flex-col gap-5 w-6/12 sm:w-full text-xl">
          <p className="text-white whitespace-pre-wrap leading-8">{description1 || ""}</p>
          <p className="text-white whitespace-pre-wrap">{description2 || ""}</p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-tertiary text-2xl border-l-4 pl-2">
          Skills：
        </h1>
        <div className="flex flex-wrap gap-10 mt-5 sm:grid sm:grid-cols-1 sm:justify-center sm:justify-items-center sm:gap-8">
          {skills.map((skill, index) => {
            const [skillTitle, skillContent] = skill.split(':');
            return (
              <div className="text-xl sm:w-full sm:grid-cols-1 sm:justify-items-center sm:text-center border border-tertiary">
                <div className="text-tertiary pl-2">{skillTitle}</div>
                <div
                  key={index}
                  className="border border-tertiary py-3 px-14 sm:w-full sm:text-center sm:px-0"
                >
                  <h1 className="text-tertiary py-2">{skillContent}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default About;