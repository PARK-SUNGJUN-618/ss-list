const express = require('express');
const pool = require("../db");
const router = express.Router();

router.route("/").get((req, res) => res.send("sslist.route"))

//create a task
router.post("/createList", async (req, res) => {
  const { ssTitle, ssContent, ssCreateDate, ssUpdateDate, ssIsChecked, ssIsDeleted } = req.body;
  const newTask = await pool.query(
    "INSERT INTO tbl_sslist (ssTitle, ssContent, ssCreateDate, ssUpdateDate, ssIsChecked, ssIsDeleted) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [ssTitle, ssContent, ssCreateDate, ssUpdateDate, ssIsChecked, ssIsDeleted]
  );
  res.json(newTask.rows[0]);
})

// get all tasks
router.get("/getLists", async(req, res) => {
  try {
    const allTasks = await pool.query(
      `SELECT sskey "ssKey", sstitle "ssTitle", sscontent "ssContent", date_trunc('second',sscreatedate) "ssCreateDate", date_trunc('second',ssupdatedate) "ssUpdateDate", ssischecked "ssIsChecked", ssisdeleted "ssIsDeleted", sspriority "ssPriority" from tbl_sslist`
    );
    
    // console.log("here!!:",allTasks)
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//get a task [not use Now]
router.get("/getList/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const task = await pool.query("SELECT * FROM tbl_sslist WHERE ssKey = $1", [ssKey])
    
    res.json(task.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
})

//checked a task
router.put("/checkList/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const { ssIsChecked, ssUpdateDate } = req.body;
    const updateTask = await pool.query("UPDATE tbl_sslist SET ssIsChecked = $1, ssUpdateDate = $2 WHERE ssKey = $3",
    [ssIsChecked, ssUpdateDate, ssKey])

    res.json("Task was checked!")
  } catch (error) {
    console.error(err.message);
  }
})

//update a task
router.put("/changeList/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const { ssTitle, ssContent, ssPriority, ssUpdateDate } = req.body;
    const updateTask = await pool.query("UPDATE tbl_sslist SET ssTitle = $1, ssContent = $2, ssPriority = $3, ssUpdateDate = $4 WHERE ssKey = $5",
    [ssTitle, ssContent, ssPriority, ssUpdateDate, ssKey])

    res.json("Task was updated!")
  } catch (error) {
    console.error(err.message);
  }
})

//delete a task
router.delete("/deleteList/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const deleteTask = await pool.query("DELETE FROM tbl_sslist WHERE ssKey = $1", [ssKey])

    res.json("Task was deleted!")
  } catch (error) {
    console.error(err.message);
  }
})

module.exports = router;