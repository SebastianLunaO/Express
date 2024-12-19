import express from 'express'
const router = express.Router()

let posts =[
    {id: 1, title: 'PostOne'},
    {id: 2, title: 'PostTwo'},
    {id: 3, title: 'PostThree'},
]


//using querys
router.get('/',(req,res,next)=> {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit>0){
        return res.status(200).json(posts.slice(0,limit));
    }
    res.status(200).json(posts);
    
});

//GET single post
router.get('/:id', (req,res,next)=>{
    const id = parseInt(req.params.id);
   const post = posts.find((post)=>post.id===id);

   if(!post){
    const error = new Error(`Post with id ${id} not found`)
    error.status=404;
    return next(error);
   }
    res.status(200).json(post);
   
});


// create new post
router.post('/',(req,res,next)=>{
    const newPosts ={
        id: posts.length + 1,
        title: req.body.title
    };

    if(!newPosts.title){
        const error = new Error(`Include a title`)
        error.status=404;
        return next(error);
    } 
    posts.push(newPosts)
    res.status(201).json(posts);
});

//update
router.put('/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id)

    if (!post){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    post.title = req.body.title;
    res.status(200).json(posts)
});

router.delete('/:id',(req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id)

    if (!post){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    posts= posts.filter((post)=>post.id !==id)
    res.status(200).json(posts);
});

export default router;
