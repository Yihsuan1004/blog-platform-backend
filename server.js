const express = require('express');
const app = express();
const port = 5000;
const postRoutes = require('./routes/posts-route');

app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}); 