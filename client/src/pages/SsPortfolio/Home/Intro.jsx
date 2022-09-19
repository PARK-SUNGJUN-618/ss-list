import React from "react";
import { useSelector } from "react-redux";

export default function Intro() {
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const { welcomeText, firstName, lastName, caption, description } =
    portfolioData.filter((data) => data.category === "intro")[0];

  return (
    <>
      <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 placeholder-yellow-100">
        <h1 className="text-white">{welcomeText || ""}</h1>
        <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
          {firstName || ""} {lastName || ""}
        </h1>
        <h1 className="text-7xl sm:text-3xl text-white font-semibold">
          {caption || ""}
        </h1>
        <p className="text-white w-full whitespace-pre-wrap">
          {description || ""}
        </p>
        <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded">
          Get Started
        </button>
      </div>
    </>
  );
}
