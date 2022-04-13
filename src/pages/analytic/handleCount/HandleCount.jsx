

import "./handleCount.css";
import { useState, useEffect } from "react";

export default function Size() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/processHandleCount");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const token = setInterval(getData, 3000); // Every 5 seconds?
    getData(); // Initial request
    return () => {
      // Don't forget to cleanup the interval when this effect is cleaned up.
      clearInterval(token);
    };
  }, []);

  return (
    <>
      <div className="handleCount">
        <h3 className="handleCountTitle">Highest Handle Count</h3>
        <table className="handleCountTable">
          <tbody>
            <tr className="handleCountTr">
              <th className="handleCountThStart">Process</th>
              <th className="handleCountTh">Handle Count</th>
            </tr>
            {data.map((actualData) => {
              const { process_id, process_name, process_handlecount } = actualData;
              return (
                <tr key={process_id} className="handleCountTr">
                  <td className="handleCountUser">
                    <span className="handleCountName">{process_name}</span>
                  </td>

                  <td className="handleCountAmount"> {process_handlecount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
