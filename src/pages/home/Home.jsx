import React from "react";
import Chart from "./chart/Chart";
import SquareInfo from "./squareInfo/SquareInfo";
import "./home.css";
import SmallWidget from "./smallWidget/SmallWidget";


export default function Home() {

  return (
    <div className="home">
      <div className="homeWidgets">
        <SmallWidget />
        <Chart />
      </div>
      <SquareInfo />
    </div>
  );
}
