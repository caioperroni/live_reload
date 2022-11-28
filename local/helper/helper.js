// live_reload ♻ node libs
const HttpServer = require("http").Server;
const app = require("express")();
const ioServer = require("socket.io");
const { appendFileSync } = require("fs");

// live_reload ♻ constants - from helper.json
const { paths, msgs, errors, config } = require("./helper.json");
const { debugPath, ioPath } = paths;
const { title, logs, tip } = errors;
const { dashes, conn, disc, fromSocket, listening } = msgs;
const { appName, port, ioCors } = config;

// live_reload ♻ prompt - helper to liveReloadError
const colorPrompt = (n) => `\x1b[${n}m%s\x1b[0m`;
const logColor = (color, msg) => console.log(colorPrompt(color), msg);

// live_reload ♻ error - display error warning and tips on console and create error log
const liveReloadError = (data) => {
  const errFile = `${debugPath}errors_${new Date().toISOString().substring(0, 10)}.txt`;
  const errName = `${debugPath}error_${process.ppid}_${process.pid}_${Date.now()}`;
  logColor(title.color, title.msg);
  logColor(logs.color, `${logs.msg}  ${errFile} > ${errName}`);
  logColor(tip.color, tip.msg);
  appendFileSync(errFile, `${errName}\n${dashes}${data.toString()}${dashes}`);
};

// live_reload ♻ socket - io connection and disconnection handler
const liveReloadSocket = (socket) => {
  logColor("33", `${socket.id} ${conn} ${fromSocket}`);
  socket.on("disconnect", () => logColor("31", `${socket.id} ${disc} ${fromSocket}`));
};

// live_reload ♻ createSocket - io server creation
const liveReloadCreateSocket = (http, watchHost) =>
  ioServer(http, {
    cors: {
      origin: watchHost,
      ...ioCors,
    },
  });

// live_reload ♻ start - require main app, handle io and start
const liveReloadWorkerStart = (watchHost) => {
  app.get(ioPath, (req, res) => res.sendStatus(200));
  const http = HttpServer(app);
  _io = liveReloadCreateSocket(http, watchHost);
  _io.on("connection", liveReloadSocket);
  http.listen(port, () => logColor("32", `${appName} ${listening} ${port}`));
};

module.exports = {
  logColor,
  liveReloadError,
  liveReloadSocket,
  liveReloadWorkerStart,
};
