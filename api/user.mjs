import express from "express";

import connection from "../database.mjs";

const router = express.Router();

//
// login
router.get("/login/:username", (req, res) => {
  const query = "SELECT * FROM user WHERE username = ?";

  connection.query(query, req.params.username, (err, data) => {
    if (err) res.status(400).send(err);

    if (data.length === 0)
      res.status(200).send({
        success: 0,
      });
    else {
      // set time
      // JS add some changes in time
      data[0].birthDate.setTime(
        data[0].birthDate.getTime() -
          data[0].birthDate.getTimezoneOffset() * 60 * 1000
      );

      res.status(200).send({
        success: 1,
        ...data[0],
      });
    }
  });
});

export default router;
