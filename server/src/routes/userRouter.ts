import Router from "express"
const router = Router()
const userController = require("../controllers/userController")

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', userController.auth)


module.exports = router