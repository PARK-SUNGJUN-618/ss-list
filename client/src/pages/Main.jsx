import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <div className="w-full h-3"></div>
      <Link to="/ssList">
        <div className="text-center">
          <button className="font-black p-3 rounded-md w-40
          transition-colors duration-500 hover:bg-zinc-100 active:bg-zinc-200">Go! SSList</button>
        </div>
      </Link>
      <Link to="/ssDiary">
        <div className="text-center">
          <button className="font-black p-3 rounded-md w-40
          transition-colors duration-500 hover:bg-zinc-100 active:bg-zinc-200">Go! SSDiary</button>
        </div>
      </Link>
      <Link to="/motion">
        <div className="text-center">
          <button className="font-black p-3 rounded-md w-40
          transition-colors duration-500 hover:bg-zinc-100 active:bg-zinc-200">Go! Motion</button>
        </div>
      </Link>
    </>
  );
}
