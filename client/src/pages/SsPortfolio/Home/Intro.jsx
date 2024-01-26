import React, { useRef } from "react";
import { useSelector } from "react-redux";
import About from './About';

export default function Intro() {
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const { welcomeText, firstName, lastName, caption, description } =
    portfolioData.filter((data) => data.category === "intro")[0];

  const aboutRef = useRef(null);
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="h-[150hv] bg-primary">
        <div className="flex flex-col items-start justify-center gap-8 placeholder-yellow-100">
          <newLine/>
          <newLine/>
          <newLine/>
          <h1 className="text-3xl text-white">{welcomeText || ""}</h1>
          <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
            {firstName || ""}
          </h1>
          <h1 className="text-7xl text-secondary">{lastName || ""}</h1>
          <newLine/>
          <h1 className="text-6xl sm:text-3xl text-white font-semibold">
            {caption || ""}
          </h1>
          <newLine/>
          <newLine/>
          <newLine/>
          <newLine/>
          <p className="text-xl text-white w-full whitespace-pre-wrap">
            {description || ""}
          </p>
          <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded" onClick={scrollToAbout}>
          {/* <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded"> */}
            スタート！
          </button>
          <newLine/>
          <newLine/>
        </div>
        <About ref={aboutRef} />
      </div>
    </>
  );
}
