import "./threadCount.css";
import { useState, useEffect } from "react";

export default function ThreadCount() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/processThreadCount");
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
      <div className="threadCount">
        <h3 className="threadCountTitle">Highest Thread Count</h3>
        <table className="threadCountTable">
          <tbody>
            <tr className="threadCountTr">
              <th className="threadCountThStart">Process</th>
              <th className="threadCountTh">Thread Count</th>
            </tr>
            {data.map((actualData) => {
              const { process_id, process_name, process_threadcount } =
                actualData;
              return (
                <tr key={process_id} className="threadCountTr">
                  <td className="threadCountUser">
                    <span className="threadCountName">{process_name}</span>
                  </td>

                  <td className="threadCountAmount"> {process_threadcount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
