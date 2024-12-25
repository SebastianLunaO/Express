const PORT = process.env.PORT
import path from 'path';
import {fileURLToPath} from 'url'
import express from 'express';
import posts from './routes/post.js';
import logger from './middleware/logger.js'
import error from './middleware/errorHandler.js'
import notfound from './middleware/notFound.js';
import cors from 'cors'

const app = express();

//Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
console.log(__filename);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(
    cors({
    origin: "http://127.0.0.1:8000",
}))

//setup static folder
app.use(express.static(path.join(__dirname,'public')));

app.use(logger)
app.use('/api/posts',posts);
app.use(notfound)
app.use(error)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}` )
}
)