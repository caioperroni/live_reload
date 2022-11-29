// live_reload ♻ app_go sample - golang app to serve live_reload ui sample

// ♻♻♻ IF YOU CHANGE THIS FILE, APP SHOULD RELOAD ♻♻♻
// ♻♻♻ TRY CHANGING BETWEEN LINES 19 AND 20 TO TEST ERROR ♻♻♻

package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Sample app_go is listening on port 3000")

	fs := http.FileServer(http.Dir("./app_static"))
	http.Handle("/", fs)

	err := http.ListenAndServe(":3000", nil)
	// err := hhttp.ListenAndServe(":3000", nil)

	if err != nil {
		fmt.Println(err.Error())
	}
}
