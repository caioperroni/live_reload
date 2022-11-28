WATCH_DIR=$(grep -o '"watchDir": "[^"]*' main.json | grep -o '[^"]*$')
SIGNAL_PATH=$(grep -o '"signalPath": "[^"]*' local/helper/helper.json | grep -o '[^"]*$')
NODE_SIGNAL="$SIGNAL_PATH.node"
BASH_SIGNAL="$SIGNAL_PATH.bash"

source $PWD/local/helper/helper.sh

# live_reload ♻ watch_files - find and watch files for changes, emmit signals
watch_files() {
    CHSUM1=""
    while [[ true ]]; do
        CHSUM2=$(find $WATCH_DIR -type f -exec md5sum {} \;)
        if [[ $CHSUM1 != $CHSUM2 ]]; then
            if [ -n "$CHSUM1" ]; then
                clear
                DIFF=$(diff <(echo -e "$CHSUM1") <(echo -e "$CHSUM2"))
                display_changes "$DIFF"
                read NODE_STATUS <$NODE_SIGNAL
                emit_signals $NODE_STATUS
            fi
            CHSUM1=$CHSUM2
        fi
        sleep 1
    done
}

# live_reload ♻ watch_changes - trap watch_files as shell child proccess
watch_changes() {
    watch_files &
    CHANGE_PID=$!
    trap "kill $CHANGE_PID >/dev/null 2>&1" $(seq 0 15)
}

# live_reload ♻  start_app - validate if live_reload is called for dev, to start watching changes
start_app() {
    clear
    if [[ $1 == "dev" ]]; then
        watch_changes
        node main.js $CHANGE_PID $@
    else
        node main.js $@
    fi
}

start_app $@
