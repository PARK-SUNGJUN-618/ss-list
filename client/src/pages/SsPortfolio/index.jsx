import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import Home from "./Home";

import Loader from "../../components/SsPortfolio/Loader";
import {
  HideLoading,
  SetPortfolioData,
  ShowLoading,
  ReloadData,
} from "../../redux/ssPortfolioSlice";

export default function SsPortfolio() {
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
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </>
  );
}
