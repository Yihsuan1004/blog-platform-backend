const express = require('express');
const router = express.Router();

const MOCK_POSTS = [
    {
        id: 'p1',
        title: '文章1',
        tags:['chatGPT'],
        content:'ChatGPT',
    },
    {
        id: 'p2',
        title: '文章2',
        tags:['frontend'],
        content:'Micro frontend',
        
    }
]


//@router POST /api/posts
//@desc Create New Post
//@access Public
router.post("/", (req,res,next)=>{
    res.json({message: 'It works!'});
});

//@router  GET api/posts
//@desc Get All Posts
//@access Public
router.get("/",(req,res,next)=>{
    console.log('GET Request');
    res.json({message: 'It works!'});
});

//@router  GET api/posts/:postId
//@desc Get Single Post
//@access Public
router.get("/:postId",(req,res,next)=>{
    // Get URL parameters through req.params
    const postId = req.params.postId;

    // Use postId to find the corresponding article content in our mock data
    const post = MOCK_POSTS.find(post => {
        return post.id === postId;
    });

    //If the post does not exist in the mock data (database)
    if(!post){
        const error = new Error('The blog post with this ID does not exist.');
        error.status = 404;
        // Pass the error to the next error handling middleware
        return next(error);
    }

    // Return the found blog post data
    res.json({post}); // Shorthand for {post: post}
});



//@router PUT /api/posts/:postId
//@desc Update Post
//@access Public
router.put("/:postId", (req,res,next)=>{
    res.json({message: 'It works!'});
});

//@router DELETE api/posts
//@desc Delete Post
//@access Public*/
router.delete("/:postId", (req,res,next)=>{
    res.json({message: 'It works!'});
});

module.exports =  router;
