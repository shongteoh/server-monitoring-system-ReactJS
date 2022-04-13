import "./disk.css";
import React from "react";

import { useState, useEffect } from "react";

export default function Disk() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/diskUtilization");
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
      <div className="disk">
        <h3 className="diskTitle">Memory details</h3>
        {data.map((actualData) => {
          const {
            disk_id,
            disk_total,
            disk_used,
            disk_read_time,
            disk_write_time,
            memory_virtual,
            memory_swap,
          } = actualData;
          return (
            <table key={disk_id} className="diskTable">
              <tbody>
                <tr className="diskTr">
                  <th className="diskThStart">Metrics</th>

                  <th className="diskTh">Value</th>
                  <th className="diskThStart">Metrics</th>
                  <th className="diskTh">Value</th>
                </tr>
                <tr className="diskTr">
                  <td className="diskUser">
                    <span className="diskName">Total Disk Space</span>
                  </td>

                  <td className="diskAmount">{disk_total} GB </td>
                  <td className="diskUser">
                    <span className="diskName">Virtual Memory</span>
                  </td>

                  <td className="diskAmount">{memory_virtual} % </td>
                </tr>

                <tr className="diskTr">
                  <td className="diskUser">
                    <span className="diskName">Used Disk Space</span>
                  </td>

                  <td className="diskAmount">{disk_used} GB</td>
                  <td className="diskUser">
                    <span className="diskName">Swap Memory</span>
                  </td>

                  <td className="diskAmount">{memory_swap} % </td>
                </tr>
                <tr className="diskTr">
                  <td className="diskUser">
                    <span className="diskName">Disk Read Time</span>
                  </td>

                  <td className="diskAmount">{disk_write_time} MB/s</td>
                  <td className="diskUser">
                    <span className="diskName">Disk Write Time</span>
                  </td>

                  <td className="diskAmount">{disk_read_time} s </td>
                </tr>

              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
}
