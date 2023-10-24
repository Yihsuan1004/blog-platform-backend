# Blog Platform Backend Day4

## Overview
1. Init a project 
2. Install Express.js
3. Set up basic routing (Route)
4. Use express.Router


## 1. Init a project 
### 🛠️Initialize the Git repository
Because the project requires version control, we start by initializing git.<br>
First, create a `.gitignore` file in the project (for files that you don't want git to track). Inside the `.gitignore` file, add `node_modules/`.
Next, initialize git by typing `git init`.

```shell
git init
```
Now, you can start tracking the existing project content.


### 🛠️Initialize Node.js
```shell
npm init
```
Then, you'll see a series of configuration questions appear in the terminal.

At this point, you will see that a `package.json` file has been generated in the folder, which is used to manage packages.

## 2. Install Express.js
We're going to install Express and the packages needed for development.
```
npm install --save express body-parser
npm install --save-dev nodemon
```

- [nodemon](https://www.npmjs.com/package/nodemon) : When you start an application using nodemon, it watches all .js files for changes. If any file changes, nodemon will automatically restart the application.

- [body-parser](https://www.npmjs.com/package/body-parser) : Used for parsing data in the HTTP request body. When a client sends a POST or PUT request to the server, the request body might contain important data (for example, user information). body-parser helps the server to parse these data, making it usable in Express.

### ⚙️ Setting Up the Command to Start the Server
Create a server.js within the project. Next, we'll set up the command to start the project in the package.json.
Under "scripts", input "start": "nodemon server.js".

## 3. Set up basic routing (Route)
First, let's briefly introduce what routing is, according to the official [Express](https://expressjs.com/en/starter/basic-routing.html#basic-routing) documentation:

> Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on). Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:
```javascript
app.METHOD(PATH, HANDLER)
```

Where:
- `app` is an instance of express.
- `METHOD` is an HTTP request method, in lowercase.
- `PATH` is a path on the server.
- `HANDLER` is the function executed when the route is matched.

Back to the project, place the following code inside `server.js` to start the project.

```javascript
//server.js
const express = require('express');
const app = express();
const port = 5000;

// When a GET request is made to the root route (/) (the homepage of the application), it will respond with 'hello world'.
app.get('/', function(req, res) {
  res.send('hello world');
});

// Bind and listen for connections on the specified host and port.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}); 

```

### 🛠️ Run server
```bash
npm run start
```
At this point, if you enter http://localhost:5000 in the browser, you can see the message.


## 4. Use express.Router
>A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.<br>
>A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.  - [Express Router](https://expressjs.com/en/5x/api.html#router)

When the number of our APIs grows, it's impractical to put everything in the `server.js` file, as it would become hard to maintain. <br>
Therefore, we need to use `express.Router` to manage different routes separately.

First, create a `routes` folder in the current project, and then create a file named `posts-routes.js` inside it.
(Later on, we will place post-related APIs in this file, but for now, just insert some simple code to test if it works successfully.)

```
Blog-platform-backend

|-- routes
|    |-- posts.routes.js
```

```javascript
//posts-routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    console.log('GET Request');
    res.json({message: 'It works!'});
})

module.exports =  router;
```
### 🛠️ Import `postRoutes` in `server.js`.

```javascript
//server.js
const express = require('express');
const app = express();
const port = 5000;
const postRoutes = require('./routes/posts-routes');

app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}); 
```

🤟 Finally, you can see the response content at http://localhost:5000/api/posts.


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
