// live_reload ♻ app_js sample - express app to serve live_reload ui sample

// ♻♻♻ IF YOU CHANGE THIS FILE, APP SHOULD RELOAD ♻♻♻
// ♻♻♻ TRY CHANGING BETWEEN LINES 10 AND 11 TO TEST ERROR ♻♻♻

const port = 3000;
const express = require("express");
const app = express();
app.use(express.static("app_js"));
app.listen(port, () => console.log(`Sample app is listening on port ${port}`));
// aapp.listen(port, () => console.log(`Sample app is listening on port ${port}`));
