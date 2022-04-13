import "./size.css";
import React from "react";
import {
  CartesianGrid,
  Bar,
  Legend,
  YAxis,
  BarChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

export default function HandleCount() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/processSize");
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
    <div className="size">
      <div className="sizeItem">
        <span className="sizeTitle">Process with highest working set size</span>
        <div className="sizeContainer">
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="process_name" />
              <YAxis
                domain={[0, "dataMax + 100000"]}
                label={{
                  value: "Process Size in Kb",
                  angle: -90,
                  position: "insideBottomLeft",
                  offset: 2,
                  fontSize: 10,
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="process_size" fill="#2e0540" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
