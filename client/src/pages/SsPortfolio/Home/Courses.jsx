import { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";

export default function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const courses = portfolioData.filter((data) => data.category === "course");

  return (
    <div>
      <SectionTitle title="Courses" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3
          sm:flex-row sm:overflow-x-scroll sm:w-full scrollbar"
        >
          {courses.map((course, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl px-5 w-60 sm:w-52 py-3 h-full break-words
                    ${
                      selectedItemIndex === index
                        ? "text-tertiary border-tertiary border-l-4 -ml-[3px] sm:-ml-0 bg-[#1a7f5a31]"
                        : "text-white"
                    }
                  `}
                >
                  {course.title}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-2xl">
              {courses[selectedItemIndex].title}
            </h1>
            <p className="text-white whitespace-pre-wrap min-h-40">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <img
            className="h-52 w-80"
            src={courses[selectedItemIndex].image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
