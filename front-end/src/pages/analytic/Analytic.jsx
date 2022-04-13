import "./analytic.css";
import HandleCount from "./handleCount/HandleCount";
import Priority from "./priority/Priority";
import Size from "./size/Size";
import ThreadCount from "./threadCount/ThreadCount";

export default function Analytic() {
  return (
    <div className="analytic">
      <div className="analyticWidgets">
        <Priority />
        <HandleCount />
        <ThreadCount />
      </div>
      <Size />
    </div>
  );
}
