import { Router } from 'express'
import { getMe, getUser, getUsers, updateAvatar, updateUser } from '../controllers/users'
import { updateAvatarValidation, updateUserValidation, userIdValidation } from '../middlewares/validations'

const router = Router()

router.get('/', getUsers)
router.get('/me', getMe)
router.get('/:userId', userIdValidation(), getUser)
router.patch('/me', updateUserValidation(), updateUser)
router.patch('/me/avatar', updateAvatarValidation(), updateAvatar)

export default router
