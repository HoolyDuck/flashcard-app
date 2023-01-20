import Router from "express"
const router = Router()


router.post('/register')
router.post('/login')
router.get('/auth', (req, res) => {
    res.json({message: 'vac'})
})


module.exports = router