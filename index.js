const http = require('http');
const crud = require('./src/model/crud')

const server = http.createServer((request, response) => {
    const { url, method } = request;

    //visualizando url recibida y el metodo
    console.log(`URL: ${url} --- METHOD: ${method}`)

    switch(method){
        case "GET":
            crud.getTaskHandle(response, url);
            break;

        case "POST":
            crud.createTaskHandle(request, response);
            break;
        
        case "PUT":
            crud.updateTaskHandle(request, response);
            break;

        case "DELETE":
            crud.deleteTaskHandle(request, response);
            break;

        default:
            response.writeHead(400, {"content-type": "text/plain"});
            response.write("Invalid request");
            response.end();
    }

})

server.listen(5000, () => {
    console.log('Ejecutandose en el puerto 5000')
})