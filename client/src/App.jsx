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

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/ssList/*" element={<SsList />}></Route>
          <Route path="/ssDiary/*" element={<SsDiary />}></Route>
          <Route path="/ssClean/*" element={<SsClean />}></Route>
          <Route path="/ssPortfolio/*" element={<SsPortfolio />}></Route>
          <Route path="/motion/*" element={<Motion />}></Route>
          <Route path="/ssColor/*" element={<SsColor />}></Route>
          <Route path="/ssMemory/*" element={<SsMemory />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
