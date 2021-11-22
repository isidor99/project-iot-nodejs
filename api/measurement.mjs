import express from "express";
import moment from "moment";

import connection from "../database.mjs";

const router = express.Router();

const SELECT_TYPE_ZERO = 0;
const SELECT_TYPE_MONTH = 1;
const SELECT_TYPE_DATE = 2;

// get
// get device measurements for date
router.get(
  [
    "/:idInfo", // 1
    "/:idInfo/date/:date", // 2
    "/:idInfo/month/:month", // 3
  ],
  (req, res) => {
    function processData(data) {
      if (data[0][0].success === 0) res.status(400).send();
      else if (data[0][0].success === 1) res.status(200).json(data[1]);
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 30;
    const limitStart = (page - 1) * perPage;

    const query = "CALL get_device_measurements_by_date(?, ?, ?, ?, ?)";

    if (req.params.date) {
      //
      const isDateValid = moment(req.params.date, "YYYY-MM-DD", true).isValid();

      if (isDateValid)
        connection.query(
          query,
          [
            req.params.idInfo,
            SELECT_TYPE_DATE,
            req.params.date,
            limitStart,
            perPage,
          ],
          (_, data) => processData(data)
        );
      else res.status(400).send();
      //
    } else if (req.params.month) {
      //
      const isMonthValid = moment(req.params.month, "M", true).isValid();

      if (isMonthValid)
        connection.query(
          query,
          [
            req.params.idInfo,
            SELECT_TYPE_MONTH,
            req.params.month,
            limitStart,
            perPage,
          ],
          (_, data) => processData(data)
        );
      //
    }
    //
    else
      connection.query(
        query,
        [req.params.idInfo, SELECT_TYPE_ZERO, "0", limitStart, perPage],
        (_, data) => processData(data)
      );
    //
  }
);

// post
router.post("/new", (req, res) => {
  const body = req.body;
  const query = "CALL add_new_measurement(?, ?, ?)";

  connection.query(query, [body.dtime, body.value, body.idInfo], (_, data) => {
    if (data[0][0].success === 0) res.status(400).send();
    else if (data[0][0].success === 1) res.status(200).send();
  });
});

export default router;
