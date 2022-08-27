const express = require('express');
const pool = require("./db");
var router = express.Router();

router.get('/getSsDiary/:params', async (req, res) => {
  try {
    const { params } = req.params;
    const limit = params.split('&')[1];
    const offset = (params.split('&')[0]-1)*limit;
    // console.log("offset:",offset,",  limit:",limit);
    const allTasks = await pool.query(
      `SELECT sskey "ssKey", sstitle "ssTitle", sscontent "ssContent", date_trunc('second',sscreatedate) "ssCreateDate", date_trunc('second',ssupdatedate) "ssUpdateDate", ssischecked "ssIsChecked", ssisdeleted "ssIsDeleted", sspriority "ssPriority" from tbl_sslist ORDER BY sskey DESC OFFSET $1 LIMIT $2`
      ,[offset, limit]
    );
    
    // console.log("here!!:",allTasks)
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/getSsDiariesCount', async (req, res) => {
  try {
    const allTasks = await pool.query(
      `SELECT count(*) "totalCount" FROM tbl_sslist`
    );
     
    // console.log(allTasks.rows[0])
    // console.log("here!!:",allTasks)
    res.json(allTasks.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;