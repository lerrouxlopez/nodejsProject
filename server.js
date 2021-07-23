const http = require("http");
const PORT = process.env.PORT || 8080;
const Interface = require("./controller");
const { getReqData } = require("./utils");
const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/api/interfaces" && req.method === "GET") {
        const intf = await new Interface().getInterfaces();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(intf));
    }
    // get single interface
    else if (req.url.match(/\/api\/interface\/([0-9]+)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            const intf = await new Interface().getInterface(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(intf));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
    // update alias
    else if (req.url.match(/\/api\/updateinterface\/([0-9]+)\/(.+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const alias = req.url.split("/")[4];
            let updated_intf = await new Interface().updateInterface(id,alias);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updated_intf));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
    //Delete
    else if (req.url.match(/\/api\/deleteinterface\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[3];
            let message = await new Interface().deleteInterface(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message }));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});