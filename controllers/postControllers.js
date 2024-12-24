import {getNotes,getNote,createNote,rmPost} from '../utils/utils.js'

let posts =[
    {id: 1, title: 'PostOne'},
    {id: 2, title: 'PostTwo'},
    {id: 3, title: 'PostThree'},
]

// @desc Get all Posts --- GET /api/posts
export const getPosts = async (req,res,next)=> {
        const limit = parseInt(req.query.limit);

        if (!isNaN(limit) && limit>0 && limit<51){
            const result = await getNotes(limit)
            return res.status(200).send(result);
        }
        const result = await getNotes()
        res.status(200).send(result);
        
    }

// @desc Get single Posts --- GET /api/posts

export const getPost = async (req,res,next)=>{
    const id = parseInt(req.params.id);
    const result = await getNote(id)

   if(result.length === 0){
    const error = new Error(`Post with id ${id} not found`)
    error.status=404;
    return next(error);
   }
    res.status(200).send(result);
   
}


// @desc Create a Post --- POST /api/posts
export const createPost = async (req,res,next)=>{
    const title = req.body.title
    
    if(!title){
        const error = new Error(`Include a title`)
        error.status=404;
        return next(error);
    } 
    const result = await createNote(title)
    res.status(201).send(result);
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