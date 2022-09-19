import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "../../../components/SsPortfolio/Snackbar";
import { HideLoading, ShowLoading } from "../../../redux/ssPortfolioSlice";

export default function AdminIntro() {
  const snackbarRef = useRef(null);
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const introData = portfolioData.filter(
    (data) => data.category === "intro"
  )[0];

  const [welcomeText, setWelcomeText] = useState(introData.welcomeText);
  const [firstName, setFirstName] = useState(introData.firstName);
  const [lastName, setLastName] = useState(introData.lastName);
  const [caption, setCaption] = useState(introData.caption);
  const [description, setDescription] = useState(introData.description);

  const handleUpdateIntro = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const body = {
        welcomeText,
        firstName,
        lastName,
        caption,
        description,
      };
      console.log(JSON.stringify(body));
      const response = await fetch(`/api/ssportfolio/updateIntro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      dispatch(HideLoading());
      snackbarRef.current.show();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form className="flex flex-col py-5 px-10 text-xl gap-4 text-secondary">
        <div className="flex flex-col gap-1">
          <label htmlFor="welcomeText">Welcome Text</label>
          <input
            type="text"
            placeholder="Welcome Text"
            id="welcomeText"
            className="px-3 py-3 placeholder-slate-300
            text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
            focus:outline-none focus:ring w-full"
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            placeholder="Caption"
            id="caption"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            id="description"
            className="px-3 py-3 placeholder-slate-300 shadow outline-none
              text-slate-600 relative bg-white rounded text-sm border border-zinc-400
              focus:outline-none focus:ring w-full h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="py-10 flex justify-start w-full">
          <button
            className=" bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase
              px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={handleUpdateIntro}
          >
            SAVE
          </button>
          <Snackbar
            ref={snackbarRef}
            message="Intro Saved Successfully!"
            type="success"
          />
        </div>
      </form>
    </>
  );
}
