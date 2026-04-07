require("dotenv").config({
  path: require("path").resolve(__dirname, ".env"),
  quiet: true,
  debug: false
});
const http = require("http");
const app = require("./config/config");

const httpServer = http.createServer(app);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

httpServer.listen(PORT, HOST, (err) => {
  if (!err) {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`URL: http://${HOST}:${PORT}`);
  }
});