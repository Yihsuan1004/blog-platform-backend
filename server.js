const express = require('express');
const app = express();
const port = 5000;
const postRoutes = require('./routes/posts-route');

app.use('/api/posts',postRoutes);

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