import express from "express";
import morgan from "morgan";
import productRoutes from "./routes/products.routes";
import cartsRoutes from "./routes/carts.routes";

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
        this.app.use('/api',productRoutes)
        this.app.use('/api',cartsRoutes)
    }
    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server listening on port ${this.app.get('port')}..`)
        })
    }
}
const server = new Server()
server.start()