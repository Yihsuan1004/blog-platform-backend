# Blog Platform Backend

## Overview

This repository contains the backend implementation of a blogging platform. It's built using Node.js with Express.js as the web framework and MongoDB as the database. Mongoose is used for object data modeling (ODM) to manage and query the MongoDB instance.

## Prerequisites

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/zh-tw/)
- [MongoDB](https://www.mongodb.com/zh-cn)
- npm or yarn (whichever package manager you prefer)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository_url>
cd <repository_directory_name>
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Start the server

Using npm:

```bash
npm start
```
The server will start running on the specified port or default to `5200`.

## API Endpoints

### Auth
1. **User Registration**

    - Endpoint: `/api/auth/register`
    - Method: `POST`

2. **User Login**

    - Endpoint: `/api/auth/login`
    - Method: `POST`

### Users
1. **Get User Profile**

    - Endpoint: `/api/users/:userId/profile`
    - Method: `GET`

2. **Modify User Profile**

    - Endpoint: `/api/users/:userId/profile`
    - Method: `PUT`
3. **User's Posts**

    - Endpoint: `/api/users/:userId/posts`
    - Method: `GET`

### Posts
1. **Create Blog Post**

    - Endpoint: `/api/posts`
    - Method: `POST`

2. **Get All Posts**

    - Endpoint: `/api/posts`
    - Method: `GET`

3. **Get All Posts By Tags**

    - Endpoint: `/api/posts/byTag`
    - Method: `GET`
      
4. **Get Single Post**

    - Endpoint: `/api/posts/:postId`
    - Method: `GET`

5. **Modify Blog Post**

    - Endpoint: `/api/posts/:postId`
    - Method: `PUT`

6. **Delete Blog Post**

    - Endpoint: `/api/posts/:postId`
    - Method: `DELETE`


### Images
1. **Upload Image**
    - Endpoint: `/api/images/upload`
    - Method: `POST`

## Directory Structure

```
.
|-- config
|   |-- db.js
|   |-- default.json
|-- controllers
|   |-- auth.controller.js
|   |-- images.controller.js
|   |-- posts.controller.js
|   |-- users.controller.js
|-- middleware
|   |-- auth.js
|-- models
|   |-- http-error.js
|   |-- User.js
|   |-- Post.js
|-- routes
|   |-- api
|       |-- auth.routes.js
|       |-- posts.routes.js
|       |-- images.routes.js
|       |-- users.routes.js
|-- package.json
|-- package-lock.json
|-- server.js
|-- README.md
```

## License

MIT
