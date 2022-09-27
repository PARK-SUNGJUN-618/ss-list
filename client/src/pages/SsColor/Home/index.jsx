import { useState } from "react";
import { motion } from "framer-motion";
import { ReactComponent as ColorPencil } from "../../../img/colorPencil.svg";
import { ReactComponent as UserAvatar } from "../../../img/userAvatar.svg";

let colorArray = [
  "fill-red-200",
  "fill-red-300",
  "fill-red-400",
  "fill-red-500",
  "fill-red-600",
  "fill-orange-200",
  "fill-orange-300",
  "fill-orange-400",
  "fill-orange-500",
  "fill-orange-600",
  "fill-yellow-200",
  "fill-yellow-300",
  "fill-yellow-400",
  "fill-yellow-500",
  "fill-yellow-600",
  "fill-green-200",
  "fill-green-300",
  "fill-green-400",
  "fill-green-500",
  "fill-green-600",
  "fill-green-600",
  "fill-blue-200",
  "fill-blue-300",
  "fill-blue-400",
  "fill-blue-500",
  "fill-blue-600",
  "fill-purple-200",
  "fill-purple-300",
  "fill-purple-400",
  "fill-purple-500",
  "fill-purple-600",
  "fill-zinc-200",
  "fill-zinc-300",
  "fill-zinc-400",
  "fill-zinc-500",
  "fill-zinc-600",
  "fill-red-50",
  "fill-red-100",
  "fill-red-200",
  "fill-red-300",
  "fill-red-400",
  "fill-red-500",
  "fill-red-600",
  "fill-yellow-50",
  "fill-yellow-100",
  "fill-yellow-200",
  "fill-yellow-300",
  "fill-yellow-400",
  "fill-yellow-500",
  "fill-yellow-600",
  "fill-green-50",
  "fill-green-100",
  "fill-green-200",
  "fill-green-300",
  "fill-green-400",
  "fill-green-500",
  "fill-green-600",
  "fill-blue-50",
  "fill-blue-100",
  "fill-blue-200",
  "fill-blue-300",
  "fill-blue-400",
  "fill-blue-500",
  "fill-blue-600",
  "fill-purple-50",
  "fill-purple-100",
  "fill-purple-200",
  "fill-purple-300",
  "fill-purple-400",
  "fill-purple-500",
  "fill-purple-600",
  "fill-zinc-50",
];

export default function Motion() {
  const [rotateDegree, setRotateDegree] = useState(90);
  const [selectedColor,setSelectedColor] = useState("fill-gray-400");

  function onPan(event, info) {
    setRotateDegree(rotateDegree-info.offset.x/100);
  }
  
  const handleChangeColor = (color) => {
    setSelectedColor(color);
  }

  return (
    <>
      <motion.div
        className="w-screen h-screen overflow-hidden flex gap-2 relative touch-none"
        onPan={onPan}
        // drag
        // onDrag={onPan}
      >
        <div className="flex justify-center w-full">
          <UserAvatar className={`${selectedColor} h-[50%]`}/>
        </div>
        {colorArray.map((color, index) => {
          return (
            <motion.div
              className="absolute inset-x-1/2 h-full inset-y-[60%]"
              animate={{ rotate: ((index*5)-rotateDegree) }}
              key={index}
              onClick={() => handleChangeColor(color)}
            >
              <ColorPencil className={`${color}`}></ColorPencil>
            </motion.div>
          );
        })}
        {/* <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-90}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-85}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-80}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-75}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-70}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-65}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-60}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-55}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-50}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-45}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-40}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-35}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-30}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-25}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-20}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-15}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-10}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:-5}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:0}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:5}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:10}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:15}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:20}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:25}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:30}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:35}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:40}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:45}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:50}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:55}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:60}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:65}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:70}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:75}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:80}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:85}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:90}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:95}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:100}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:105}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:110}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:115}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:120}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:125}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:130}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:135}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:140}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:145}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:150}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:155}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:160}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:165}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:170}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:175}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:180}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:185}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:190}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:195}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:200}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:205}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:210}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:215}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:220}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:225}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:230}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:235}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:240}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:245}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:250}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:255}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:260}}><ColorPencil className=""></ColorPencil></motion.div>
        <motion.div className="absolute inset-x-1/2 h-full inset-y-[60%]" animate={{rotate:265}}><ColorPencil className=""></ColorPencil></motion.div> */}
      </motion.div>
    </>
  );
}
