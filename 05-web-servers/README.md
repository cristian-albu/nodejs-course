client --facebook.com-> DNS server
client <-31.13.80.36-- DNS server
client --http/https-> HTTP server
client <-JSON/XML/TXT-- HTTP server

HTTP Requests

- Method: POST/GET/PUT/DELETE/etc
- Path: /messages
- Body: {text: "hello", photo: "smile.jpg"}
- Headers: metadata (host, auth, etc)

HTTP Responses

- Headers: Content-Type
- Body: {text: "hi"}
- Status Code: 100, 200, 300, 400, 500

### What is an origin:

Protocol
http://

Host:
www.google.com

Port:
:443

Whenever one of these changes, there is a different origin

Same origin policy: basically can't request data from a different part. Can't run a fetch from google.com to facebook.com. That would be a cross origin request (CORS)

### CORS - Cross Origin Resource Sharing

Access-Control-Allow-Origin: https://www.google.com - only allow from this
Access-Control-Allow-Origin: \* - allow from all
