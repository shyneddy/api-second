import connection from '../models/connectDatabase.js'
import jwt from 'jsonwebtoken';
const secretKey = 'your_secret_key';

function isLogin(req, res, next) {

    // Lấy token từ header hoặc query parameter hoặc cookie
    const token = req.headers.authorization;

    if (token) {
        console.log('có token');
        // Xác thực và giải mã token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Token không hợp lệ
                // res.sendStatus(401);
                return res.status(401).json({ message: 'Chưa đăng nhập', isLogin: false });

            } else {
                // Token hợp lệ, truy cập tài nguyên và sử dụng thông tin người dùng
                const userjwt = decoded;
                req.userjwt = userjwt;
                // console.log('jwt: ', userjwt.username);
                // res.send(`Welcome to the dashboard, ${userjwt.username}!`);
            }
        });
    }


    // if (!req.session.user_id) {
    //     console.log('chua đăng nhập');
    //     return res.status(401).json({ message: 'Chưa đăng nhập', isLogin: false });
    // }

    next();

}

function isAdmin(req, res, next) {


    const token = req.headers.authorization;

    if (token) {
        console.log('có token');
        // Xác thực và giải mã token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Token không hợp lệ
                // res.sendStatus(401);
                return res.status(401).json({ message: 'Chưa đăng nhập', isLogin: false });

            } else {
                // Token hợp lệ, truy cập tài nguyên và sử dụng thông tin người dùng
                const userjwt = decoded;
                req.userjwt = userjwt;
                const query = 'SELECT `full_name`, `role` FROM `users` WHERE id = ? and role = true'
                connection.query(query, [userjwt.user_id], (error, results) => {
                    if (error) {
                        console.error('Lỗi truy vấn cơ sở dữ liệu:', error);
                        return res.status(500).json({ message: 'Lỗi máy chủ' });
                    }

                    if (results.length === 0) {
                        return res.status(401).json({ message: 'Không phải admin', isAdmin: false });
                    }

                    let user = results[0];
                    req.userAdmin = user;

                    next();
                });
            }
        });
    } else {
        return res.status(401).json({ message: 'Chưa đăng nhập', isAdmin: false });

    }


    // if (!req.session.user_id) {
    //     console.log('chua đăng nhập');
    //     return res.status(401).json({ message: 'Chưa đăng nhập', isAdmin: false });
    // }

    // const query = 'SELECT `full_name`, `role` FROM `users` WHERE id = ? and role = true'
    // connection.query(query, [req.session.user_id], (error, results) => {
    //     if (error) {
    //         console.error('Lỗi truy vấn cơ sở dữ liệu:', error);
    //         return res.status(500).json({ message: 'Lỗi máy chủ' });
    //     }

    //     if (results.length === 0) {
    //         return res.status(401).json({ message: 'Không phải admin', isAdmin: false });
    //     }

    //     let user = results[0];
    //     req.userAdmin = user;

    //     next();
    // });


}

export { isLogin, isAdmin };