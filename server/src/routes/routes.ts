import Router from "express"
const router = Router()

const cardRouter = require("./cardRouter")
const topicRouter = require("./topicRouter")
const userRouter = require("./userRouter")


router.use('/user', userRouter)
router.use('/card', cardRouter)
router.use('/topic', topicRouter)

export default router