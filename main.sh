watch_files() {
    CHSUM1=""
    while [[ true ]]; do
        CHSUM2=$(find ./src -type f -exec md5sum {} \;)
        if [[ $CHSUM1 != $CHSUM2 ]]; then
            if [ -n "$CHSUM1" ]; then
                read NODE_STATUS <local/signal/.node
                clear
                DIFF=$(diff <(echo -e "$CHSUM1") <(echo -e "$CHSUM2"))
                DISPLAY_TEXT=$(echo -e -n "$DIFF" | grep -o '>[^"]*' | cut -c 3-)
                echo "-------------"
                echo "Changed: $DISPLAY_TEXT"
                echo "Reloading..."
                echo "-------------"
                if [[ $NODE_STATUS == "spawn" ]]; then
                    echo '' >local/signal/.bash
                fi
                if [[ $NODE_STATUS == "error" ]]; then
                    echo '' >local/signal/.node
                fi
            fi
            CHSUM1=$CHSUM2
        fi
        sleep 1
    done
}

watch_changes() {
    watch_files &
    CHANGE_PID=$!
    trap "kill $CHANGE_PID >/dev/null 2>&1" $(seq 0 15)
}

live_reload() {
    clear
    if [[ $1 == "dev" ]]; then
        watch_changes
        node main.js $CHANGE_PID $@
    else
        node main.js $@
    fi
}

ENTRY="$@"

live_reload $@
