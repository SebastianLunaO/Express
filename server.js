const PORT = process.env.PORT
const path = require('path')
const express = require('express');

const app = express();

//setup static folder
//app.use(express.static(path.join(__dirname,'public')));
let posts =[
    {id: 1, title: 'PostOne'},
    {id: 2, title: 'PostTwo'},
    {id: 3, title: 'PostThree'},
]

//using querys
app.get('/api/posts', (req,res)=> {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit>0){
        return res.status(200).json(posts.slice(0,limit));
    }
    res.status(200).json(posts);
    
});

//GET single post
app.get('/api/posts/:id', (req,res)=>{
    const id = parseInt(req.params.id);
   const post = posts.find((post)=>post.id===id)

   if(!post){
    return res.status(404).json({msg :`Post with id ${id} not found` })
   }
    res.status(200).json(post)
   
})



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}` )
}
)