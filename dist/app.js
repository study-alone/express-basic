"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats/cats.route");
var Server = (function () {
    function Server(app, port) {
        this.app = app;
        this.port = port;
        this.app = app;
        this.port = port;
    }
    Server.prototype.setRoute = function () {
        this.app.get('/', function (req, res) {
            res.send({
                message: 'hello!!',
            });
        });
        this.app.use(cats_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        this.app.use(function (req, res, next) {
            console.log(req.rawHeaders[1]);
            next();
        });
        this.app.use(express.json());
        this.setRoute();
        this.app.use(function (req, res, next) {
            console.log('This is error middleware');
            res.send({ error: '404 not founde error' });
        });
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.setMiddleware();
        this.app.listen(this.port, function () {
            console.log("Example app listening at http://localhost:".concat(_this.port));
        });
    };
    return Server;
}());
function run() {
    var server = new Server(express(), 8000);
    server.listen();
}
run();
//# sourceMappingURL=app.js.map