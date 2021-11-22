import express from "express";

import connection from "../database.mjs";

const router = express.Router();

// get
// get user devices
router.get("/user/:idUser", (req, res) => {
  const query = `SELECT * FROM device WHERE idUser = ? ORDER BY idDevice LIMIT ?, ?`;

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = 15;
  const limitStart = (page - 1) * perPage;

  connection.query(
    query,
    [req.params.idUser, limitStart, perPage],
    (_, data) => {
      res.status(200).json(data);
    }
  );
});

router.get("/:id", (req, res) => {});

export default router;
