import "./process.css";

import { useState, useEffect } from "react";
import React from "react";

import { DataGrid } from "@material-ui/data-grid";

const columns = [
  {
    field: "process_name",
    headerName: "Name",
    width: 300,
    headerAlign: "center",
    headerClassName: "header",
    cellClassName: "cell",
  },
  {
    field: "process_priority",
    headerName: "Priority",
    width: 200,
    headerClassName: "header",
    cellClassName: "cell",
  },
  {
    field: "process_threadcount",
    headerName: "Thread Count",
    width: 250,
    headerClassName: "header",
    cellClassName: "cell",
  },
  {
    field: "process_handlecount",
    sortable: true,
    headerName: "Handle Count",
    width: 250,
    headerClassName: "header",
    cellClassName: "cell",
  },
  {
    field: "process_size",
    headerName: "Working Set Size (kB)",
    width: 300,
    headerClassName: "header",
    cellClassName: "cell",
  },
];

export default function ProcessList() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/process");
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
    <div className="processList">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.process_id}
      />
    </div>
  );
}
