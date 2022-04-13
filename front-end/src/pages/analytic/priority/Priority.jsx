import "./priority.css";
import { useState, useEffect } from "react";

export default function Priority() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/processPriority");
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
      <div className="priority">
        <h3 className="priorityTitle">Highest priority</h3>
        <table className="priorityTable">
          <tbody>
            <tr className="priorityTr">
              <th className="priorityThStart">Process</th>
              <th className="priorityTh">Priority</th>
             
            </tr>
            {data.map((actualData) => {
              const {
                process_id,
                process_name,
                process_priority,
        
              } = actualData;
              return (
                <tr key={process_id} className="priorityTr">
                  <td className="priorityUser">
                    <span className="priorityName">{process_name}</span>
                  </td>

                  <td className="priorityAmount"> {process_priority}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
