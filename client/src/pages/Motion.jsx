import { useState, useEffect } from 'react';
import { motion } from "framer-motion"

let speed = {x:2, y:2};
const ballSize = 'w-[80px] h-[80px] ';
const ballInitial = { 
  x : Math.random() * (window.innerWidth - 80),
  y : Math.random() * (window.innerHeight - 80)
};
export default function Motion() {
  const [ball, setBall] = useState(ballInitial);

  const onUpdate = () => {
    if(ball.x <= 0 || ball.x >= window.innerWidth - 80) {
      speed = {x:speed.x*-1, y:speed.y};
    } 
    if(ball.y <= 0 || ball.y >= window.innerHeight - 80) {
      speed = {x:speed.x, y:speed.y*-1};
    }
    
    setBall({x:ball.x+speed.x, y:ball.y+speed.y});
  }
  
  useEffect(() => {
    onUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])
  

  return (
    <>
      <div className="w-screen h-screen bg-zinc-200 bg-dot_pattern bg-[length:30px_30px] overflow-hidden">
        <motion.div className={ballSize + "border border-zinc-700 bg-zinc-300 rounded-full"}
          initial={{ x: ball.x, y:ball.y }}
          animate={{ x: ball.x, y:ball.y }}
          onUpdate={onUpdate}
        />
      </div>
    </>
  );
}
