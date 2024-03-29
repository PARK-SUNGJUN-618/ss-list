import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";
// import { projects } from "../../../resources/SsPortfolio/projects";

export default function PersonalProjects() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const projects = portfolioData.filter((data) => data.category === "project");

  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      // URL이면 링크로 변환
      if (part.match(urlRegex)) {
        // 도메인이 헤로쿠앱일 경우 Link반환
        if (part.split('/')[2] === 'ss-list.herokuapp.com') {
          return (
            <Link to={part.split('/').pop()} className="text-blue-300">
                {part}
            </Link>
          );
        // 그 외의 경우에는 일반 링크로 변환
        } else {
          return (
            <a className="text-blue-300" key={index} href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          );
        }
      } else {
        // 일반 텍스트는 그대로 반환
        return part;
      }
    });
  };

  return (
    <div>
      <SectionTitle title="Personal Projects" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-96
          sm:flex-row sm:overflow-x-scroll sm:w-full scrollbar sm:gap-2"
        >
          {projects.sort((a, b) => b.image.localeCompare(a.image)).map((project, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl px-5 py-3 w-64 sm:w-52 h-full break-words
                    ${
                      selectedItemIndex === index
                        ? "text-tertiary border-tertiary border-l-4 -ml-[3px] sm:-ml-0 bg-[#1a7f5a31]"
                        : "text-white"
                    }
                  `}
                >
                  {project.image}
                </h1>
              </div>
            );
          })}
        </div>
        {/* <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            className="h-60 w-72 sm:h-40"
            src={projects[selectedItemIndex].image}
            alt=""
          /> */}
          <div className="flex flex-col gap-5 w-full">
            <h1 className="text-secondary text-3xl">
              {projects[selectedItemIndex].title}
            </h1>
            <h1 className="text-tertiary text-2xl">
              {projects[selectedItemIndex].link}
            </h1>
            <p className="text-white whitespace-pre-wrap min-h-40 text-lg">
              {renderTextWithLinks(projects[selectedItemIndex].description)}
            </p>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}
