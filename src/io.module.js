module.exports = (socket) => {
  console.debug(`${socket.id} connected`);
  socket.on("disconnect", () => {
    console.debug(`${socket.id} disconnected`);
  });
};
