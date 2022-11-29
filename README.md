<div align="center"> <h3> perroni ♻ tech </h3> https://perroni.tech | 2022 | MIT License  </div>

<br>

# Live Reload

<p>

For developers, live_reload is a workspace setup that helps by detecting file changes in some directory and automatically restarting applications. Using shell script, pure Node.js and socket.io (only for browsers, if needed), can be used with many languages and frameworks, such as Node.js and Golang. If adapted, mostly any application and language that runs on Linux can be used.

Heavly inspired by [nodemon](https://github.com/remy/nodemon#nodemon), solves almost the same problems with, bringing also the chance to be used out of Node.js projects.

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

Considering the `watchDir` and `signalPath` present on [main.json](./main.json) along with other possible options to setup, the [main.sh](./main.sh), called trough the `npm start dev` command on terminal, is able to `find` and `exec` the `md5sum` on the choosed folder, comparing them on a loop and emiting to the [local/signal](./local/signal/) controllers, whenever a file has changed.

The same script is also responsible to call the main instance of the [main.js](./main.js), wich will use the `spawn` function of Node.js `child_process` to run the app, considering the `watchConfig` options, along with `watch` and `writeFileSync` functions of Node.js `fs` to receive and emit signals trough the files.

The [main.js](./main.js) also can persist errors, logging them into [local/debug](./local/debug/) files if `debugOnConsole` is false on [main.json](./main.json). This will hide errors from console but keep them on txt dated files. If `debugOnConsole` is true, errors will be displayed on console and not logged/persisted.

If you are developing an UI and need a browser to reload, you can set the `workerWatch` to true and the `workerOrigin` to your UI host URL. This will enable the **Watch Worker**, an socket.io server responsible for emitting the `reload` event to browsers. To setup the client side so they can reload, something as simple as the [io.client](./app_static/io.client.js) sample will work (requires the lib also in the folder, linked on the app index.html).

</p>

## ♻ BASIC SETUP AND DEFAULT SAMPLE RUN/TEST

1. Clone the project:

   ```shell
   git clone https://github.com/caioperroni/live_reload.git
   ```

2. Go to the root and install dependencies:

   ```shell
   cd live_reload
   npm i
   ```

3. Run the default sample [app_js](./app_js/) in watch mode:

   ```shell
   # "dev" parameter required to the watch mode
   npm start dev

   # the following will start the app, but not watch/reload
   # npm start
   ```

4. Go to `http://localhost:3000/` and open the Console;

5. Change something on [app_js](./app_js/) or [app_static](./app_static/) files, save and watch as server and browser reload;

## ♻ [MAIN.JSON](./main.json) OPTIONS

1. `watchConfig`

   Holds the properties that will be used as arguments to start the app (`spawn` the `child_process`)

   - `mainCmd`: 1st arg [defaults to "node"]
   - `preArgs`: Array of args to be passed after the 1st and before the `entryPath`
   - `entryPath`: Relative path to your app entry file [defaults to "./app_js/sample.js"]
   - `postArgs`: Array of args to be passed after the `entryPath`

<br>

2. `watchOptions`

   Options to control behaviour of the live_reload

   - `debugOnConsole`: Control the error log display and persistence; If true will display errors on console and not persist; If false will hide errors from console but log and persist on txt files in [local/debug](./local/debug/) [defaults to "false"]
   - `signalPath`: Path to folder that will hold the signal control files [defaults to "local/signal/"]
   - `watchDir`: List of relative path(s) to watch for changes [defaults to "./app_js ./app_static"]

<br>

3. `watchWorker`

   Options for the **Watch Worker** server, wich can emit the `reload` event to a connected client

   - `workerWatch`: Switch on/off; If true will start the server and emit `reload` events on changes; If false will not start the server or emit events [defaults to "true"]
   - `workerOrigin`: UI/client host URL; Used to accept CORS on server [defaults to "http://localhost:3000"]

## ♻ THE SAMPLES

<p>

There are 2 Sample apps avaliable to help using and understanding the live_reload: the **default** [app_js](./app_js/) and the [app_go](./app_go/)

Both are simple Http Server apps, in different languages, that will serve a static UI avaliable on [app_static](./app_static/)

To change among then you can copy the [app_js.main.json](./app_js.main.json) or [app_go.main.json](./app_go.main.json)content to the [main.json](./main.json) and restart the live_reload

</p>

1. app_js: The following configs on [main.json](./main.json):

   ```json
   "watchConfig": {
      "mainCmd": "node",
      "preArgs": [],
      "entryPath": "./app_js/sample.js",
      "postArgs": []
    },
    "watchOptions": {
      ...
      "watchDir": "./app_js ./app_static"
    }
   ```

   Will watch the server code on [app_js](./app_js/), the client code on [app_static](./app_static/) and `spawn` a `child_process` similar as the terminal command:

   ```shell
   node ./app_js/sample.js
   ```

2. app_go: The following configs on [main.json](./main.json):

   ```json
   "watchConfig": {
      "mainCmd": "go",
      "preArgs": ["run"],
      "entryPath": "./app_go/sample.go",
      "postArgs": []
    },
    "watchOptions": {
      ...
      "watchDir": "./app_go ./app_static"
    }
   ```

   Will watch the server code on [app_go](./app_go/), the client code on [app_static](./app_static/) and `spawn` a `child_process` similar as the terminal command:

   ```shell
   go run ./app_go/sample.go
   ```

## ♻ USE WITH YOUR APP

<p>

To use the live_reload with your own app, copy the root folder and setup the main.json accordingly; If something goes wrong, check the [main.js](./main.js) and [main.sh](./main.sh), such as the [helpers](./local/helper/), to understand and try to adapt the strategy. If needed reach out so i can help!

</p>
