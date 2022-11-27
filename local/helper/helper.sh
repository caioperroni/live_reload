# live_reload ♻ color variables
red='\033[0;31;1m'
green='\033[0;32;1m'
yellow='\033[0;33m'
blue='\033[0;34;1m'
magenta='\033[35;1m'
cyan='\033[0;36;1m'
clear='\033[0m'
divider='♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻♻'

# live_reload ♻ echo_color - log to prompt with color variables
echo_color() {
    echo -e ${3} "${2} $1 ${clear}"
}

# live_reload ♻ display_changes - log the changed file(s) path to prompt
display_changes() {
    DISPLAY_TEXT=$(echo -e -n $1 | grep -o '>[^"]*' | cut -c 3-)
    echo_color $divider $cyan -n
    echo_color "RELOADING" $yellow -n
    echo_color "$divider" $cyan
    echo_color "Changed:" $green -n
    echo_color "$DISPLAY_TEXT\n" $magenta
}

# live_reload ♻ emit_signals - emit signal by changing local/signal files watched by nodejs
emit_signals() {
    case $1 in
    spawn)
        echo '' >$BASH_SIGNAL
        ;;
    error)
        echo '' >$NODE_SIGNAL
        ;;
    esac
}
