import Router from "express"
const router = Router()
const topicController = require("../controllers/topicController")


router.get('/:id', topicController.get)
router.get('/', topicController.getAll)
router.post('/', topicController.create)
router.put('/', topicController.update)
router.delete('/', topicController.delete)


module.exports = router