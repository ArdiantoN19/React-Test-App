// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";

// const calculateTimeLeft = (countDown) => {
//   // calculate time left
//   const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

//   return [days, hours, minutes, seconds];
// };

// const useCountdown = (targetDate) => {
//   const countdownDate = new Date(targetDate).getTime();

//   const [countdown, setCountdown] = useState(
//     countdownDate - new Date().getTime()
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown(countdownDate - new Date().getTime());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [countdownDate]);

//   return calculateTimeLeft(countdown);
// };

// export default useCountdown;
const useCountdown = (initialValue) => {
  const [second, setSecond] = useState(initialValue);
  const [time, setTime] = useState([]);

  const secondsToTime = (secs) => {
    const divisorForHours = secs % (1000 * 60 * 60 * 24);
    const hours = Math.floor(divisorForHours / (1000 * 60 * 60));

    const divisorForMinutes = secs % (60 * 60 * 1000);
    const minutes = Math.floor(divisorForMinutes / (1000 * 60));

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);
    return [hours, minutes, seconds];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
        return setTime(secondsToTime(second));
      }
      return false;
    }, 1000);
    return () => clearInterval(interval);
  }, [second]);

  return time;
};
export default useCountdown;
