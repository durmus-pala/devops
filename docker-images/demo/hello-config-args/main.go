package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s, Clarusway!\n", *greeting)
}

var greeting = flag.String("greeting", "", "Salutation to use")

func main() {
	flag.Parse()
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":8888", nil))
}
