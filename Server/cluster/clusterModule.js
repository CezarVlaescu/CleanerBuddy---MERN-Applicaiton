// Cluster Module - NodeJS is single threaded, so will use only a single core of your CPU
//                - if the code is CPU intensive, the app might end up with performance issues
//                - cluster module allow us to create child processes that share the same server port as the parent process
//                - we can take advantage of all the cores of the CPU
//                - the worker_threads module allow us to run multiple applications threads with a single NodeJS instance
//                - code executed in a worker thread runs in a separate child process preventing it from blocking our main app
//                - pm2 is a powerfull manager process that provides several features beyond the built-in cluster modules (automatic restarts on crash, zero downtime reloads)
// ----------------------------------------------

const http = require('http');

const server = http.createServer((req, res) => { // create a server using http, (req, res) => callback function for each upcoming request, 
    //req an object that represents the incoming request and contains infos (URL, header, method), 
    //res an object that represents the response that will be sent back to the client
    if(req.url === '/') {
        res.writeHead(200, {"content-type": "text/html"}); // checks if the request URL is '/', set the HTTP status code to 200, and sets the response header to specify the content type
        res.end("Home page") // sends the response to the client and close the connection
    }
    else if(req.url === "/slow-page"){
        res.writeHead(200, {"content-type": "text/html"});
        for(let i = 0; i < 900000; i++) res.write("Slow page")
        res.end(); // send the response after the loop ended
    }
})

server.listen(5000, () => {
    console.log(`Server listening to port 5000`);
})

// -----------------------------------------------

const cluster = require('cluster'); // cluster
const os = require('os'); // operating system

if(cluster.isMaster){ // if the current process is the master process
    const cpus = os.cpus().length; // get the number of cpus
    console.log(`Forking for ${cpus} CPUs`);
    console.log(`Master process ${process.pid} is running`);

    for(let i = 0; i<cpus; i++) cluster.fork(); // fork the process for each CPU
}
else{
    console.log("Worker process" + process.pid);
    const server = http.createServer((req, res) => {
        // same as bellow
    })
}

// -----------------------------------------------

const { Worker } = require("worker_threads");

const serv = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("Home Page");
  } else if (req.url === "/slow-page") {
    // Create a new worker
    const worker = new Worker("./worker-thread.js");
    worker.on("message", (j) => {
      res.writeHead(200, { "content-type": "text/html" });

      res.end("slow page" + j); // Send the response after the loop completes
    });
  }
});

server.listen(5000, () => {
  console.log("Server listening on port : 8000....");
});


const { parentPort } = require("worker_threads");

let j = 0;
for(let i = 0; i < 1000000; i++){
    res.write("slow page");
    j++;
}

parentPort.postMessage(j);
