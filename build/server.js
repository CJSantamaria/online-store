"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 8080);
        this.app.use((0, morgan_1.default)('dev'));
    }
    routes() {
        this.app.get('/', (rec, res) => {
            res.send('<h1>WELCOME!!!</h1>');
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}..`);
        });
    }
}
const server = new Server();
server.start();
