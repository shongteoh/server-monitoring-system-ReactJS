import "./memory.css"
import React from "react";
import {
  Area,
  YAxis,
  AreaChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";


export default function Memory() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/ramUtilization");
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
    <div className="memory">
      <div className="memoryItem">
        <span className="memoryTitle">RAM utilization</span>
        <div className="memoryContainer">
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#062742" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                className="xaxis"
                dataKey="to_char"
                label={{
                  value: "Timestamp",
                  position: "insideBottom",
                  offset: 1,
                  fontSize: 10,
                  fill: "#135746",
                }}
              />
              <YAxis
                domain={["dataMin -10", 100]}
                label={{
                  value: "RAM Utilization in %",
                  angle: -90,
                  position: "insideBottomLeft",
                  offset: 10,
                  fill: "#135746",
                  fontSize:11
                  
                }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="cpu_ram"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
