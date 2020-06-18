const crud = {};
const { bodyParser } = require('../libs/bodyParser')
const database = [];
const url = require('url')

function getTaskHandle(res, url){
    if(url === "/"){
        res.writeHead(200, {"content-type": "text/plain"});
        res.write("<h1> Bienvendo al Home Page </h1>");
        res.end();
    }
    if(url === "/tasks"){
        res.writeHead(200, {"content-type": "application/json"});
        res.write(JSON.stringify(database));
        res.end();
    }
}

async function createTaskHandle(req, res){
    try {
        await bodyParser(req);
        req.body.id = database.length + 1
        database.push(req.body);
        res.writeHead(200, {"content-type": "application/json"});
        res.write(JSON.stringify(database));
        res.end();
    } catch (error) {
        res.writeHead(200, {"content-type": "text/plain"});
        res.write("Invalid");
        res.end();
    }
}

async function updateTaskHandle(req, res){
    try {
        let adr = req.url;
        let q = url.parse(adr, true);
        let qdata = q.query;

        if(Object.keys(qdata) == "id"){
            
            await bodyParser(req);
            database.forEach((dato, i) => {
                if(dato.id == qdata.id){
                    console.log('dato encontrado')
                    req.body.id = qdata.id
                    database[i] = req.body;

                    res.writeHead(200, {"content-type": "application/json"});
                    res.write(JSON.stringify(database));
                    res.end();
                }
            })
        }
    } catch (error) {
        res.writeHead(400, {"content-type": "text/plain"});
        res.write("Invalid");
        res.end();
    }
}


async function deleteTaskHandle(req, res){
    try {
        let adr = req.url;
        let q = url.parse(adr, true);
        let qdata = q.query;

        if(Object.keys(qdata) == "id"){
            database.forEach((data, i) => {
                if(data.id == qdata.id){
                    database.splice(i, 1)
                    res.writeHead(200, {"content-type": "application/json"});
                    res.write(JSON.stringify(database));
                    res.end();
                }
            })
        }
    } catch (error) {
        res.writeHead(200, {"content-type": "text/plain"});
        res.write("Invalid");
        res.end();
    }
}

crud.getTaskHandle = getTaskHandle;
crud.createTaskHandle = createTaskHandle;
crud.updateTaskHandle = updateTaskHandle;
crud.deleteTaskHandle = deleteTaskHandle;
module.exports = crud;