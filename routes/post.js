import express from 'express'
const router = express.Router()

let posts =[
    {id: 1, title: 'PostOne'},
    {id: 2, title: 'PostTwo'},
    {id: 3, title: 'PostThree'},
]
//using querys
router.get('/', (req,res)=> {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit>0){
        return res.status(200).json(posts.slice(0,limit));
    }
    res.status(200).json(posts);
    
});

//GET single post
router.get('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
   const post = posts.find((post)=>post.id===id);

   if(!post){
    return res.status(404).json({msg :`Post with id ${id} not found` })
   }
    res.status(200).json(post);
   
});


// create new post
router.post('/',(req,res)=>{
    const newPosts ={
        id: posts.length + 1,
        title: req.body.title
    };

    if(!newPosts.title){
        return res.status(400).json({msg: 'please include a title'});
    } 
    posts.push(newPosts)
    res.status(201).json(posts);
});

//update
router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id)

    if (!post){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    post.title = req.body.title;
    res.status(200).json(posts)
});

router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id)

    if (!post){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    posts= posts.filter((post)=>post.id !==id)
    res.status(200).json(posts);
});

export default router;
