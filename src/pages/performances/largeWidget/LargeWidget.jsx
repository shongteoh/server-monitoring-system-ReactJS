import "./largeWidget.css";
import { useState, useEffect } from "react";

export default function LargeWidget() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/largeWidget");
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
      <div className="largeWidget">
        <h3 className="largeWidgetTitle">Key Performance indicator</h3>
        {data.map((actualData) => {
          const { cpu_id, cpu_usage, cpu_ram, disk_usability } = actualData;
          return (
            <table key={cpu_id} className="largeWidgetTable">
              
              <tbody>
                <tr className="largeWidgetTr">
                  <th className="largeWidgetThStart">Metrics</th>

                  <th className="largeWidgetTh">Percentage</th>
                </tr>
                <tr className="largeWidgetTr">
                  <td className="largeWidgetUser">
                    <span className="largeWidgetName">CPU utlization</span>
                  </td>

                  <td className="largeWidgetAmount">{cpu_usage} %</td>
                </tr>
                <tr className="largeWidgetTr">
                  <td className="largeWidgetUser">
                    <span className="largeWidgetName">Memory utlization</span>
                  </td>

                  <td className="largeWidgetAmount">{cpu_ram} %</td>
                </tr>
                <tr className="largeWidgetTr">
                  <td className="largeWidgetUser">
                    <span className="largeWidgetName">
                      Storage availability
                    </span>
                  </td>

                  <td className="largeWidgetAmount">{disk_usability} %</td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
}
