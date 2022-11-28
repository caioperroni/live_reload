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

	if err != nil {
		fmt.Println(err.Error())
	}
}
