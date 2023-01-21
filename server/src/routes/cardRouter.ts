import Router from "express"
const router = Router()
const cardController = require("../controllers/cardController")


router.get('/:id', cardController.get)
router.get('/', cardController.getAll)
router.post('/', cardController.create)
router.put('/', cardController.update)
router.delete('/', cardController.delete)

module.exports = router 