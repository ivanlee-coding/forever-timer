import { useState, useEffect } from 'react'
// import dateFormat from 'dateformat'
import { motion } from "framer-motion"

function App() {

  const updateInterval = 66 // In ms, the smaller number, the quicker
  const [timer, setTimer] = useState({year: '0', day:'0', hour:'0', min:'0', sec:'0', milliseconds:'0'})
  const startTimer = 1686020400000 // meaningful timestamp

  useEffect(() => {

    const updateIntervalTimer = setInterval(() => {

      const accumulatedTimer = Date.now() - startTimer

      const tempDiff = accumulatedTimer > 0 ? accumulatedTimer : 0

      if(!tempDiff) clearInterval(updateIntervalTimer) // if(!tempDiff) Something wrong, clear timer

      const r = convertDiffToHumanDate(tempDiff)

      setTimer(r);

    }, updateInterval)


    return () => {
      clearInterval(updateIntervalTimer)
    }

  }, []);

  return (

    <div className="container-fluid d-flex bg-dark vh-100">

      <div className="row align-items-center vw-100">

      <div className="col-4 d-flex justify-content-end fs-2 fw-bold text-light">
          {`${timer.year}年`}
        </div>

        <div className="col-auto d-flex justify-content-end fs-2 fw-bold text-light">
          {`${timer.day}天`}
        </div>

        <div className="col-auto d-flex justify-content-end fs-2 fw-bold text-light">
          {`${timer.hour}時`}
        </div>

        <div className="col-auto d-flex justify-content-end fs-2 fw-bold text-light">
          {`${timer.min}分`}
        </div>

        <motion.div className="col-auto d-inline fs-1 fw-bold text-warning p-0"
          initial={{ opacity: 0, scale: 5 }}
          animate={{ opacity: 1, scale: 0.9 }}
          transition={{ duration: 10.0 }}
        >         
          {`${timer.sec}`}
        </motion.div>

        <div className="col-auto d-flex justify-content-end fs-5 fw-bold text-danger">
          {`${timer.milliseconds}`}
        </div>

      </div>

    </div>


  )
}

function convertDiffToHumanDate(count: number) {

  const r = {year: '0', day:'0', hour:'0', min:'0', sec:'0', milliseconds:'0'};

  const yearUnit = 365 * 24 * 60 * 60 * 1000;
  const dayUnit = 24 * 60 * 60 * 1000;
  const hourUnit = 60 * 60 * 1000;
  const minUnit = 60 * 1000;
  const secUnit = 1000;


  const year = Math.floor(count / yearUnit).toString();
  const day = Math.floor(count / dayUnit - 365).toString();
  let hour = Math.floor(count%dayUnit / hourUnit).toString();
  let min = Math.floor(count%dayUnit%hourUnit / minUnit).toString();
  let sec = Math.floor(count%dayUnit%hourUnit%minUnit / secUnit).toString();
  const milliseconds = count.toString().slice(-3);

  if(hour.length == 1) hour = `0${hour}`
  if(min.length == 1) min = `0${min}`
  if(sec.length == 1) sec = `0${sec}`

  r.year = year;
  r.day = day;
  r.hour = hour;
  r.min = min;
  r.sec = sec;
  r.milliseconds = milliseconds;

  return r;
}

export default App