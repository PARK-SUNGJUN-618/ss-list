import logo from "../../img/trnLogo.png";

export default function Header() {
  return (
    <div className="px-5 py-2 bg-ssclean-3 flex justify-between w-full items-center">
      <h1
        className="text-ssclean-7 text-4xl font-semibold cursor-pointer text-center"
        onClick={() => window.location.replace("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </h1>
      <h1 className="text-ssclean-7 text-3xl font-semibold cursor-pointer text-center flex font-[Broadway]">
        <img src={logo} alt="" className="w-10 h-10"></img>Clean
      </h1>
      <h1 className="text-ssclean-7 text-2xl font-semibold cursor-pointer rounded-full p-1 active:text-ssclean-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </h1>
    </div>
  );
}
