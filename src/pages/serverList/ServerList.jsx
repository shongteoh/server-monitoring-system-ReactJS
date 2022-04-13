import "./serverList.css";
import { DataGrid } from "@material-ui/data-grid";

import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const columns = [
  {
    field: "server_id",
    headerName: "ID",
    width: 200,
    headerClassName: "header",
    cellClassName: "cell",
  },
  {
    field: "server_name",
    headerName: "Name",
    width: 350,
    headerClassName: "header",
    cellClassName: "cell",
  },

  {
    field: "server_ip",
    headerName: "IP address",
    width: 350,
    headerClassName: "header",
    cellClassName: "cell",
  },
  {
    field: "server_department",
    headerName: "Department",
    width: 400,
    headerClassName: "header",
    cellClassName: "cell",
  },
];
  
export default function ServerList() {
const [data, setData] = useState([]);
const getData = async () => {
  try {
    const response = await fetch("http://localhost:5000/server");
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error(error.message);
  }
};
useEffect(() => {
  const token = setInterval(getData, 3000); // Every 3 seconds
  getData(); // Initial request
  return () => {
    // Cleanup the interval when this effect is cleaned up.
    clearInterval(token);
  };
}, []);



  return (
    <div className="serverList">
      <Link to="/newserver">
        <button className="serverAddButton">Create</button>
      </Link>
      <DataGrid
        rows={data}
   
        columns={columns}

        getRowId={(row) => row.server_id}
      />
    </div>
  );
}

