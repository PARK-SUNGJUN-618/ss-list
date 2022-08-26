const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require('path');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.use('/api/data', function(req, res) {
  res.json({ greeting: 'Hello World' });
});

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === "production") {
  // 리액트 정적 파일 제공
  app.use(express.static(path.join(__dirname, 'client/build')));

  // 라우트 설정
}
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname+'/client/build/index.html'));
// });
// console.log(`server running at http ${port}`);

//create a task
app.post("/api/sslist", async (req, res) => {
  const { ssTitle, ssContent, ssCreateDate, ssUpdateDate, ssIsChecked, ssIsDeleted } = req.body;
  const newTask = await pool.query(
    "INSERT INTO tbl_sslist (ssTitle, ssContent, ssCreateDate, ssUpdateDate, ssIsChecked, ssIsDeleted) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [ssTitle, ssContent, ssCreateDate, ssUpdateDate, ssIsChecked, ssIsDeleted]
  );
  res.json(newTask.rows[0]);
})

// get all tasks
app.get("/api/sslist", async(req, res) => {
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

//get a task
app.get("/api/sslist/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const task = await pool.query("SELECT * FROM tbl_sslist WHERE ssKey = $1", [ssKey])
    
    res.json(task.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
})

//checked a task
app.put("/api/sslist/:ssKey", async(req, res) => {
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
app.put("/api/changeSslist/:ssKey", async(req, res) => {
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
app.delete("/api/sslist/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const deleteTask = await pool.query("DELETE FROM tbl_sslist WHERE ssKey = $1", [ssKey])

    res.json("Task was deleted!")
  } catch (error) {
    console.error(err.message);
  }
})

app.listen(port, () => {
  console.log(`started app listening on port ${port}`);
})