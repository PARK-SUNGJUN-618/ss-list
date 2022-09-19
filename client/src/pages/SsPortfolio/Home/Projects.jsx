import { useState } from "react";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";
import { projects } from "../../../resources/SsPortfolio/projects";

export default function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-60
          sm:flex-row sm:overflow-x-scroll sm:w-full scrollbar sm:gap-2"
        >
          {projects.map((project, index) => {
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
                        ? "text-tertiary border-tertiary border-l-4 -ml-[3px] sm:-ml-0 bg-[#1a7f5a31]"
                        : "text-white"
                    }
                  `}
                >
                  {project.title}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            className="h-60 w-72 sm:h-40"
            src={projects[selectedItemIndex].image}
            alt=""
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-2xl">
              {projects[selectedItemIndex].title}
            </h1>
            <p className="text-white whitespace-pre-wrap min-h-40">
              {projects[selectedItemIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
