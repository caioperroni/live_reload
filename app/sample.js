// live_reload ♻ sample - express app to serve live_reload ui sample

// ♻♻♻ IF YOU CHANGE THIS FILE, APP SHOULD RELOAD ♻♻♻
// ♻♻♻ TRY CHANGING LINES 9 BY 10 TO TEST ERROR ♻♻♻

const express = require("express");
const app = express();
app.use(express.static("app"));
module.exports = app;
// module.exports = appp;
