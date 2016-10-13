var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     switch(req.url) {
          case "/":
               if (req.method != "GET")
                    break;
               var payload = { 'hello': 'world' }
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 200
               res.end(JSON.stringify(payload))
               break;
          case "/articles":
               if (req.method != "GET")
                    break;
               var payload = {
                    articles :
                    [ {id:1, author:'Scott', body:'A post'},
                      {id:1, author:'Scott', body:'A post'},
                      {id:1, author:'Scott', body:'A post'}
                    ]
               }
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 200
               res.end(JSON.stringify(payload))
               break;
          case "/login":
               if (req.method != "POST")
                    break;
               var parseRes = JSON.parse(req.body)
               var username = parseRes.username
               var result = "{username: <" + username + ">, result:'success'}"
               res.end(result)
               break;
          case "/logout":
               if (req.method != "PUT")
                    break;
               res.end("OK")
               break;
     }
     
}