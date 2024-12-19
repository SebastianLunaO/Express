const PORT = process.env.PORT
const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send({message: "hello"});
})

app.get('/second',(req,res)=>{
    
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}` )
}
)