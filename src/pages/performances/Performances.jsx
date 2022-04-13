
import "./performances.css";
import LargeWidget from "./largeWidget/LargeWidget";
import "../home/chart/chart.css"
import React from "react";
import Battery from "./battery/Battery";
import Cpu from "./cpu/Cpu";
import Disk from "./disk/Disk";
import Memory from "./memory/Memory";
import Network from "./network/Network";


export default function Performances() {

  return (
    <div className="performances">
      <div className="performancesWidgets">

        <LargeWidget />
        <Battery />

      </div>

      <Disk/>
      <Cpu />
      <Memory/>
      <Network/>

      <span/>
    </div>
  );
}


