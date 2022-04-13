import "./squareInfo.css";
import { CircularProgressbar } from "react-circular-progressbar";

import { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "react-bootstrap/ProgressBar";
export default function SquareInfo() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/cpu");
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
        const { cpu_id, cpu_usage, cpu_ram, disk_total, disk_used, disk_free } =
          actualData;
        return (
          <div key={cpu_id} className="squareInfo">
            <div className="squareInfoItem">
              <span className="squareInfoTitle">Ram Usage</span>
              <div className="squareInfoContainer">
                <span className="squareInfoData">{cpu_ram}</span>
              </div>
              <span className="squareInfoSubHeading">In use</span>
              <CircularProgressbar value={cpu_ram} text={`${cpu_ram}%`} />
            </div>
            
            <div className="squareInfoItem">
              <span className="squareInfoTitle">Disk Volume</span>
              <div className="squareInfoContainer">
                <span className="squareInfoData">
                  {disk_used} GB / {disk_total} GB
                </span>
              </div>
              <span className="squareInfoSubHeading">In use</span>
              <div className="ProgressBar">
                <ProgressBar>
                  <ProgressBar
                    striped
                    variant="success"
                    now={disk_free}
                    key={1}
                  />
                  <ProgressBar
                    striped
                    variant="danger"
                    now={disk_used}
                    key={3}
                  />
                </ProgressBar>
              </div>
            </div>
            <div className="squareInfoItem">
              <span className="squareInfoTitle">CPU utlization</span>
              <div className="squareInfoContainer">
                <span className="squareInfoData">{cpu_usage}%</span>
              </div>
              <span className="squareInfoSubHeading">In use</span>

              <CircularProgressbar value={cpu_usage} text={`${cpu_usage}%`} />
            </div>
            
          </div>
          
        );
      })}
    </>
  );
}
