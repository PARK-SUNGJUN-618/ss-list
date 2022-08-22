import { useState, useEffect } from 'react';
import { addDays } from 'date-fns'
import NewLine from "../components/NewLine";
import Datepicker from "../components/Datepicker";
import logo from "../img/trnLogo.png";
import SsListContent from '../components/SsListContent';
import {
  format
} from "date-fns";

export default function SsList() {
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().setHours(0,0,0,0)));
  const [selectedTask, setSelectedTask] = useState({});
  const [showModalAddTask, setShowModalAddTask] = useState(false);
  const [showModalDetailedTask, setShowModalDetailedTask] = useState(false);
  const [ssTasks, setSsTasks] = useState([]);
  const [ssTitle, setSsTitle] = useState('');
  const [ssContent, setSsContent] = useState('');
  
  const dayIncrease = () => {
    setSelectedDate(addDays(selectedDate, 1));
  }

  const dayDecrease = () => {
    setSelectedDate(addDays(selectedDate, -1));
  }

  const handleSsTitle = (event) => {
    setSsTitle(event.target.value);
    // console.log(event.target.value);
  }

  const handleSsContent = (event) => {
    setSsContent(event.target.value);
    // console.log(event.target.value);
  }

  async function getTasks() {
    const res = await fetch("/api/sslist");

    const taskArrayJson = await res.json();

    const taskArray = taskArrayJson.map((task) => {
      return {
        ...task,
        ssCreateDate: new Date(task.ssCreateDate),
        ssUpdateDate: new Date(task.ssUpdateDate)
      }
    })

    setSsTasks(taskArray);
  }

  const handleSubmitAddTask = async e => {
    e.preventDefault();
    if(ssTitle === '') return;
    try {
      setShowModalAddTask(false);
      const body = { 
        ssTitle,
        ssContent,
        ssCreateDate: new Date(),
        ssUpdateDate: new Date(),
        ssIsChecked: false,
        ssIsDeleted: false,
      };
      const response = await fetch("/api/sslist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      console.log(response);
      setSsTitle('');
      setSsContent('');
      getTasks();
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleSubmitChangeTask = async e => {
    e.preventDefault();
    if(ssTitle === '') return;
    const taskArray = ssTasks.map((task) => {
      if(selectedTask.ssKey === task.ssKey) {
        return {
          ...task,
          ssTitle: ssTitle,
          ssContent: ssContent,
          ssUpdateDate: new Date()
        }
      } else {
        return task;
      }
    })
    setSsTasks(taskArray);
    try {
      setShowModalDetailedTask(false);
      const body = { 
        ssTitle,
        ssContent,
        ssUpdateDate: new Date(),
      };
      const response = await fetch(`/api/changeSslist/${selectedTask.ssKey}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      console.log(response);

      getTasks();
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleRemoveTask = async (ssKey) => {
    try {
      const deleteTask = await fetch(`/api/sslist/${ssKey}`, {
        method: "DELETE"
      });

      console.log(deleteTask)
      // getTasks();
      setSsTasks(ssTasks.filter(task => task.ssKey !== ssKey));

    } catch (err) {
      console.error(err.message);
    }
  }

  const handleDetailedTask = (task) => {
    console.log("showModalDetailedTask:",task);
    setShowModalDetailedTask(true);
    setSelectedTask(task);
    setSsTitle(task.ssTitle);
    setSsContent(task.ssContent);
  }

  const handleCheckedTask = async(data) => {
    const taskArray = ssTasks.map((task) => {
      if(data.ssKey === task.ssKey) {
        return {
          ...task,
          ssIsChecked: !data.ssIsChecked,
          ssUpdateDate: new Date()
        }
      } else {
        return task;
      }
    })
    setSsTasks(taskArray);
    try {
      const body = {
        ssIsChecked: !data.ssIsChecked,
        ssUpdateDate: new Date()
      };
      const response = await fetch(`/api/sslist/${data.ssKey}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      // getTasks();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);
  
  useEffect(() => {
    console.log(ssTasks)
  }, [ssTasks]);

  return (
    <>
      <div className="w-screen h-screen bg-zinc-200 bg-dot_pattern bg-[length:30px_30px] ">
        <NewLine />
        <div className="grid grid-cols-3 justify-between items-center">
          <div className="justify-self-start text-3xl font-bold">
            <button className="active:bg-zinc-300 p-2 rounded-full ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </button>
          </div>
          <div className="justify-self-center text-3xl font-black">
            <button onClick={() => setSelectedDate(new Date(new Date().setHours(0,0,0,0)))}
              className="flex">
              <img src={logo} alt="" className="w-10 h-10"></img>List
              
            </button>
          </div>
          <div className="justify-self-end text-3xl font-bold">
            <button className="active:bg-zinc-300 p-2 rounded-full mr-3"
              onClick={() => {setShowModalAddTask(true);setSsTitle('');setSsContent('');}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
            {showModalAddTask ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-5/6 my-6 mx-auto max-w-sm">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          List追加
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModalAddTask(false)}
                        >
                          <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-700" htmlFor="ssTitle">タイトル</label>
                            <input type="text" placeholder="Title" id="ssTitle"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={ssTitle} onChange={handleSsTitle} />
                          </div>
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-700" htmlFor="ssContent">内容</label>
                            <textarea id="ssContent" className="px-3 py-3 h-36 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                              focus:outline-none focus:ring w-full resize-none" onChange={handleSsContent}
                              value={ssContent} placeholder="Content"
                            ></textarea>
                            {/* <input type="text" placeholder="Content" id="ssContent"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={ssContent} onChange={handleSsContent} /> */}
                          </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="w-1/2 text-red-500 border border-red-500 rounded background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear
                            transition-all duration-150 "
                          type="button"
                          onClick={() => setShowModalAddTask(false)}
                        >
                          Close
                        </button>
                        <button
                          className="w-1/2 bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          onClick={handleSubmitAddTask}
                        >
                          Add SSList
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
        <NewLine repeat="4" />
        <div className="grid grid-cols-4 justify-between items-center justify-items-center">
          <div className="col-span-1">
            <button className="active:bg-zinc-300 p-2 rounded-full ml-5" onClick={dayDecrease}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="col-span-2 w-full">
            <Datepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <div className="col-span-1">
            <button className="active:bg-zinc-300 p-2 rounded-full mr-5" onClick={dayIncrease}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <NewLine repeat="4" />
        <div className="bg-white p-2 mx-10 my-5 rounded-md min-h-[60%] max-h-[60%] grid grid-rows-1">
          <div className="border border-zinc-500 p-6 overflow-auto">
            <SsListContent ssTasks={ssTasks} handleRemoveTask={handleRemoveTask} 
              handleCheckedTask={handleCheckedTask} selectedDate={selectedDate}
              handleDetailedTask={handleDetailedTask}/>
          </div>
          {showModalDetailedTask ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-5/6 my-6 mx-auto max-w-sm">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          List詳細
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModalDetailedTask(false)}
                        >
                          <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-700" htmlFor="ssCreateDate">登録日時</label>
                            <input type="text" placeholder="CreateDate" id="ssCreateDate"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={format(selectedTask.ssCreateDate, "yyyy年 MM月 dd日")} readOnly/>
                          </div>
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-700" htmlFor="ssTitle">タイトル</label>
                            <input type="text" placeholder="Title" id="ssTitle"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={ssTitle}
                              onChange={handleSsTitle}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-700" htmlFor="ssContent">内容</label>
                            <textarea id="ssContent" className="px-3 py-3 h-36 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                              focus:outline-none focus:ring w-full resize-none"
                              onChange={handleSsContent} value={ssContent}
                            ></textarea>
                            {/* <input type="text" placeholder="Content" id="ssContent"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={selectedTask.ssContent} readOnly/> */}
                          </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="w-1/2 text-red-500 border border-red-500 rounded background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModalDetailedTask(false)}
                        >
                          Close
                        </button>
                        <button
                          className="w-1/2 bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          onClick={handleSubmitChangeTask}
                        >
                          Change List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
        </div>
      </div>
    </>
  );
}
