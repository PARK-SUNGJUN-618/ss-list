import { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";

export default function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const courses = portfolioData.filter((data) => data.category === "course");

  return (
    <div>
      <SectionTitle title="Courses & Details" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-96
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
                  className={`text-xl px-5 w-64 sm:w-52 py-3 h-full break-words
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
        <div className="flex gap-10 w-full sm:flex-col sm:items-center">
          {courses[selectedItemIndex].image !== "" && (
            <img
              className="h-96"
              src={courses[selectedItemIndex].image}
              alt=""
            />
          )}
          <div className="flex flex-col gap-5 w-full pt-6 sm:pt-0 min-h-96">
            <h1 className="text-secondary text-3xl">
              {courses[selectedItemIndex].title}
            </h1>
            <p className="text-white whitespace-pre-wrap min-h-40 text-lg">
            {courses[selectedItemIndex].description}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
