// import { useState, useEffect} from 'react';
import { addDays, isBefore} from 'date-fns'

export default function SsListContent({ssTasks, handleRemoveTask, handleCheckedTask, selectedDate, handleDetailedTask}) {
  // const [ssTaskData, setSsTaskData] = useState(ssTasks);

  // console.log("HOSI HOSI : ", ssTasks)

  // useEffect(() => {
  //   setSsTaskData(ssTasks);
  //   console.log("RUN:setSsTaskData")
  // }, [ssTasks]);

  const ssTaskDatas = ssTasks
    .filter(ssTask => !ssTask.ssIsDeleted)
    .filter(ssTask => isBefore(ssTask.ssCreateDate, addDays(selectedDate, 1)))
    .filter(ssTask => !(ssTask.ssIsChecked && isBefore(ssTask.ssUpdateDate, selectedDate)))
    .map((data) => {
    return (
      <div key={data.ssKey} className="grid grid-cols-9 text-xl items-center pb-4">
        {/* <div className="col-span-9 grid grid-cols-7"> */}
          <div className="col-span-1">
            <input type="checkbox" checked={data.ssIsChecked} onChange={() => handleCheckedTask(data.ssKey)}
              className="accent-zinc-600 w-5 h-5"/>
          </div>
          <div className={"col-span-7 ml-1 break-all border-b-2 border-zinc-400 " + (data.ssIsChecked ? 'line-through text-zinc-400' : '')}
            onClick={() => handleDetailedTask(data)}>
            {data.ssTitle}：{data.ssContent}
          </div>
        {/* </div> */}
        <div className="col-span-1">
          <button className="text-red-500 active:text-red-600 active:bg-zinc-300 p-1 rounded-full"
            onClick={() => handleRemoveTask(data.ssKey)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  })

  return (
    <>
      <div>
        {ssTaskDatas}
      </div>
    </>
  )
}