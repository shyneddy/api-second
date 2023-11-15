import express from 'express';
import { route } from '././src/routes/index.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import session from 'express-session';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import RedisStore from "connect-redis"
import { createClient } from "redis"
import jwt from 'jsonwebtoken';

const app = express()
app.use(cors({
    origin: 'http://192.168.1.5:3000',
    credentials: true
}));
const secretKey = 'your_secret_key';
app.use(cors());

let redisClient = createClient()
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
})


// app.use(session({
//     secret: 'Sh1nEddy',
//     store: redisStore,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))

app.use(session({
    secret: 'Sh1nEddy',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false
    } // Nếu bạn sử dụng HTTPS, nếu không, hãy để secure là false
}));

app.use(express.static('uploads'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const upload = multer({ dest: 'uploads/' })

// app.post('/product/admin-addproduct', upload.single("selectedFileAvatar"), function (req, res, next) {
//     // Xử lý tệp tin đã tải lên
//     // req.file chứa thông tin về tệp tin đã tải lên
//     console.log(req.body);
//     res.status(200).json({ message: 'ok' })
//     // req.body chứa thông tin về các trường dữ liệu khác (nếu có)
// });


route(app);

app.listen(3001, function () {
    console.log('Server Started...')
})
