import "./battery.css";
import { CircularProgressbar } from "react-circular-progressbar";

import { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";

export default function SquareInfo() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/battery");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const token = setInterval(getData, 3000);
    getData(); // Initial request
    return () => {
      // Don't forget to cleanup the interval when this effect is cleaned up.
      clearInterval(token);
    };
  }, []);

  return (
    <>
      {data.map((actualData, i) => {
        const { battery_id, battery_percent, battery_plugged_in} =
          actualData;
        return (
          <div key={battery_id} className="battery">
            <div className="batteryItem">
              <span className="batteryTitle">Battery</span>
              <div className="batteryContainer">
             
              
              <span className="batterySubHeading">{battery_plugged_in}</span></div>
              <CircularProgressbar value={battery_percent} text={`${battery_percent}%`} />
            
            </div>

            
             
    </div>
        );
      })}
    </>
  );
}
