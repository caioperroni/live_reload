window.addEventListener("load", () => {
  if (!!io) {
    const socket = io({
      reconnectionDelayMax: 10000,
    });
    socket.on("reload", () => {
      console.log("Reloading in 1000ms");
      socket.disconnect();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
});
