import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import SsList from "./pages/SsList";
import SsDiary from "./pages/SsDiary";
import SsPortfolio from "./pages/SsPortfolio";
import SsColor from "./pages/SsColor/Home";
import Motion from "./pages/Motion";
import SsClean from "./pages/SsClean";
import SsMemory from "./pages/SsMemory";
import CommonConst from "./components/CommonConst";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={CommonConst.PATH_index} element={<SsPortfolio />}></Route>
          <Route path={CommonConst.PATH_main} element={<Main />}></Route>
          <Route path={CommonConst.PATH_ssList} element={<SsList />}></Route>
          <Route path={CommonConst.PATH_ssDiary} element={<SsDiary />}></Route>
          <Route path={CommonConst.PATH_ssClean} element={<SsClean />}></Route>
          <Route path={CommonConst.PATH_ssPortfolio} element={<SsPortfolio />}></Route>
          <Route path={CommonConst.PATH_motion} element={<Motion />}></Route>
          <Route path={CommonConst.PATH_ssColor} element={<SsColor />}></Route>
          <Route path={CommonConst.PATH_ssMemory} element={<SsMemory />}></Route>
          <Route path={CommonConst.PATH_notFound} element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
