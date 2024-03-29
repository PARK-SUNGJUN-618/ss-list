import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
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
  const rotateDegree = useMotionValue(0);
  const [rotateDegreeState, setRotateDegreeState] = useState(rotateDegree.get());
  const [selectedColor, setSelectedColor] = useState("fill-gray-400");
  
  const onPan = (event, info) => {
    if(info.velocity.x === 0) return;
    rotateDegree.set(rotateDegree.get() - info.delta.x/5);
    setRotateDegreeState(rotateDegree.get());
    console.log("ro:",info.delta.x/6);
  }

  const onPanEnd = (event, info) => {
    var flag = false;
    var acc = 0.1;
    var delayedEnd = 0;
    var velocityX = info.delta.x/5;
    console.log("velocityX:",velocityX);
    while(!flag) {

      rotateDegree.set(rotateDegree.get() - (velocityX - delayedEnd));
      // if()
      setRotateDegreeState(rotateDegree.get());
      delayedEnd = delayedEnd + (velocityX - delayedEnd) * acc;

      if(Math.abs(velocityX - delayedEnd) < 0.001) {
        flag = true;
      }

      console.log("rotateDegreeState",rotateDegreeState)

    }

  }

  
  const handleChangeColor = (color) => {
    setSelectedColor(color);
  }

  return (
    <>
      <motion.div
        className="w-screen h-screen overflow-hidden flex gap-2 relative touch-none"
        onPan={onPan}
        onPanEnd={onPanEnd}
      >
        <div className="flex justify-center w-full">
          <UserAvatar className={`${selectedColor} h-[50%]`}/>
        </div>
        {colorArray.map((color, index) => {
          return (
            <motion.div
              className="absolute inset-x-1/2 h-full inset-y-[60%]"
              animate={{ rotate: ((index*5)-rotateDegreeState) }}
              key={index}
              onClick={() => handleChangeColor(color)}
            >
              <ColorPencil className={`${color}`}></ColorPencil>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
