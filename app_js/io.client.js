// live_reload ♻ io.client - addEventListener on window load to connect and listen socket.io reload event

// ♻♻♻ IF YOU CHANGE THIS FILE, APP SHOULD RELOAD ♻♻♻
// ♻♻♻ TRY CHANGING reloadTimeout FOR EXPERIMENTS ♻♻♻

const reloadTimeout = 1000;
const workerUrl = "http://localhost:9000/";

const reloadListener = (socket) => {
  console.log(`Reloading in ${reloadTimeout}ms`);
  socket.disconnect();
  setTimeout(() => window.location.reload(), reloadTimeout);
};

const loadListener = () => {
  if (!io) return;
  const socket = io(workerUrl);
  socket.on("reload", () => reloadListener(socket));
};

window.addEventListener("load", loadListener);
