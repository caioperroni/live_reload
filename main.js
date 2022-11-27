#!/usr/bin/node
// ♻♻♻ IF YOU CHANGE THIS FILE, APP SHOULD RELOAD ♻♻♻

// live_reload ♻ node - spawn to init child process and watch for file changes
const { spawn } = require("child_process");
const { watch, writeFileSync } = require("fs");

// live_reload ♻ constants - from main.json
const { config, paths, msgs } = require("./main.json");
const { ioPath, mainPath, signalPath } = paths;
const { listening } = msgs;
const { appName, debugOnConsole, port } = config;

// live_reload ♻ helpers - from local/helper
const { liveReloadError, liveReloadSocket } = require("./local/helper/helper.js");

// live_reload ♻ variables - to handle child proccess and args/parameters
let liveReloadChild;
let liveReloadArg = process.argv[2];

// live_reload ♻ bind - bind to child process "close" event to respawn/reload
// and stderr data event to log errors if debugOnConsole is disabled on main.json
const liveReloadBind = (child) => {
  child.on("close", (code) => {
    if (code === 0) liveReloadSpawn(liveReloadArg);
    else liveReloadFix();
  });
  if (!debugOnConsole) child.stderr.on("data", liveReloadError);
};

// live_reload ♻ spawn - creates child process and call event binder
const liveReloadSpawn = (arg) => {
  writeFileSync(signalPath + ".node", "spawn");
  liveReloadChild = spawn("node", ["main.js", "child", arg], {
    stdio: [null, 1, debugOnConsole ? 2 : null],
  });
  liveReloadBind(liveReloadChild);
};

// live_reload ♻ fix - signal error to .node and watch for new changes after error
const liveReloadFix = () => {
  writeFileSync(signalPath + ".node", "error");
  liveReloadNodeWatch();
};

// live_reload ♻ node watch - spawn new child procces when new changes happen after error
const liveReloadNodeWatch = () => liveReloadWatch(signalPath + ".node", () => liveReloadSpawn(liveReloadArg));

// live_reload ♻ bash watch - watch for new changes, emiting io event and exiting from child proccess
const liveReloadBashWatch = () => {
  liveReloadWatch(signalPath + ".bash", () => {
    if (_io) _io.emit("reload");
    process.exit(0);
  });
  liveReloadStart();
};

// live_reload ♻ watch -  watch for new changes wrapper
const liveReloadWatch = (path, callback) => {
  const watcher = watch(path, () => {
    watcher.close();
    callback();
  });
};

// live_reload ♻ start - require main app, handle io and start
const liveReloadStart = () => {
  const app = require(mainPath);
  app.get(ioPath, (req, res) => res.sendStatus(200));
  const http = require("http").Server(app);
  _io = require("socket.io")(http);
  _io.on("connection", liveReloadSocket);
  http.listen(port, () => console.log(`${appName} ${listening} ${port}`));
};

// live_reload ♻ entry - handle first liveReload call to spwan or watch child process
if (liveReloadArg === "child") liveReloadBashWatch();
else liveReloadSpawn(liveReloadArg);
