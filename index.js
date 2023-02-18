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
                    let t = new Date();
                    console.log(t.toString().split("T")[0]);
                    let q = `INSERT INTO userus VALUES (null, '${obj.pass}', '${obj.email}', '${obj.name}', true, true, false, '${t.toString().split("T")[0]}', '[]',false, false, '0000-00-00', '')`;
                    connection.query(q, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user add", comment: "successful"}));
                      });
                    break;
                case "modify":
                    let tab = JSON.parse(url.searchParams.get("parametry"));
                    let s = [];
                    for (let i = 0; i < tab[0].length; i++) {
                        console.log(typeof(typeof(1)));
                        if(typeof(tab[1][i]) == "number" || typeof(tab[1][i]) == "boolean") {
                            s.push(`${tab[0][i]} = ${tab[1][i]}`);
                        } else {
                            s.push(`${tab[0][i]} = '${tab[1][i]}'`);
                        }
                        
                    }
                    let qu = `UPDATE userus SET ${s.join(" AND ")}  WHERE  id = ${tab[2]}`;
                    connection.query(qu, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user mod", comment: "successful", result: results[0]}));
                      });
                    break;
                case "register":
                    break;
                case "get":
                    let objx = JSON.parse(url.searchParams.get("parametry"));
                    let u = `SELECT * FROM userus WHERE email = '${objx.mail}' AND pass = '${objx.pass}'`;
                    connection.query(u, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user select", comment: "successful", result: results}));
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