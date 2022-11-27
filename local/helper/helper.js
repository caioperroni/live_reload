// live_reload ♻ node - spawn to init child process and watch for file changes
const { appendFileSync } = require("fs");

// live_reload ♻ constants - from main.json
const { paths, msgs, errors } = require("../../main.json");
const { debugPath } = paths;
const { title, logs, tip } = errors;
const { dashes, conn, disc, fromSocket } = msgs;

// live_reload ♻ prompt - helper to liveReloadError
const colorPrompt = (n) => `\x1b[${n}m%s\x1b[0m`;
const logColor = (color, msg) => console.log(colorPrompt(color), msg);

// live_reload ♻ error - display error warning and tips on console and create error log
const liveReloadError = (data) => {
  const errFile = `${debugPath}errors_${new Date().toISOString().substring(0, 10)}.txt`;
  const errName = `${debugPath}error_${process.ppid}_${process.pid}_${Date.now()}.txt`;
  logColor(title.color, title.msg);
  logColor(logs.color, `${logs.msg}  ${errName}`);
  logColor(tip.color, tip.msg);
  appendFileSync(errFile, `${errName}\n${dashes}${data.toString()}${dashes}`);
};

// live_reload ♻ socket - io connection and disconnection handler
const liveReloadSocket = (socket) => {
  logColor("33", `${socket.id} ${conn} ${fromSocket}`);
  socket.on("disconnect", () => logColor("31", `${socket.id} ${disc} ${fromSocket}`));
};

module.exports = {
  logColor,
  liveReloadError,
  liveReloadSocket,
};
