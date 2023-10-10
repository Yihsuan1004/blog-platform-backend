const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const users = require('./routes/api/users-route');
const auth = require('./routes/api/auth-route');
const posts = require('./routes/api/posts-route');
const images = require('./routes/api/images-route');

//Connect Database
connectDB();

const corsOptions = {
    origin: 'http://localhost:3000', // 設定允許的來源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 設定允許的 HTTP 方法
    optionsSuccessStatus: 204,
  };

app.use(cors(corsOptions));

//Init Middleware
app.use(express.json({ extended: false }));

app.use(bodyParser.json());

// Serve static uploads
// 告訴 Express 從文件系統中提供靜態文件。在這種情況下，當你使用 express.static('uploads')，你正在告訴 Express 提供在 uploads 目錄中的靜態文件。
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/images', images);


app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.setHeader('Content-Type', 'application/json');
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message  || 'Internal Server Error'
        }
    });
});

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

