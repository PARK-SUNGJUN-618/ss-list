const express = require('express');
const pool = require("./db");
var router = express.Router();

router.get('/getSsDiary/:params', async (req, res) => {
  try {
    const { params } = req.params;
    const limit = params.split('&')[1];
    const offset = (params.split('&')[0]-1)*limit;
    // console.log("offset:",offset,",  limit:",limit);
    const allDiaries = await pool.query(
      `SELECT sskey "ssKey", ssorigcontent "ssOrigContent", ssmodicontent "ssModiContent", sscreatedate "ssCreateDate", ssupdatedate "ssUpdateDate", ssisdeleted "ssIsDeleted" FROM tbl_ssdiary ORDER BY sskey DESC OFFSET $1 LIMIT $2`
      ,[offset, limit]
    );
    
    // console.log("here!!:",allDiaries)
    res.json(allDiaries.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/getSsDiariesCount', async (req, res) => {
  try {
    const allDiaries = await pool.query(
      `SELECT count(*) "totalCount" FROM tbl_ssdiary`
    );
     
    // console.log(allDiaries.rows[0])
    // console.log("here!!:",allDiaries)
    res.json(allDiaries.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a diary
router.post("/addDiary", async (req, res) => {
  const { ssOrigContent, ssModiContent, ssCreateDate, ssUpdateDate, ssIsDeleted } = req.body;
  const newTask = await pool.query(
    "INSERT INTO tbl_ssdiary (ssOrigContent, ssModiContent, ssCreateDate, ssUpdateDate, ssIsDeleted) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [ssOrigContent, ssModiContent, ssCreateDate, ssUpdateDate, ssIsDeleted]
  );
  res.json(newTask.rows[0]);
})

//delete a diary
router.delete("/deleteDiary/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const deleteDiary = await pool.query("DELETE FROM tbl_ssdiary WHERE ssKey = $1", [ssKey])

    res.json("Diary was deleted!")
  } catch (error) {
    console.error(err.message);
  }
})

//update a diary
router.put("/changeDiary/:ssKey", async(req, res) => {
  try {
    const { ssKey } = req.params;
    const { ssModiContent, ssUpdateDate } = req.body;
    const updateDiary = await pool.query("UPDATE tbl_ssdiary SET ssModiContent = $1, ssUpdateDate = $2 WHERE ssKey = $3",
      [ssModiContent, ssUpdateDate, ssKey]
    )

    res.json("Diary was updated!")
  } catch (error) {
    console.error(err.message);
  }
})

module.exports = router;