import { useState, useEffect } from 'react';
import { addDays } from 'date-fns'
import NewLine from "../components/NewLine";
import Datepicker from "../components/Datepicker";
import logo from "../img/trnLogo.png";
import SsListContent from '../components/SsListContent';

export default function SsList() {
  
  const initialData = [
    {
      ssKey: 1,
      ssTitle: 'オッケー',
      ssContent: 'バナナ、肉',
      ssCreateDate: new Date("2022-08-01 10:10:10"),
      ssUpdateDate: new Date("2022-08-01 10:10:10"),
      ssIsChecked: false,
      ssIsDeleted: false,
    },
    {
      ssKey: 2,
      ssTitle: '土曜日に映画',
      ssContent: 'アイアムサム',
      ssCreateDate: new Date("2022-08-02 11:11:11"),
      ssUpdateDate: new Date("2022-08-02 11:11:11"),
      ssIsChecked: true,
      ssIsDeleted: false,
    },
    {
      ssKey: 3,
      ssTitle: '勉強',
      ssContent: '資格証',
      ssCreateDate: new Date("2022-08-03 12:12:12"),
      ssUpdateDate: new Date("2022-08-03 12:12:12"),
      ssIsChecked: false,
      ssIsDeleted: false,
    },
    {
      ssKey: 4,
      ssTitle: '韓ドラ見る',
      ssContent: '愛の不時着',
      ssCreateDate: new Date("2022-08-03 13:13:13"),
      ssUpdateDate: new Date("2022-08-03 13:13:13"),
      ssIsChecked: true,
      ssIsDeleted: false,
    },
  ];
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().setHours(0,0,0,0)));
  const [selectedTask, setSelectedTask] = useState({});
  const [showModalAddTask, setShowModalAddTask] = useState(false);
  const [showModalDetailedTask, setShowModalDetailedTask] = useState(false);
  const [ssTasks, setSsTasks] = useState(initialData);
  const [ssTitle, setSsTitle] = useState('');
  const [ssContent, setSsContent] = useState('');
  const [dbtest, setDbtest] = useState([]);

  const createTask = async e => {
    e.preventDefault();
    try {
      const body = { name: "testName!" };
      const response = await fetch("http://localhost:5000/api/sslist", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      console.log(response);
      getTasks();
    } catch (err) {
      console.error(err.message);
    }
  }

  const getTasks = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/sslist")
      const jsonData = await response.json()

      setDbtest(jsonData);
      
    } catch (err) {
      console.error(err.message);
    }
  }

  const deleteTask = async (id) => {
    try {
      const deleteTask = await fetch(`http://localhost:5000/api/sslist/${id}`, {
        method: "DELETE"
      });

      console.log(deleteTask)
      // getTasks();
      setDbtest(dbtest.filter(task => task.id !== id));

    } catch (err) {
      console.error(err.message);
    }
  }

  const updateTask = async(e) => {
    e.preventDefault();
    try {
      const body = { name : "updateName"};
      const response = await fetch(`http://localhost:5000/api/sslist/22`,{
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      getTasks();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    getTasks();
  }, []);
  
  console.log(dbtest);
  // function getMerchant() {
    //   fetch('http://localhost:5000')
    //     .then(response => {
      //       return response.text();
      //     })
  //     .then(data => {
  //       setDbtest(data);
  //     });
  // }
  // function createMerchant() {
  //   let name = prompt('Enter name');
  //   fetch('http://localhost:5000/sslistInsert', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({name}),
  //   }).then(response => {
  //     return response.text();
  //   }).then(data => {
  //     alert(data);
  //     getMerchant();
  //   });
  // }

  // function deleteMerchant() {
  //   let id = prompt('Enter merchant id');
  //   fetch(`http://localhost:5000/sslistDelete/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       alert(data);
  //       getMerchant();
  //     });
  // }

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

  const handleSubmitAddTask = (event) => {
    setShowModalAddTask(false);
    event.preventDefault()
    console.log("handleSubmitAddTask:",ssTitle);
    if(ssTitle === '') return;
    // console.log({ ssTitle, ssContent, ssCreateDate: new Date(), ssIsChecked: false});
    // console.log(...ssTasks);
    setSsTasks([...ssTasks, { 
      ssKey: ssTasks.length+1,
      ssTitle,
      ssContent,
      ssCreateDate: new Date(),
      ssUpdateDate: new Date(),
      ssIsChecked: false,
      ssIsDeleted: false,
    }])
    setSsTitle('');
    setSsContent('');
  }

  const handleRemoveTask = (ssKey) => {
    console.log("handleRemoveTask:",ssKey)
    const newSsTasks = ssTasks.map((ssTasks) => {
      if (ssTasks.ssKey === ssKey) {
        ssTasks.ssIsDeleted = !ssTasks.ssIsDeleted;
        ssTasks.ssUpdateDate = new Date();
        console.log(ssTasks.ssIsDeleted);
      }
      return ssTasks;
    });
    // const newSsTasks = [...ssTasks].filter((ssTasks) => ssTasks.ssKey !== ssKey);
    setSsTasks(newSsTasks);
  }

  const handleDetailedTask = (task) => {
    console.log("showModalDetailedTask:",task);
    setShowModalDetailedTask(true);
    setSelectedTask(task);
  }

  const handleCheckedTask = (ssKey) => {
    console.log("handleCheckedTask:",ssKey)
    const newSsTasks = ssTasks.map((ssTasks) => {
      if (ssTasks.ssKey === ssKey) {
        ssTasks.ssIsChecked = !ssTasks.ssIsChecked;
        ssTasks.ssUpdateDate = new Date();
        console.log(ssTasks.ssUpdateDate);
      }
      return ssTasks;
    });
    setSsTasks(newSsTasks);
  };

  useEffect(() => {
    console.log(selectedDate);
    console.log(ssTasks);
  }, [selectedDate, ssTasks]);
  

  return (
    <>
      <div>
        {dbtest ? dbtest.map(dbtest => <div key={dbtest.id}>
          {dbtest.id}:{dbtest.name}s
          <button onClick={(e) => updateTask(e)}> mod </button>
          <button onClick={() => deleteTask(dbtest.id)}> del </button>
        </div>) : 'There is no sslist data available'}
        <button onClick={createTask}>Add Task</button>
        {/* <button onClick={deleteMerchant}>Delete merchant</button> */}
      </div>
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
              onClick={() => setShowModalAddTask(true)}>
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
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModalAddTask(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-200" htmlFor="ssTitle">タイトル</label>
                            <input type="text" placeholder="Title" id="ssTitle"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={ssTitle} onChange={handleSsTitle} />
                          </div>
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-200" htmlFor="ssContent">内容</label>
                            <input type="text" placeholder="Content" id="ssContent"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={ssContent} onChange={handleSsContent} />
                          </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModalAddTask(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          onClick={handleSubmitAddTask}
                        >
                          Save Changes
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
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModalDetailedTask(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-200" htmlFor="ssTitle">タイトル</label>
                            <input type="text" placeholder="Title" id="ssTitle"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={selectedTask.ssTitle} readOnly/>
                          </div>
                          <div className="mb-4">
                            <label className="text-sm text-gray-700 dark:text-gray-200" htmlFor="ssContent">内容</label>
                            <input type="text" placeholder="Content" id="ssContent"
                              className="px-3 py-3 placeholder-slate-300
                              text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none
                              focus:outline-none focus:ring w-full"
                              value={selectedTask.ssContent} readOnly/>
                          </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModalDetailedTask(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          onClick={handleSubmitAddTask}
                        >
                          Save Changes
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
