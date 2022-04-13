import "./newServer.css";
import { useState } from "react";

export default function NewServer() {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [department, setDepartment] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/newServer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ip,
          department,
        }),
      });
     console.log (response)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newServer">
      <h1 className="addServerTitle">New Server</h1>
      <form className="addServerForm" onSubmit={onSubmitForm}>
        <div className="addServerItem">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="addServerItem">
          <label>IP Address</label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            type="text"
            placeholder="IP Address"
          />
        </div>
        <div className="addServerItem">
          <label>Department</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            type="text"
            placeholder="Department"
          />
        </div>

        <button
          className="addServerButton"
          onClick={() => alert("Created successfully")}
        >
          Create
        </button>
      </form>
    </div>
  );
}
