# Blog Platform Backend Day5

## Overview
1. [Blog Post Data API Planning](#1-blog-post-data-api-planning)
2. [Development of the API for Getting Individual Blog Post Data](#2-development-of-the-api-for-getting-individual-blog-post-data)
3. [Error Handling](#3-error-handling)


## 1.Article Data API Planning

|route | verb | description| 
|----|-----|----|
|/posts| `POST`| Create New Post
|/posts| `GET` | Get All Posts
|/posts/:postId| `PUT`| Update Post
|/posts/:postId | `DELETE` | Delete Post
|/posts/:postId | `GET` | Get Single Post

```javascript
//posts-routes.js
const express = require('express');
const router = express.Router();

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
    console.log('GET Request');
    res.json({message: 'It works!'});
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
```
🔸 Today we only discusses the logic for the API to retrieve blog posts; the other APIs will be covered in later sections.



## 2. Development of the API for Getting Individual Blog Post Data
From the program above, you can see that the actions for editing, deleting, and retrieving all include a `postId`, which is the unique identifier (UID) for the blog post, similar to how a national ID serves as the UID for citizens, which is not duplicated with others.

Now we need to modify the handler function for retrieving information to fetch the blog post data through the postId.

### 🛠️ Create Mock Database
Since there's no database connection at the moment, we'll create some mock data to simulate the database interactions.


```javascript
//posts-routes.js
const MOCK_POSTS = [
    {
        id: 'p1',
        title: 'Post1',
        tags:['chatGPT']
        content:'ChatGPT',
    },
    {
        id: 'p2',
        title: 'Post2',
        tags:['frontend']
        content:'Micro frontend',
        
    }
]
...
```

### ⚙️ Change Return Content
Next, we change the return content of the get request; by using the following method, we can obtain the router parameters within the URL.
```javascript
//posts-routes.js

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
    // Return the found blog post data
    res.json({post}); // Shorthand for {post: post}
});

```
🔍For how to use get parameters, please refer to: [Get parameter in Express.js](https://www.geeksforgeeks.org/how-to-use-get-parameter-in-express-js/)

✨Now, when we enter https://localhost:5000/api/post/p1 in the browser, we can see the retrieved data.


## 3. Error Handling
We've just successfully retrieved the data, but what happens when we enter an ID that does not exist?

You will see that it will return a `null` value, which means `it doesn't return anything`. <br>However, such an ambiguous response could leave the client unsure of where the problem occurred.

Therefore, we need to add error handling to the `Get api/posts/:postId`.

### 🛠️ Add Error Handling
```javascript
//posts-routes.js

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
        return res.status(404).json({ message: 'The blog post with this ID does not exist.'})
    }

    // Return the found blog post data
    res.json({post}); // Shorthand for {post: post}
});
```
Now, if we navigate to https://localhost:5000/api/post/p3 (a non-existent post), we will see an error message.

### Add error handling middleware
By using error handling middleware, we can centralize the processing and management of errors, which enhances the maintainability of the program. <br>It eliminates the need to handle the same error conditions in every route handler (for example, you might otherwise need to add `console.error()` in every route to track error messages).

🛠️ In `server.js`, add middleware
```javascript
//server.js

const express = require('express');
const app = express();
const port = 5000;
const postRoutes = require('./routes/posts-routes');

app.use('/api/posts',postRoutes);


//Error Handling Middleware
app.use((err, req, res, next) => {
    //Output the error stack trace to the console for easier debugging.
    console.error(err.stack);
    
    res.status(err.status || 500);
    
    res.json({
        error: {
            message: err.message  || 'Internal Server Error'
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}); 
```

🛠️ And then we'll go back to adjust `posts-routes.js`.

```javascript
//posts-routes.js

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

```
Although it displays the same error message, this approach allows for cleaner and more maintainable error handling.

💪 It simplifies debugging, enhances application stability, and improves the developer experience by decoupling error logic from business logic.

## Directory Structure

```
Blog-platform-backend

|-- routes
|    |-- posts.routes.js
|-- package.json
|-- package-lock.json
|-- server.js
|-- README.md
```


## License

MIT
