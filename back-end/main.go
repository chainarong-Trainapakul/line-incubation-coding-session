package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

var allMessage string

var messageChan chan string

var messageList []message

type message struct {
	Date    time.Time `json:"date"`
	User    string    `json:"user"`
	Message string    `json:"message"`
}

func main() {
	http.HandleFunc("/", handleSSE())
	http.HandleFunc("/message", handleSSE())

	log.Fatal("HTTP server error: ", http.ListenAndServe("localhost:8080", nil))

}

func handleSSE() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			w.Header().Set("Content-Type", "text/event-stream")
			w.Header().Set("Cache-Control", "no-cache")
			w.Header().Set("Connection", "keep-alive")
			w.Header().Set("Access-Control-Allow-Origin", "*")

			// instantiate the channel
			messageChan = make(chan string)
			// close the channel after exit the function
			bodyBytes, err := ioutil.ReadAll(r.Body)
			if err != nil {
				fmt.Println(err)
			}
			var m message
			if err := json.Unmarshal(bodyBytes, &m); err != nil {
				fmt.Println(err)
			}
			messageList = append(messageList, m)

			defer func() {
				close(messageChan)
				messageChan = nil
				log.Printf("client connection is closed")
			}()

		case http.MethodGet:
			resp, err := json.Marshal(messageList)
			if err != nil {
				w.Write([]byte(err.Error()))
			}
			w.Write([]byte(resp))

		}
	}

}
