import app from './server'
import {Server} from "http";

const PORT = process.env.PORT || 21500;
const server = new Server(app);
server.listen(PORT);

console.log(`Server is running ${PORT}`)