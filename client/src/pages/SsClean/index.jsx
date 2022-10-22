import { Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function SsClean() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/admin" element={<Admin />}></Route> */}
      </Routes>
    </>
  );
}
