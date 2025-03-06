import { Router } from 'express'
import { addLike, createCard, deleteCards, deleteLike, getCards } from '../controllers/cards'
import { cardIdValidation, createCardValidation } from '../middlewares/validations'

const router = Router()

router.get('/', getCards)
router.post('/', createCardValidation(), createCard)
router.delete('/:cardId', cardIdValidation(), deleteCards)
router.put('/:cardId/likes', cardIdValidation(), addLike)
router.delete('/:cardId/likes', cardIdValidation(), deleteLike)

export default router
