import { useSelector } from "react-redux";

import Header from "../../../components/SsPortfolio/Header";

// import About from "./About";
import Contact from "./Contact";
import Courses from "./Courses";
import TeamProjects from "./TeamProjects";
import Footer from "./Footer";
import Intro from "./Intro";
import LeftSider from "./LeftSider";
import PersonalProjects from "./PersonalProjects";

export default function Home() {
  const { portfolioData } = useSelector((state) => state.ssPortfolio);

  return (
    <>
      {/* {loading ? <Loader /> : null} */}
      <div className="h-screen overflow-x-hidden overflow-y-auto scrollbar">
        <Header />

        {portfolioData && (
          <div className="bg-primary px-40 sm:px-5">
            <Intro />
            {/* スクロール移動のためIntro.jsxに移動
            <About /> */}
            <TeamProjects />
            <PersonalProjects />
            <Courses />
            <Contact />
            <Footer />
            <LeftSider />
          </div>
        )}
      </div>
      {/* <Routes>
        <Route path="/admin" element={<SsPortfolioAdmin />}></Route>
      </Routes> */}
    </>
  );
}
