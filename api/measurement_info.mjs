import express from "express";

import connection from "../database.mjs";

const router = express.Router();

// get physical quantities which user device measures
router.get("/:idDevice", (req, res) => {
  const query = "CALL get_device_measurement_info(?)";

  connection.query(query, req.params.idDevice, (_, data) => {
    res.status(200).json(data[0]);
  });
});

// get physical quantities for all user devices
router.get("/all/:idUser", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = 15;
  const limitStart = (page - 1) * perPage;

  const query = "CALL get_user_device_measurements(?, ?, ?)";

  connection.query(
    query,
    [req.params.idUser, limitStart, perPage],
    (_, data) => {
      res.status(200).json(data[0]);
    }
  );
});

export default router;
