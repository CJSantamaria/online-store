import express from "express";
import morgan from "morgan";

class Server{
    public app: express.Application
    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }
    
    config(){
        this.app.set('port', process.env.PORT || 8080)
        this.app.use(morgan('dev'))
    }
    routes(){
        this.app.get('/', (rec,res)=>{
            res.send('<h1>WELCOME!!!</h1>')
        })
    }
    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server listening on port ${this.app.get('port')}..`)
        })
    }
}
const server = new Server()
server.start()