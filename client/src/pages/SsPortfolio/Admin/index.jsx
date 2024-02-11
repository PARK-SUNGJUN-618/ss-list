import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../../components/SsPortfolio/Header";
import Loader from "../../../components/SsPortfolio/Loader";
import { Tabs, Tab } from "../../../components/SsPortfolio/Tabs";
import AdminAbout from "./AdminAbout";
import AdminContact from "./AdminContact";
import AdminCourses from "./AdminCourses";
import AdminTeamProjects from "./AdminTeamProjects";
import AdminIntro from "./AdminIntro";
import AdminPersonalProjects from "./AdminPersonalProjects";

export default function Admin() {
  const { loading, portfolioData } = useSelector((state) => state.ssPortfolio);
  const [adminID, setAdminID] = useState(""); // 추가된 부분
  const [adminPassword, setAdminPassword] = useState(""); // 추가된 부분

  const adminIDCheck = "jun";
  const adminPasswordCheck = "0618";

  const handleAdminIDCodeChange = (e) => {
    setAdminID(e.target.value);
  };

  const handleAdminPasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="h-screen bg-primary overflow-y-auto overflow-x-hidden scrollbar">
        <Header />
        {(adminID !== adminIDCheck || adminPassword !== adminPasswordCheck) && (
          <div className="flex flex-col items-center">
            <div className="text-white m-3 w-full text-center pt-64">
              Admin　ID　　　：{" "}
              <input className="text-black pl-2" type="text" value={adminID} onChange={handleAdminIDCodeChange} />
            </div>
            <div className="text-white m-3 w-full text-center">
              Admin　Password：{" "}
              <input className="text-black pl-2" type="password" value={adminPassword} onChange={handleAdminPasswordChange} />
            </div>
            <div className="">
            <h1
              className="text-white text-4xl font-semibold cursor-pointer rounded-full w-full bg-white bg-opacity-10 my-10 px-10 pt-3 pb-5"
              onClick={() => window.location.replace("/")}
            >
              Go Back!
            </h1>
            </div>
          </div>
        )}
        {adminID === adminIDCheck && adminPassword === adminPasswordCheck && portfolioData && (
          <Tabs>
            <Tab label="Intro" active>
              <AdminIntro />
            </Tab>
            <Tab label="About">
              <AdminAbout />
            </Tab>
            <Tab label="Team Projects">
              <AdminTeamProjects />
            </Tab>
            <Tab label="Personal Projects">
              <AdminPersonalProjects />
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
