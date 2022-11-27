<div align="center"> <h3> perroni ♻ tech </h3> https://perroni.tech | 2022 | MIT License  </div>

<br>

# Live Reload

<p>

For developers, live_reload is a workspace setup that helps by detecting file changes in some directory and automatically restarting applications. Using shell script, pure Node.js and socket.io (only for browsers, if needed), can be used with many languages and frameworks, such as Node.js, Express.js, pure JS and, if adapted, mostly any application and language that runs on Linux.

Heavly inspired by [nodemon](https://github.com/remy/nodemon#nodemon), solves almost the same problems with an easier configuration, bringing also the chance to be used out of Node.js projects.

</p>

## ♻ REQUIRED TECH STACK

<div>
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" />
<img src="https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white" />
</div>

## ♻ STRATEGY

<p>

Considering the `watchDir` and `signalPath` properties present on [main.json](./main.json) along with other possible options to setup, the [main.sh](./main.sh), called trough the `npm start dev` command on terminal, is able to `find` and `exec` the `md5sum` on the [app](./app/) folder (by default), comparing them on a loop and emiting to the [signal](./local/signal/) controllers, whenever a file has changed.

The same script is also responsible to call the main instance of the [main.js](./main.js), wich will use the `spawn` function of Node.js `child_proccess` to run the app, along with `watch` and `writeFileSync` functions of Node.js `fs` to receive and emit signals trough the files. The javascript is also responsible for the control of errors/logs, the respawns on both cases (with new changes, regardless errors) and for emitting the `reload` event trough socket.io to browsers, so they can reload with something as simple as the [io.client](./app/io.client.js) samples (requires the lib also in the folder, linked on the app index.html).

</p>

## ♻ SETUP

## ♻ USAGE

## ♻ SAMPLE

## ♻ DEPENDENCIES

```json
  "dependencies": {
    "express": "^4.18.1", // for BE sample
    "socket.io": "^4.5.1" // for FE sample
  }
```
