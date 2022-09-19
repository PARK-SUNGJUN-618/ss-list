import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../../components/SsPortfolio/SectionTitle";

export default function Contact() {
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const { _id, category, ...contact } = portfolioData.filter(
    (data) => data.category === "contact"
  )[0];

  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map((key, index) => {
            return (
              <p key={index} className="ml-5">
                <span className="text-tertiary">{key} : </span>
                <span className="text-tertiary">{contact[key]}</span>
              </p>
            );
          })}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
            background="transparent"
            speed="1"
            loop
            // controls
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}
