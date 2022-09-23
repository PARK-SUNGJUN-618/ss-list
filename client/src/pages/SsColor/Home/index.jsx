import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ReactComponent as ColorPencil } from "../../../img/colorPencil.svg";

let speed = { x: 2, y: 2 };
const ballSize = "w-[80px] h-[80px]";
const ballInitial = {
  x: Math.random() * (window.innerWidth - 80),
  y: Math.random() * (window.innerHeight - 80),
};
export default function Motion() {
  const [ball, setBall] = useState(ballInitial);

  const onUpdate = () => {
    if (ball.x <= 0 || ball.x >= window.innerWidth / 2 - 80) {
      speed = { x: speed.x * -1, y: speed.y };
    }
    if (ball.y <= 0 || ball.y >= window.innerHeight / 2 - 80) {
      speed = { x: speed.x, y: speed.y * -1 };
    }

    setBall({ x: ball.x + speed.x, y: ball.y + speed.y });
  };

  useEffect(() => {
    onUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPan(event, info) {
    console.log(info.point.x, info.point.y);
  }

  return (
    <>
      <div className="w-screen h-screen overflow-hidden flex gap-2 relative">
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-65}}><ColorPencil className="fill-orange-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-60}}><ColorPencil className="fill-orange-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-55}}><ColorPencil className="fill-orange-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-50}}><ColorPencil className="fill-orange-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-90}}><ColorPencil className="fill-red-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-85}}><ColorPencil className="fill-red-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-80}}><ColorPencil className="fill-red-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-75}}><ColorPencil className="fill-red-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-70}}><ColorPencil className="fill-red-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-45}}><ColorPencil className="fill-orange-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-40}}><ColorPencil className="fill-yellow-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-35}}><ColorPencil className="fill-yellow-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-30}}><ColorPencil className="fill-yellow-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-25}}><ColorPencil className="fill-yellow-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-20}}><ColorPencil className="fill-yellow-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-15}}><ColorPencil className="fill-green-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-10}}><ColorPencil className="fill-green-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-5}}><ColorPencil className="fill-green-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:0}}><ColorPencil className="fill-green-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:5}}><ColorPencil className="fill-green-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:10}}><ColorPencil className="fill-green-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:15}}><ColorPencil className="fill-blue-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:20}}><ColorPencil className="fill-blue-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:25}}><ColorPencil className="fill-blue-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:30}}><ColorPencil className="fill-blue-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:35}}><ColorPencil className="fill-blue-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:40}}><ColorPencil className="fill-purple-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:45}}><ColorPencil className="fill-purple-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:50}}><ColorPencil className="fill-purple-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:55}}><ColorPencil className="fill-purple-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:60}}><ColorPencil className="fill-purple-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:65}}><ColorPencil className="fill-zinc-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:70}}><ColorPencil className="fill-zinc-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:75}}><ColorPencil className="fill-zinc-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:80}}><ColorPencil className="fill-zinc-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:85}}><ColorPencil className="fill-zinc-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:90}}><ColorPencil className="fill-red-50"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:95}}><ColorPencil className="fill-red-100"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:100}}><ColorPencil className="fill-red-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:105}}><ColorPencil className="fill-red-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:110}}><ColorPencil className="fill-red-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:115}}><ColorPencil className="fill-red-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:120}}><ColorPencil className="fill-red-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:125}}><ColorPencil className="fill-yellow-50"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:130}}><ColorPencil className="fill-yellow-100"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:135}}><ColorPencil className="fill-yellow-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:140}}><ColorPencil className="fill-yellow-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:145}}><ColorPencil className="fill-yellow-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:150}}><ColorPencil className="fill-yellow-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:155}}><ColorPencil className="fill-yellow-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:160}}><ColorPencil className="fill-green-50"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:165}}><ColorPencil className="fill-green-100"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:170}}><ColorPencil className="fill-green-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:175}}><ColorPencil className="fill-green-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:180}}><ColorPencil className="fill-green-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:185}}><ColorPencil className="fill-green-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:190}}><ColorPencil className="fill-green-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:195}}><ColorPencil className="fill-blue-50"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:200}}><ColorPencil className="fill-blue-100"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:205}}><ColorPencil className="fill-blue-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:210}}><ColorPencil className="fill-blue-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:215}}><ColorPencil className="fill-blue-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:220}}><ColorPencil className="fill-blue-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:225}}><ColorPencil className="fill-blue-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:230}}><ColorPencil className="fill-purple-50"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:235}}><ColorPencil className="fill-purple-100"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:240}}><ColorPencil className="fill-purple-200"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:245}}><ColorPencil className="fill-purple-300"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:250}}><ColorPencil className="fill-purple-400"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:255}}><ColorPencil className="fill-purple-500"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:260}}><ColorPencil className="fill-purple-600"></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:265}}><ColorPencil className="fill-zinc-50"></ColorPencil></motion.div>
      </div>
    </>
  );
}
