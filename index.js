const http = require('http');
const server = http.createServer(requestHandler);

function requestHandler(request, response){
    const podaciOdKlijenta = {
        method: request.method,
        link: request.url
    };

    const podaciOdKlijentaJson = JSON.stringify(podaciOdKlijenta);

    response.writeHead(200, {
        'Content-type': 'application/json; charset=utf-8'
    });

    response.write(podaciOdKlijentaJson);
    response.end();
}

server.listen(443);