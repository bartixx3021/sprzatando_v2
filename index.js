var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'databasus'
  });

connection.connect();

http.createServer( (req, res) => {
    let url = new URL("http://130.162.234.221:8080" + req.url);
    res.writeHead(200, {'Conent-Type' : 'text/html', 'Access-Control-Allow-Origin': '*'});
    let imglist = ['https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png', 'https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png', 'https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png', 'https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png', 'https://i.ytimg.com/vi/DRKg78s23Mo/maxresdefault.jpg', 'https://mowic.pl/wp-content/uploads/2018/07/Mak%C5%82owicz.jpg', 'https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b', 'https://olympics.nbcsports.com/wp-content/uploads/sites/10/2013/02/uspw_6375366-e1361893354120.jpg'];
    //res.end(JSON.stringify({message: "ok"}));
    let action = url.searchParams.get("action");
    let sec = url.searchParams.get("security");
    if (sec == null) {
        res.end(JSON.stringify({message: "Security Breach You are going down MR Roch"}));
        return;
    }
    switch (action) {
        case "offer":
            let subact = url.searchParams.get("subact");
            switch (subact) {
                case "select":
                    let zapytanie = "SELECT * FROM ofertus;";
                    connection.query(zapytanie, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "offer select", comment: "successful", result: results}));
                      });
                    break;
                case "add":
                    let obj = JSON.parse(url.searchParams.get("parametry"));
                    let t = new Date();
                    let x1 = (t.getMonth() + 1).toString();
                    if (x1.length < 2) {
                        x1 = `0${x1}`;
                    }
                    let x2 = t.getDate().toString();
                    if (x2.length < 2) {
                        x2 = `0${x2}`;
                    }
                    let data = `${t.getFullYear()}-${x1}-${x2}`;
                    let q = `INSERT INTO ofertus VALUES (null, '${obj.nazwa}', ${obj.creator}, '${obj.location}', ${obj.stawka}, '${obj.opisus}', '${obj.od}', '${obj.do}', '${obj.typus}', '${data}', -1, '[]',false, false, true,'${obj.picurl}')`;
                    connection.query(q, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "offer add", comment: "successful"}));
                      });
                    break;
                case "edit":
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
                    let qu = `UPDATE ofertus SET ${s.join(" , ")}  WHERE  id = ${tab[2]}`;
                    connection.query(qu, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "offer edit", comment: "successful", result: results[0]}));
                      });
                    break;
                case "delete":
                    let ta = JSON.parse(url.searchParams.get("parametry"));
                    let qz = `DELETE FROM ofertus WHERE  id = ${ta.id}`;
                    connection.query(qz, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "offer delete", comment: "successful", result: results[0]}));
                      });
                    break;
                default:
                    break;
            }
            break;
        case "user":
            let subactb = url.searchParams.get("subact");
            switch (subactb) {
                case "add":
                    let obj = JSON.parse(url.searchParams.get("parametry"));
                    let t = new Date();
                    let x1 = (t.getMonth() + 1).toString();
                    if (x1.length < 2) {
                        x1 = `0${x1}`;
                    }
                    let x2 = t.getDate().toString();
                    if (x2.length < 2) {
                        x2 = `0${x2}`;
                    }
                    let data = `${t.getFullYear()}-${x1}-${x2}`;
                    let q = `INSERT INTO userus VALUES (null, '${obj.pass}', '${obj.email}', '${obj.name}', ${obj.is_offer}, ${obj.is_search}, false, '${data}', '[]',false, false, '${data}', '${imglist[obj.picid]}')`;
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
                    let qu = `UPDATE userus SET ${s.join(" , ")}  WHERE  id = ${tab[2]}`;
                    connection.query(qu, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user mod", comment: "successful", result: results[0]}));
                      });
                    break;
                case "register":
                    console.log("zrobione");
                    res.end(JSON.stringify({message: "ZROBIONE"}));
                    break;
                case "get":
                    let objx = JSON.parse(url.searchParams.get("parametry"));
                    let u = `SELECT * FROM userus WHERE email = '${objx.mail}' AND pass = '${objx.pass}'`;
                    connection.query(u, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user select", comment: "successful", result: results}));
                      });
                      break;
                case "select":
                    //let obj2 = JSON.parse(url.searchParams.get("parametry"));
                    let uu = `SELECT * FROM userus`;
                    connection.query(uu, function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify({type: "user select", comment: "successful", result: results}));
                      });
                      break;
                case "delete":
                  let ta = JSON.parse(url.searchParams.get("parametry"));
                  let qz = `DELETE FROM ofertus WHERE  id = ${ta.id}`;
                  connection.query(qz, function (error, results, fields) {
                      if (error) throw error;
                      res.end(JSON.stringify({type: "user del", comment: "successful", result: results[0]}));
                    });
                  break;
                default:
                    res.end(JSON.stringify({message: "ERROR: no parameter given or invalid subact parameter"}));
                    break;
            }
            break;
        default:
            res.end(JSON.stringify({message: "ERROR: no parameter given or invalid action parameter"}));
            break;
    }
     
}).listen(8080);