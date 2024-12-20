

let posts =[
    {id: 1, title: 'PostOne'},
    {id: 2, title: 'PostTwo'},
    {id: 3, title: 'PostThree'},
]

// @desc Get all Posts --- GET /api/posts
export const getPosts = (req,res,next)=> {
        const limit = parseInt(req.query.limit);
        if (!isNaN(limit) && limit>0){
            return res.status(200).json(posts.slice(0,limit));
        }
        res.status(200).json(posts);
        
    }

// @desc Get single Posts --- GET /api/posts

export const getPost = (req,res,next)=>{
    const id = parseInt(req.params.id);
   const post = posts.find((post)=>post.id===id);

   if(!post){
    const error = new Error(`Post with id ${id} not found`)
    error.status=404;
    return next(error);
   }
    res.status(200).json(post);
   
}


// @desc Create a Post --- POST /api/posts
export const createPost = (req,res,next)=>{
    const newPosts ={
        id: posts.length + 1,
        title: req.body.title
    };

    if(!newPosts.title){
        const error = new Error(`Include a title`)
        error.status=401;
        return next(error);
    } 
    posts.push(newPosts)
    res.status(201).json(posts);
}

// @desc Update a Post --- PUT /api/posts
export const updatePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id)

    if (!post){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    post.title = req.body.title;
    res.status(200).json(posts)
}

// @desc Delete a Post --- DELETE /api/posts
export const removePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id===id)

    if (!post){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    posts= posts.filter((post)=>post.id !==id)
    res.status(200).json(posts);
}