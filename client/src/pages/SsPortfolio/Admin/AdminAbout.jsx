import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "../../../components/SsPortfolio/Snackbar";
import { HideLoading, ShowLoading } from "../../../redux/ssPortfolioSlice";

export default function AdminAbout() {
  const snackbarRef = useRef(null);
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const aboutData = portfolioData.filter(
    (data) => data.category === "about"
  )[0];

  const [lottieURL, setLottieURL] = useState(aboutData.lottieURL);
  const [description1, setDescription1] = useState(aboutData.description1);
  const [description2, setDescription2] = useState(aboutData.description2);
  const [skills, setSkills] = useState(aboutData.skills.join("$"));

  const handleUpdateAbout = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const body = {
        lottieURL,
        description1,
        description2,
        skills: skills.split("$"),
      };
      console.log(JSON.stringify(body));
      const response = await fetch(`/api/ssportfolio/updateAbout`, {
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
          <label htmlFor="lottieURL">Lottie URL</label>
          <input
            type="text"
            placeholder="Lottie URL"
            id="lottieURL"
            className="px-3 py-3 placeholder-slate-300
            text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
            focus:outline-none focus:ring w-full"
            value={lottieURL}
            onChange={(e) => setLottieURL(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description1">Description1</label>
          <textarea
            placeholder="Description1"
            id="description1"
            className="px-3 py-3 placeholder-slate-300 shadow outline-none
              text-slate-600 relative bg-white rounded text-sm border border-zinc-400
              focus:outline-none focus:ring w-full h-32"
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description2">Description2</label>
          <textarea
            placeholder="Description2"
            id="description2"
            className="px-3 py-3 placeholder-slate-300 shadow outline-none
              text-slate-600 relative bg-white rounded text-sm border border-zinc-400
              focus:outline-none focus:ring w-full h-32"
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            placeholder="Skills"
            id="skills"
            className="px-3 py-3 placeholder-slate-300 shadow outline-none
              text-slate-600 relative bg-white rounded text-sm border border-zinc-400
              focus:outline-none focus:ring w-full"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="py-10 flex justify-start w-full">
          <button
            className=" bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase
              px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={handleUpdateAbout}
          >
            SAVE
          </button>
          <Snackbar
            ref={snackbarRef}
            message="About Saved Successfully!"
            type="success"
          />
        </div>
      </form>
    </>
  );
}
