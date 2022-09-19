import { Link } from "react-router-dom";
import couple1 from "../img/couple1.png";

export default function Main() {
  return (
    <div className="w-screen h-screen bg-[#E7C597] bg-opacity-20 overflow-x-hidden">
      <div className="">
        <div className="w-full flex justify-center py-10">
          <img src={couple1} alt="" className="w-52 h-52"></img>
        </div>
        <div className="flex flex-col items-center gap-3 text-xl font-[Broadway]">
          <Link to="/ssList">
            <div className="text-center">
              <button
                className="font-black p-3 rounded-md bg-[#BDD7EE] opacity-70 w-52
            transition-colors duration-500 hover:bg-[#5d90bd] active:bg-[#5d90bd]"
              >
                Go! SSList
              </button>
            </div>
          </Link>
          <Link to="/ssDiary">
            <div className="text-center">
              <button
                className="font-black p-3 rounded-md bg-[#BDD7EE] opacity-70 w-52
                transition-colors duration-500 hover:bg-[#5d90bd] active:bg-[#5d90bd]"
              >
                Go! SSDiary
              </button>
            </div>
          </Link>
          <Link to="/ssPortfolio">
            <div className="text-center">
              <button
                className="font-black p-3 rounded-md bg-[#BDD7EE] opacity-70 w-52
                transition-colors duration-500 hover:bg-[#5d90bd] active:bg-[#5d90bd]"
              >
                Go! SSPortfolio
              </button>
            </div>
          </Link>
          <Link to="/motion">
            <div className="text-center">
              <button
                className="font-black p-3 rounded-md bg-[#BDD7EE] opacity-70 w-52
                transition-colors duration-500 hover:bg-[#5d90bd] active:bg-[#5d90bd]"
              >
                Go! Motion
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
