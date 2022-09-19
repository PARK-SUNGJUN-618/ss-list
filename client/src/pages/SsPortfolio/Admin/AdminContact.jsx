import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "../../../components/SsPortfolio/Snackbar";
import { HideLoading, ShowLoading } from "../../../redux/ssPortfolioSlice";

export default function AdminContact() {
  const snackbarRef = useRef(null);
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const contactData = portfolioData.filter(
    (data) => data.category === "contact"
  )[0];

  const [name, setName] = useState(contactData.name);
  const [birth, setBirth] = useState(contactData.birth);
  const [gender, setGender] = useState(contactData.gender);
  const [email, setEmail] = useState(contactData.email);
  const [mobile, setMobile] = useState(contactData.mobile);
  const [country, setCountry] = useState(contactData.country);

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const body = {
        name,
        birth,
        gender,
        email,
        mobile,
        country,
      };
      console.log(JSON.stringify(body));
      const response = await fetch(`/api/ssportfolio/updateContact`, {
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="px-3 py-3 placeholder-slate-300
            text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
            focus:outline-none focus:ring w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="birth">Birth</label>
          <input
            type="text"
            placeholder="Birth"
            id="birth"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            placeholder="Gender"
            id="gender"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            placeholder="Mobile"
            id="mobile"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            placeholder="Country"
            id="country"
            className="px-3 py-3 placeholder-slate-300
        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
        focus:outline-none focus:ring w-full"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="py-10 flex justify-start w-full">
          <button
            className=" bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase
              px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={handleUpdateContact}
          >
            SAVE
          </button>
          <Snackbar
            ref={snackbarRef}
            message="Contact Saved Successfully!"
            type="success"
          />
        </div>
      </form>
    </>
  );
}
