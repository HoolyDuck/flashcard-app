import Router from "express"
const router = Router()
const userController = require("../controllers/userController")
import { auth } from "../middleware/authMiddleware"


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', auth , userController.auth)


module.exports = router