import http from "http";
import app from "./app.mjs";

const port = process.env.PORT || 11450;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
