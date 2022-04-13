const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//
//get data

app.get("/system", async (req, res) => {
  try {
    const allSystemData = await pool.query(
      " SELECT * FROM system ORDER BY system_id DESC LIMIT 1;"
    );
    res.json(allSystemData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/processNumber", async (req, res) => {
  try {
    const allSystemData = await pool.query(
      " SELECT system_id,system_process,to_char(system_timestamp, 'HH24:MI:SS') FROM (SELECT * FROM system ORDER BY system_timestamp DESC LIMIT 12) AS x ORDER BY system_timestamp ASC;"
    );
    res.json(allSystemData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/cpu", async (req, res) => {
  try {
    const allCpuData = await pool.query(
      " SELECT cpu_id,cpu_usage,cpu_ram,disk_total,disk_used,disk_free FROM cpu,disk ORDER BY disk_id DESC, cpu_id DESC LIMIT 1;"
    );
    res.json(allCpuData.rows);
  } catch (error) {
    console.error(err.message);
  }
});
app.get("/process", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      " SELECT DISTINCT ON (process_name) process_id,process_name, process_handlecount,process_threadcount,process_size,process_priority FROM process ORDER BY process_name, process_timestamp DESC;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/largeWidget", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT cpu_id, cpu_usage,cpu_ram, ROUND ((disk_free::INTEGER)*100/(disk_total::INTEGER)) as disk_usability FROM disk,cpu ORDER BY disk_id,cpu_id DESC LIMIT 1;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/battery", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT * FROM battery ORDER BY battery_id DESC LIMIT 1;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});
app.get("/cpuUtilization", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT cpu_id,cpu_usage,to_char(cpu_timestamp, 'HH24:MI:SS') FROM (SELECT * FROM cpu ORDER BY  cpu_timestamp DESC LIMIT 12) AS x ORDER BY cpu_timestamp ASC;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/diskUtilization", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT disk_id, disk_total,disk_used,disk_read_time,disk_write_time,ROUND((memory_used_virtual::INTEGER)*100/(memory_total_virtual::INTEGER)) as memory_virtual,ROUND((memory_used_swap::INTEGER)*100/(memory_total_swap::INTEGER)) as memory_swap  FROM memory,disk ORDER BY memory_id,disk_id DESC LIMIT 1;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/ramUtilization", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT cpu_id,cpu_ram,to_char(cpu_timestamp, 'HH24:MI:SS') FROM (SELECT * FROM cpu ORDER BY  cpu_timestamp DESC LIMIT 12) AS x ORDER BY cpu_timestamp ASC;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/networkUtilization", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT network_id,network_received,network_sent,to_char(network_timestamp, 'HH24:MI:SS')  FROM (SELECT * FROM network ORDER BY  network_timestamp DESC LIMIT 12) AS x ORDER BY network_timestamp ASC;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/processPriority", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT * FROM (SELECT DISTINCT ON (process_name) process_id,process_name, process_priority FROM process ORDER BY process_name, process_timestamp DESC) as x WHERE  'Compression' NOT IN (process_priority) AND 'Idle' NOT IN (process_priority) ORDER BY process_priority::integer DESC LIMIT 5;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/processSize", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT * FROM (SELECT DISTINCT ON (process_name) process_id,process_name, process_size FROM process ORDER BY process_name, process_timestamp DESC) as x ORDER BY process_size::integer DESC LIMIT 5;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/processHandleCount", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT * FROM (SELECT DISTINCT ON (process_name) process_id,process_name, process_handlecount::INTEGER FROM process ORDER BY process_name, process_timestamp DESC) as x  ORDER BY process_handlecount::integer DESC LIMIT 5;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/processThreadCount", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT * FROM (SELECT DISTINCT ON (process_name) process_id,process_name, process_threadcount FROM process ORDER BY process_name, process_timestamp DESC) as x WHERE 'Memory' NOT IN (process_name) AND 'System' NOT IN (process_name) ORDER BY process_threadcount::integer DESC LIMIT 5;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/server", async (req, res) => {
  try {
    const allProcessData = await pool.query("SELECT * FROM server;");
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.get("/notification", async (req, res) => {
  try {
    const allProcessData = await pool.query(
      "SELECT notification_id, notification_description,to_char(notification_timestamp, 'HH24:MI:SS') FROM notification WHERE 'Everything is good' NOT IN (notification_description) ORDER BY notification_timestamp DESC;"
    );
    res.json(allProcessData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.post("/newServer", async (req, res) => {
  try {
    const { name, ip, department } = req.body;
    const newNewServer = await pool.query(
      "INSERT INTO server (server_name,server_ip,server_department) VALUES ($1,$2,$3) RETURNING *",
      [name, ip, department]
    );
    res.json(newNewServer.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
