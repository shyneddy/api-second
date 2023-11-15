import { Router } from 'express';
const router = Router();
import userController from '../controllers/userController.js';
import { isAdmin, isLogin } from '../middleware/auth.js';
// import {initPassportLocal, Dadangnhap} from '../config/passport.js';

// import { newsController } from '../app/controllers/NewsControllers';



router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/updateinfo', isLogin, userController.updateInfo);
router.post('/updatepassword', isLogin, userController.updatePassword);


router.get('/islogin', isLogin, userController.islogin)
router.get('/sigout', userController.sigout);
router.get('/getinfo', isLogin, userController.getInfo);


//admin

router.post('/admin-login', userController.adminLogin);




// console.log(typeof(newsController.index));// module.exports = router;

export default router;