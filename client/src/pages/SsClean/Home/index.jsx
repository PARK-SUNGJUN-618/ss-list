import { useState } from "react";
import { addDays } from "date-fns";
import Header from "../../../components/SsClean/Header";
import NewLine from "../../../components/NewLine";
import Datepicker from "../../../components/SsClean/Datepicker";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const dayIncrease = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const dayDecrease = () => {
    setSelectedDate(addDays(selectedDate, -1));
  };

  return (
    <>
      <div className="h-screen w-screen bg-ssclean-3">
        <Header />

        <NewLine repeat="2" />
        <div className="grid grid-cols-4 justify-between items-center justify-items-center">
          <div className="col-span-1">
            <button
              className="active:bg-ssclean-2 p-2 rounded-full ml-5 text-ssclean-7"
              onClick={dayDecrease}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <div className="col-span-2 w-full bg-ssclean-3">
            <Datepicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="col-span-1">
            <button
              className="active:bg-ssclean-2 p-2 rounded-full mr-5 text-ssclean-7"
              onClick={dayIncrease}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <NewLine repeat="2" />
      </div>
    </>
  );
}
