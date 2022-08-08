const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 3001;

app.use(cors());
app.use(express.json());

//create a task
app.post("/sslist", async (req, res) => {
  const { name } = req.body;
  const newTask = await pool.query(
    "INSERT INTO test_tbl (name) VALUES ($1) RETURNING *",
    [name]
  );
  res.json(newTask.rows[0]);
})

// get all tasks
app.get("/sslist", async(req, res) => {
  try {
    const allTasks = await pool.query("SELECT * from test_tbl");
    
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//get a task
app.get("/sslist/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT * FROM test_tbl WHERE id = $1", [id])
    
    res.json(task.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
})

//update a task
app.put("/sslist/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateTask = await pool.query("UPDATE test_tbl SET name = $1 WHERE id = $2", [name, id])

    res.json("Task was updated!")
  } catch (error) {
    console.error(err.message);
  }
})

//delete a task
app.delete("/sslist/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM test_tbl WHERE id = $1", [id])

    res.json("Task was deleted!")
  } catch (error) {
    console.error(err.message);
  }
})

app.listen(port, () => {
  console.log(`started app listening on port ${port}`);
})