import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Link to="/">
        <div className="text-2xl text-center">
          404 error : No page.<br></br>
          <button className="border border-black px-3 py-2 rounded-2xl">Go! Main</button>
        </div>
      </Link>
    </>
  );
}
