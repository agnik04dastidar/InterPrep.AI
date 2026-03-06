import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
function Timer({ timeLeft, totalTime }) {
    const { darkMode } = useSelector((state) => state.user)
    const percentage = (timeLeft/totalTime)*100
  return (
    <div className='w-20 h-20'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "28px",
          pathColor: "#10b981",
          textColor: "#ef4444",
          trailColor: darkMode ? "#4b5563" : "#e5e7eb",
        })}
        />
      
    </div>
  )
}

export default Timer

