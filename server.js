const PORT = process.env.PORT
import path from 'path';
import express from 'express';
import posts from './routes/post.js';

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//setup static folder
//app.use(express.static(path.join(__dirname,'public')));

app.use('/api/posts',posts);




app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}` )
}
)