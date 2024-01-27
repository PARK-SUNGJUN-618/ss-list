import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";

export default function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const experiences = portfolioData.filter(
    (data) => data.category === "experience"
  );

  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        // URL이면 링크로 변환
        return (
          <Link to={part.split('/').pop()} className="text-blue-300">
            {part}
          </Link>
        );
      } else {
        // 일반 텍스트는 그대로 반환
        return part;
      }
    });
  };

  return (
    <div>
      <SectionTitle title="Team Projects" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-64
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
                  className={`text-xl px-5 py-3 w-60 sm:w-52 h-full break-words
                    ${
                      selectedItemIndex === index
                        ? "text-tertiary border-l-4 border-tertiary -ml-[3px] sm:-ml-0 bg-[#1a7f5a31]"
                        : "text-white"
                    }
                  `}
                >
                  {experience.period}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-3xl">
            {experiences[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertiary text-2xl">
            {experiences[selectedItemIndex].company}
          </h1>
          <p className="text-white whitespace-pre-wrap min-h-40 text-lg">
            {renderTextWithLinks(experiences[selectedItemIndex].description)}
          </p>
        </div>
      </div>
    </div>
  );
}
