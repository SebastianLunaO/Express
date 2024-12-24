import {getNotes,getNote,createNote,rmPost,updateNote,existID} from '../utils/utils.js'


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
export const updatePost = async (req,res,next)=>{
    const id = parseInt(req.params.id);
    const title = req.body.title;
    const result = await updateNote(title,id)
    if (result.length === 0){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    res.status(200).send(result)
}

// @desc Delete a Post --- DELETE /api/posts
export const removePost = async (req,res,next)=>{
    const id = req.params.id
    const exist = await existID(id)
   
    if (exist === 0){
        return res.status(404).json({mgs: `Post with id ${id} not found`})
    }
    const result = rmPost(id)
    res.status(200).json({mgs: `Post with id ${id} deleted`});
}