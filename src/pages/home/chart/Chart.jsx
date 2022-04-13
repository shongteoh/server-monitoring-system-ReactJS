import "./chart.css";
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

export default function Chart() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/processNumber");
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
    <div className="chart">
      <div className="chartItem">
        <span className="chartTitle">Server Running Process</span>
        <div className="chartContainer">
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#135746" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="to_char"
                label={{
                  value: "Timestamp",
                  position: "insideBottom",
                  offset: 1,
                  fontSize: 10,
                }}
              />
              <YAxis
                domain={["dataMin-1", "dataMax+1"]}
                label={{
                  value: "No of Running Process",
                  angle: -90,
                  position: "insideBottomLeft",
                  offset: 12,
                }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="system_process"
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
