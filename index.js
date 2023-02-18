
var http = require('http');
http.createServer( (req, res) => {
    let url = new URL("http://localhost:8080" + req.url);
    res.writeHead(200, {'Conent-Type' : 'text/html', 'Access-Control-Allow-Origin': '*'});
    res.end(JSON.stringify({message: "ok"}));
     
}).listen(8080);