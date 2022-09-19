import { useState, useEffect } from "react";
import NewLine from "../components/NewLine";
import logo from "../img/trnLogo.png";
import { format } from "date-fns";
import { Waypoint } from "react-waypoint";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

export default function SsDiary() {
  const [ssDiaries, setSsDiaries] = useState([]);
  const [selectedDiary, setSelectedDiary] = useState({});
  const [ssOrigContent, setSsOrigContent] = useState([]);
  const [ssModiContent, setSsModiContent] = useState([]);
  const [ssPage, setSsPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [showModalAddDiary, setShowModalAddDiary] = useState(false);
  const [showModalChangeOrigContent, setShowModalChangeOrigContent] =
    useState(false);
  const [showModalChangeModiContent, setShowModalChangeModiContent] =
    useState(false);
  const [showModalDetailedDiary, setShowModalDetailedDiary] = useState(false);

  const SSDIARIES_PER_PAGE = 10;

  // const diffViewerStyle = {
  //   variables: {
  //     light: {
  //       codeFoldGutterBackground: "#6F767E",
  //       codeFoldBackground: "#E2E4E5",
  //       removedBackground: "",
  //       addedBackground: "",
  //     }
  //   }
  // };

  async function getDiaries() {
    if (!hasNextPage) return;

    const res = await fetch(
      `/api/ssdiary/getSsDiary/${ssPage}&${SSDIARIES_PER_PAGE}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const diaryArrayJson = await res.json();
    const diaryArray = diaryArrayJson.map((diary) => {
      return {
        ...diary,
        ssCreateDate: new Date(diary.ssCreateDate),
        ssUpdateDate: new Date(diary.ssUpdateDate),
      };
    });

    //get totalCount
    const res2 = await fetch(`/api/ssdiary/getSsDiariesCount`);
    const totalCountJson = await res2.json();

    const totalCount = Number(totalCountJson.totalCount);
    // console.log("totalCount:",typeof totalCount)
    // console.log("ssTasks.length:",ssTasks.length)
    // console.log("diaryArray.length:",diaryArray.length)
    // console.log("totalLength:",typeof ssTasks.length+diaryArray.length)
    // console.log("hasNextPage1:",hasNextPage)
    console.log("diaryArray:", diaryArray);
    if (diaryArray) {
      if (totalCount === ssDiaries.length + diaryArray.length) {
        setHasNextPage(false);
      }

      setSsDiaries((ssDiaries) => [...ssDiaries, ...diaryArray]);
      setSsPage((ssPage) => ssPage + 1);
    }
  }

  const handleSsOrigContent = (event) => {
    setSsOrigContent(event.target.value);
    // console.log(event.target.value);
  };

  const handleSsModiContent = (event) => {
    setSsModiContent(event.target.value);
    // console.log(event.target.value);
  };

  const handleSubmitAddDiary = async (e) => {
    e.preventDefault();
    if (ssOrigContent === "") return;
    try {
      setShowModalAddDiary(false);
      const body = {
        ssOrigContent,
        ssModiContent: ssOrigContent,
        ssCreateDate: new Date(),
        ssUpdateDate: new Date(),
        ssIsDeleted: false,
      };
      const response = await fetch("/api/ssdiary/addDiary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      setSsOrigContent("");
      setSsModiContent("");
      setSsDiaries([]);
      setHasNextPage(true);
      setSsPage(1);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDetailedDiary = (diary) => {
    console.log("showModalDetailedDiary:", diary);
    setShowModalDetailedDiary(true);
    setShowModalChangeModiContent(false);
    setSelectedDiary(diary);
    setSsOrigContent(diary.ssOrigContent);
    setSsModiContent(diary.ssModiContent);
  };

  const handleRemoveDiary = async (_id) => {
    if (!window.confirm("Are you sure you wanna delete?")) return;
    setSsDiaries(ssDiaries.filter((diary) => diary._id !== _id));
    try {
      const deleteTask = await fetch(`/api/ssdiary/deleteDiary/${_id}`, {
        method: "DELETE",
      });
      console.log(deleteTask);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmitChangeOrigContent = async (e) => {
    e.preventDefault();
    if (ssOrigContent === "") return;
    const diaryArray = ssDiaries.map((diary) => {
      if (selectedDiary._id === diary._id) {
        return {
          ...diary,
          ssOrigContent: ssOrigContent,
          ssModiContent: ssOrigContent,
          ssUpdateDate: new Date(),
        };
      } else {
        return diary;
      }
    });
    setSsDiaries(diaryArray);
    try {
      setShowModalChangeOrigContent(false);
      const body = {
        ssOrigContent,
        ssModiContent: ssOrigContent,
        ssUpdateDate: new Date(),
      };
      const response = await fetch(
        `/api/ssdiary/changeOrigContent/${selectedDiary._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      console.log(response);

      // getTasks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmitChangeModiContent = async (e) => {
    e.preventDefault();
    if (ssModiContent === "") return;
    const diaryArray = ssDiaries.map((diary) => {
      if (selectedDiary._id === diary._id) {
        return {
          ...diary,
          ssModiContent: ssModiContent,
          ssUpdateDate: new Date(),
        };
      } else {
        return diary;
      }
    });
    setSsDiaries(diaryArray);
    setSelectedDiary({
      ...selectedDiary,
      ssModiContent: ssModiContent,
    });
    try {
      setShowModalChangeModiContent(false);
      const body = {
        ssModiContent,
        ssUpdateDate: new Date(),
      };
      const response = await fetch(
        `/api/ssdiary/changeModiContent/${selectedDiary._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      console.log(response);

      // getTasks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdateOrigContent = (diary) => {
    // if(!window.confirm("Are you sure you wanna update?")) return ;
    console.log("showModalChangeOrigContent:", diary);
    setShowModalChangeOrigContent(true);
    setSelectedDiary(diary);
    setSsOrigContent(diary.ssOrigContent);
    // setSsModiContent(diary.ssModiContent);
  };

  const ssDiaryDatas = () => {
    const result = ssDiaries.map((data) => {
      return (
        <div
          key={data._id}
          className="grid grid-cols-12 text-l items-center my-3 h-16
          border border-zinc-900"
        >
          <div className="col-span-2 grid grid-cols-1 h-full border-r border-zinc-700 border-collapse">
            <div className="col-span-1 w-full border-b bg-zinc-200 border-zinc-700 text-center self-start">
              {format(data.ssCreateDate, "EEE").toUpperCase()}
            </div>
            <div className="col-span-1 self-middle text-center">
              {format(data.ssCreateDate, "M/d")}
            </div>
          </div>
          <div
            className="col-span-8 mx-3 break-all truncate"
            onClick={() => handleDetailedDiary(data)}
          >
            {data.ssOrigContent}
          </div>
          {/* </div> */}
          <div className="col-span-1 mr-3 justify-self-center">
            <button
              className="text-green-500 active:text-green-600 active:bg-zinc-300 p-1 rounded-full"
              onClick={() => handleUpdateOrigContent(data)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
          <div className="col-span-1 mr-3 justify-self-center">
            <button
              className="text-red-500 active:text-red-600 active:bg-zinc-300 p-1 rounded-full"
              onClick={() => handleRemoveDiary(data._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      );
    });
    return result;
  };

  const loadMoreSsDiary = () => {
    if (ssPage > 1) {
      getDiaries();
    }
    // setSsPage( ssPage => ssPage + 1 );
  };

  useEffect(() => {
    if (ssPage === 1) {
      getDiaries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssPage]);

  return (
    <>
      <div className="w-screen h-screen bg-zinc-200 bg-dot_pattern bg-[length:30px_30px] ">
        <NewLine />
        <div className="grid grid-cols-3 justify-between items-center">
          <div className="justify-self-start text-3xl font-bold">
            <button
              className="active:bg-zinc-300 p-2 rounded-full ml-3"
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
            </button>
          </div>
          <div className="justify-self-center text-3xl font-black">
            <button
              className="flex"
              // onClick={() => setSelectedDate(new Date(new Date().setHours(0,0,0,0)))}
            >
              <img src={logo} alt="" className="w-10 h-10"></img>Diary
            </button>
          </div>
          <div className="justify-self-end text-3xl font-bold">
            <button
              className="active:bg-zinc-300 p-2 rounded-full mr-3"
              onClick={() => {
                setShowModalAddDiary(true);
                setSsOrigContent("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <NewLine repeat="4" />
        <div className="bg-white p-2 mx-6 my-5 rounded-md min-h-[80%] max-h-[85%] grid grid-rows-1">
          <div className="border border-zinc-500 p-3 overflow-auto">
            {ssDiaryDatas()}
            {hasNextPage && (
              <Waypoint onEnter={loadMoreSsDiary}>
                <div className="grid justify-center text-xl items-center pb-4 h-20">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </Waypoint>
            )}
          </div>
        </div>
      </div>
      {showModalAddDiary ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-5/6 my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Diary追加</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalAddDiary(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-4">
                    <label
                      className="text-sm text-gray-700 dark:text-gray-700"
                      htmlFor="ssOrigContent"
                    >
                      Diary
                    </label>
                    <textarea
                      id="ssOrigContent"
                      className="px-3 py-3 h-36 placeholder-slate-300
                        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                        focus:outline-none focus:ring w-full resize-none"
                      onChange={handleSsOrigContent}
                      value={ssOrigContent}
                      placeholder="Diary"
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="w-1/2 text-red-500 border border-red-500 rounded background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear
                      transition-all duration-150 "
                    type="button"
                    onClick={() => setShowModalAddDiary(false)}
                  >
                    Close
                  </button>
                  <button
                    className="w-1/2 bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmitAddDiary}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModalDetailedDiary ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative h-[80%] w-11/12 my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 h-full rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="grow-0 flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h4 className="text-3xl font-semibold">Diary詳細</h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalDetailedDiary(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="grow relative flex-auto p-6 min-h-10">
                  {showModalChangeModiContent ? (
                    <>
                      <div className="grid grid-cols-1 mb-4 text-sm content-center h-full gap-5">
                        <div className="col-span-1">
                          <label
                            className="text-sm text-gray-700 dark:text-gray-700"
                            htmlFor="ssContent"
                          >
                            修正前
                          </label>
                          <textarea
                            id="ssContent"
                            className="px-3 py-3 h-36 placeholder-slate-300
                            text-zinc-300 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                            focus:outline-none focus:ring w-full resize-none overflow-y-auto"
                            value={selectedDiary.ssOrigContent}
                            readOnly
                          ></textarea>
                        </div>
                        <div className="col-span-1">
                          <label
                            className="text-sm text-gray-700 dark:text-gray-700"
                            htmlFor="ssContent"
                          >
                            修正後
                          </label>
                          <textarea
                            id="ssContent"
                            className="px-3 py-3 h-36 placeholder-slate-300
                            text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                            focus:outline-none focus:ring w-full resize-none"
                            onChange={handleSsModiContent}
                            value={ssModiContent}
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-8 gap-5">
                        <div className="col-span-8 text-center text-lg py-6">
                          {format(
                            selectedDiary.ssCreateDate,
                            "yyyy / M / d / EEE - p"
                          )}
                        </div>
                      </div>
                      <div className="mb-4 text-sm pr-4 h-[80%] overflow-y-auto">
                        <ReactDiffViewer
                          oldValue={selectedDiary.ssOrigContent}
                          newValue={selectedDiary.ssModiContent}
                          splitView={false}
                          // compareMethod={DiffMethod.CHARS}
                          compareMethod={DiffMethod.WORDS}
                          // styles={diffViewerStyle}
                          showDiffOnly={false}
                          hideLineNumbers={true}
                        />
                      </div>
                    </>
                  )}
                </div>
                {/*footer*/}
                <div className="grow-0 flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  {showModalChangeModiContent ? (
                    <>
                      <button
                        className="w-1/2 text-red-500 border border-red-500 rounded background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalChangeModiContent(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-1/2 bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        onClick={handleSubmitChangeModiContent}
                      >
                        Change
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-1/2 text-red-500 border border-red-500 rounded background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalDetailedDiary(false)}
                      >
                        Close
                      </button>
                      <button
                        className="w-1/2 bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        onClick={() => setShowModalChangeModiContent(true)}
                      >
                        Change
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModalChangeOrigContent ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-11/12 my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 h-full rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="grow-0 flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h4 className="text-3xl font-semibold">Diary修正</h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalChangeOrigContent(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="grow relative p-6 flex-auto min-h-20">
                  <div className="grid grid-cols-1 mb-4 text-sm content-center h-full gap-5">
                    {/* <div className="col-span-1">
                      <label className="text-sm text-gray-700 dark:text-gray-700" htmlFor="ssContent">修正前</label>
                      <textarea id="ssContent" className="px-3 py-3 h-36 placeholder-slate-300
                        text-zinc-300 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                        focus:outline-none focus:ring w-full resize-none overflow-y-auto"
                        value={selectedDiary.ssOrigContent} readOnly
                      ></textarea>
                    </div> */}
                    <div className="col-span-1">
                      <label
                        className="text-sm text-gray-700 dark:text-gray-700"
                        htmlFor="ssContent"
                      >
                        Diary
                      </label>
                      <textarea
                        id="ssContent"
                        className="px-3 py-3 h-36 placeholder-slate-300
                        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                        focus:outline-none focus:ring w-full resize-none"
                        onChange={handleSsOrigContent}
                        value={ssOrigContent}
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="grow-0 flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="w-1/2 text-red-500 border border-red-500 rounded background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalChangeOrigContent(false)}
                  >
                    Close
                  </button>
                  <button
                    className="w-1/2 bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmitChangeOrigContent}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
