import { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";

export default function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const experiences = portfolioData.filter(
    (data) => data.category === "experience"
  );

  return (
    <div>
      <SectionTitle title="Experiences" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-60
          sm:flex-row sm:overflow-x-scroll sm:w-full sm:gap-2 scrollbar"
        >
          {experiences.map((experience, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl px-5 py-3 w-60 sm:w-52 h-full break-words ${
                    selectedItemIndex === index
                      ? "text-tertiary border-l-4 border-tertiary -ml-[3px] sm:-ml-0 bg-[#1a7f5a31]"
                      : "text-white"
                  }`}
                >
                  {experience.period}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-2xl">
            {experiences[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertiary text-2xl">
            {experiences[selectedItemIndex].company}
          </h1>
          <p className="text-white whitespace-pre-wrap min-h-40">
            {experiences[selectedItemIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
