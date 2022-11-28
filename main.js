// live_reload ♻ node libs
const { spawn } = require("child_process");
const { watch, writeFileSync } = require("fs");

// live_reload ♻ helpers - from local/helper
const { liveReloadError, liveReloadWorkerStart } = require("./local/helper/helper.js");

// live_reload ♻ constants - from main.json
const { watchConfig, watchOptions, watchWorker } = require("./main.json");
const { mainCmd, entryPath, preArgs, postArgs, watchDir } = watchConfig;
const { debugOnConsole, signalPath } = watchOptions;
const { workerWatch, workerOrigin } = watchWorker;

// live_reload ♻ variables - to handle child proccess and args/parameters
let liveReloadChild;
let liveReloadArg = process.argv[2];

// live_reload ♻ kill - assure liveReloadChild and group is killed
const liveReloadKill = () => {
  try {
    process.kill(-liveReloadChild.pid);
  } catch {}
};

// live_reload ♻ bind - bind to child process "close" event to respawn/reload
// and stderr data event to log errors if debugOnConsole is disabled on main.json
const liveReloadBind = (child) => {
  child.on("exit", liveReloadKill);
  child.on("close", (code) => {
    if (code === 0) liveReloadSpawn(liveReloadArg);
    else liveReloadFix();
  });
  if (!debugOnConsole) child.stderr.on("data", liveReloadError);
};

// live_reload ♻ spawn - creates child process and call event binder
const liveReloadSpawn = (arg) => {
  liveReloadBashWatch();
  writeFileSync(signalPath + ".node", "spawn");
  const entry = `${watchDir}/${entryPath}`;
  const args = [].concat(preArgs, entry, postArgs);
  liveReloadChild = spawn(mainCmd, args, {
    // stdio: [null, 1, debugOnConsole ? 2 : null],
    stdio: ["pipe", 1, debugOnConsole ? 2 : "pipe"],
    detached: true,
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
    if (workerWatch) _io.emit("reload");
    liveReloadChild.exitCode = 0;
    liveReloadChild.kill();
  });
};

// live_reload ♻ watch -  watch for new changes wrapper
const liveReloadWatch = (path, callback) => {
  const watcher = watch(path, () => {
    watcher.close();
    callback();
  });
};

// live_reload ♻ entry - handle first liveReload call to spwan or watch child process
liveReloadSpawn(liveReloadArg);
if (workerWatch) liveReloadWorkerStart(workerOrigin);
process.on("exit", liveReloadKill);
process.on("SIGINT", () => process.exit());
