const http = require("http");
const fs = require("fs");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");
const PORT = 9000;

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    // Serve the index.html file
    fs.readFile(path.join(__dirname, "views", "index.html"), (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading page");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.url.startsWith("/tasks")) {
    taskRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});