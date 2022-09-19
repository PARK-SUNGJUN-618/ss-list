import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="px-10 py-5 bg-primary flex justify-between w-screen">
      <h1
        className="text-secondary text-4xl font-semibold cursor-pointer rounded-full w-11 h-11 bg-white bg-opacity-10 text-center"
        onClick={() => window.location.replace("/")}
      >
        P
      </h1>
      <Link to="/ssPortfolio">
        <h1
          className="text-white text-4xl font-semibold cursor-pointer rounded-full w-11 h-11 bg-white bg-opacity-10 text-center"
          // onClick={() => window.location.replace("/ssPortfolio")}
        >
          S
        </h1>
      </Link>
      <Link to="/ssPortfolio/admin">
        <h1 className="text-tertiary text-4xl font-semibold rounded-full w-11 h-11 bg-white bg-opacity-10 text-center">
          J
        </h1>
      </Link>
    </div>
  );
}
