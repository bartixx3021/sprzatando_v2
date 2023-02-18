var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'databasus'
  });

connection.connect();

http.createServer( (req, res) => {
    let url = new URL("http://localhost:8080" + req.url);
    res.writeHead(200, {'Conent-Type' : 'text/html', 'Access-Control-Allow-Origin': '*'});
    //res.end(JSON.stringify({message: "ok"}));
    let action = url.searchParams.get("action");
    switch (action) {
        case "offer":
            let subact = url.searchParams.get("subact");
            res.end(JSON.stringify({type: "offer"}));
            break;
        case "user":
            let subactb = url.searchParams.get("subact");
            switch (subactb) {
                case "add":
                    let obj = JSON.parse(url.searchParams.get("parametry"));
                    let t = Date();
                    console.log(t);
                    let q = `INSERT INTO userus VALUES (null, '${obj.pass}', '${obj.email}', '${obj.name}', true, true, false, '1939-09-01', '[]',false, false, '0000-00-00', '')`;
                    connection.query(q, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user add", comment: "successful"}));
                        connection.end();
                      });
                    break;
                case "modify":
                    let qu = "UPDATE userus SET name = 'Kanye North' WHERE id = 2";
                    connection.query(qu, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user mod", comment: "successful", result: results[0]}));
                        connection.end();
                      });
                    break;
                case "register":
                    break;
                case "get":
                    let u = "SELECT * FROM userus WHERE email = 'adolf@mail.pl'";
                    connection.query(u, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user select", comment: "successful", result: results[0]}));
                        connection.end();
                      });
                      break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
     
}).listen(8080);