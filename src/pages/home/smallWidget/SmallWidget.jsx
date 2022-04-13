import "./smallWidget.css";
import { useState,useEffect } from "react";

export default function SmallWidget() {

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/system");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const token = setInterval(getData, 3000); // Every 3 second
    getData(); // Initial request
    return () => {
      // Cleanup the interval when this effect is cleaned up.
      clearInterval(token);
    };
  }, []);

  return (
    <>
      <div className="smallWidget">

        {data.map((actualData) => {
          const {system_id,system_name,system_uptime,system_location} = actualData;
          return (
            <ul key={system_id} className="smallWidgetList">
              <li className="smallWidgetListItem">
                <div className="smallWidgetUser">
                  <span className="smallWidgetUsername">Hostname:</span>
                
                <span className="smallWidgetUserTitle">{system_name}</span>
              </div></li>
              <li className="smallWidgetListItem">
                <div className="smallWidgetUser">
                  <span className="smallWidgetUsername">Uptime:</span>
               
                <span className="smallWidgetUserTitle">{system_uptime}</span>
               </div></li>
              <li className="smallWidgetListItem">
                <div className="smallWidgetUser">
                  <span className="smallWidgetUsername">Location:</span>
               
                <span className="smallWidgetUserTitle">{system_location}</span>
               </div></li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
