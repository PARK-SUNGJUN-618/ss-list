import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Header from "../../../components/SsPortfolio/Header";
import Loader from "../../../components/SsPortfolio/Loader";
import SsPortfolioAdmin from "../../../pages/SsPortfolio/Admin";
import {
  HideLoading,
  SetPortfolioData,
  ShowLoading,
  ReloadData,
} from "../../../redux/ssPortfolioSlice";

import About from "./About";
import Contact from "./Contact";
import Courses from "./Courses";
import Experiences from "./Experiences";
import Footer from "./Footer";
import Intro from "./Intro";
import LeftSider from "./LeftSider";
import Projects from "./Projects";

export default function Home() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.ssPortfolio
  );
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    dispatch(ShowLoading());
    try {
      const res = await fetch("/api/ssportfolio/getPortfolioData");
      const taskArrayJson = await res.json();
      dispatch(SetPortfolioData(taskArrayJson));
      dispatch(ReloadData(false));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (!portfolioData) getPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) getPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadData]);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="h-screen overflow-x-hidden overflow-y-auto scrollbar">
        <Header />

        {portfolioData && (
          <div className="bg-primary px-40 sm:px-5">
            <Intro />
            <About />
            <Experiences />
            <Projects />
            <Courses />
            <Contact />
            <Footer />
            <LeftSider />
          </div>
        )}
      </div>
      <Routes>
        <Route path="admin" element={<SsPortfolioAdmin />}></Route>

      </Routes>
    </>
  );
}
