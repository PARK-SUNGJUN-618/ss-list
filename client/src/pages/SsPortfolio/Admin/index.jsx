import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../../components/SsPortfolio/Header";
import Loader from "../../../components/SsPortfolio/Loader";
import { Tabs, Tab } from "../../../components/SsPortfolio/Tabs";
import AdminAbout from "./AdminAbout";
import AdminContact from "./AdminContact";
import AdminCourses from "./AdminCourses";
import AdminExperiences from "./AdminExperiences";
import AdminIntro from "./AdminIntro";
import AdminProjects from "./AdminProjects";

export default function Admin() {
  const { loading, portfolioData } = useSelector((state) => state.ssPortfolio);
  const [adminCode, setAdminCode] = useState(""); // 추가된 부분

  const handleAdminCodeChange = (e) => {
    setAdminCode(e.target.value);
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="h-screen bg-primary overflow-y-auto overflow-x-hidden scrollbar">
        <Header />
        {adminCode !== "0618" && (
          <div className="text-white m-3 w-full text-center pt-64">
            Admin　Password：{" "}
            <input type="password" value={adminCode} onChange={handleAdminCodeChange} />
          </div>
        )}
        {adminCode === "0618" && portfolioData && (
          <Tabs>
            <Tab label="Intro" active>
              <AdminIntro />
            </Tab>
            <Tab label="About">
              <AdminAbout />
            </Tab>
            <Tab label="Experiences">
              <AdminExperiences />
            </Tab>
            <Tab label="Projects">
              <AdminProjects />
            </Tab>
            <Tab label="Courses">
              <AdminCourses />
            </Tab>
            <Tab label="Contact">
              <AdminContact />
            </Tab>
          </Tabs>
        )}
      </div>
    </>
  );
}
