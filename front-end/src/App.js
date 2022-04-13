import Topbar from "./pages/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewServer from "./pages/newServer/NewServer";
import ServerList from "./pages/serverList/ServerList";
import Analytic from "./pages/analytic/Analytic";
import ProcessList from "./pages/process/Process";
import Performances from "./pages/performances/Performances";
import Notification from "./pages/notification/Notification";


function App() {
  return (
    <Router>
      <Topbar/>
      <div className="container">    
        <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route exact path="/Analytic" element={<Analytic />}/>
         <Route exact path="/process" element={<ProcessList />}/>
         <Route exact path="/performances" element={<Performances />}/>
         <Route exact path="/server" element={ <ServerList />}/>
         <Route exact path="/newserver" element={ <NewServer />}/>
         <Route exact path="/notification" element={<Notification/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

