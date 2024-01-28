import React, { useRef } from "react";
import { useSelector } from "react-redux";
import About from './About';
import NewLine from "../../../components/NewLine";

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
          <NewLine repeat="3"/>
          <h1 className="text-2xl text-white">{welcomeText || ""}</h1>
          <h1 className="text-7xl sm:text-4xl text-tertiary font-semibold">
            {firstName || ""}
          </h1>
          <h1 className="text-7xl sm:text-4xl text-secondary">{lastName || ""}</h1>
          <NewLine/>
          <h1 className="text-6xl sm:text-3xl text-white font-semibold">
            {caption || ""}
          </h1>
          <NewLine repeat="3"/>
          <p className="text-xl sm:text-lg text-white w-full whitespace-pre-wrap">
            {description || ""}
          </p>
          <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded" onClick={scrollToAbout}>
          {/* <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded"> */}
            スタート！
          </button>
          <NewLine repeat="2"/>
        </div>
        <About ref={aboutRef} />
      </div>
    </>
  );
}
