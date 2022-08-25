import { useRef, useEffect } from 'react';
import { motion, useTime , useMotionValue ,useMotionTemplate } from "framer-motion"

export default function Motion() {
  const x = useTime();

  // transform.get() === transform(100px)
  const transform = useMotionTemplate`x(${x})`
  
  return (
    <>
      <div className="w-screen h-screen bg-zinc-200 bg-dot_pattern bg-[length:30px_30px] overflow-x-hidden">
        <motion.div className="w-20 h-20 border border-red-700 bg-red-300 rounded-full"
          // initial={{ x: 50 , y:100}}
          // animate={{ x: "calc(100vw - 100%)", y:0 }}
          // transformTemplate={template}
          // transition={{repeat:Infinity}}
          animate={{ transform }}
        />

      </div>
    </>
  );
}
