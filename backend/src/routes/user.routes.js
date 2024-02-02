import { Router } from "express";
import { logOut, loginUser, refreshAccessToken, registerUser, updateDetail } from "../controller/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import verifyLoggedIn from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/register-user').post(upload.single('avatar'),registerUser);
router.route('/log-in').post(loginUser)

router.route('/logout').get(verifyLoggedIn,logOut);
router.route('/update-detail').patch(verifyLoggedIn,upload.single('avatar'),updateDetail);
router.route('/refresh-accessToken').get(verifyLoggedIn,refreshAccessToken);
export default router