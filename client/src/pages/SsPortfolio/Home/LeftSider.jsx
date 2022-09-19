import { Link } from "react-router-dom";

export default function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static sm:pb-5">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/">
            <i className="ri-home-8-line text-gray-600 cursor-pointer hover:text-white"></i>
          </Link>
          <Link to="/ssList">
            <i className="ri-list-check text-gray-600 cursor-pointer hover:text-white"></i>
          </Link>
          <Link to="/ssDiary">
            <i className="ri-file-list-line text-gray-600 cursor-pointer hover:text-white"></i>
          </Link>
          <i className="ri-mail-line text-gray-600 cursor-pointer hover:text-white"></i>
          <i className="ri-instagram-line text-gray-600 cursor-pointer hover:text-white"></i>
          <Link to="/ssPortfolio/admin">
            <i className="ri-admin-line text-gray-600 cursor-pointer hover:text-white"></i>
          </Link>
        </div>
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}
