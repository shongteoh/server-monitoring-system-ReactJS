import "./notification.css";
import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect } from "react";

 const columns = [
   {
     field: "notification_id",
     headerName: "ID",
     width: 300,
     headerClassName: "header",
     cellClassName: "cell",
   },
   {
     field: "notification_description",
     headerName: "Problem",
     width: 700,
     headerClassName: "header",
     cellClassName: "cell",
   },

   {
     field: "to_char",
     headerName: "Time",
     width: 300,
     headerClassName: "header",
     cellClassName: "cell",
   },
 ];

export default function Notification() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/notification");
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
    <div className="notificationList">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.notification_id}
      />
    </div>
  );
}
