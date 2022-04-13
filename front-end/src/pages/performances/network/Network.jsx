import "./network.css"
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

export default function Network() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/networkUtilization");
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
    <div className="network">
      <div className="networkItem">
        <span className="memoryTitle">Network utilization</span>
        <div className="memoryContainer">
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#566603" stopOpacity={0.8} />
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
                
                label={{
                  value: "Network Utilization in MB/s",
                  angle: -90,
                  position: "insideBottomLeft",
                  offset: 10,
                  fill: "#135746",
                  fontSize: 10,
                }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="network_received"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorv)"
              />
              <Area
                type="monotone"
                dataKey="network_sent"
                stroke="#8884d8"
                fillOpacity={1}
                fill="#ad260a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
