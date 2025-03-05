import { Router } from 'express'
import { addLike, createCard, deleteCards, deleteLike, getCards } from '../controllers/cards'
import { createCardValidation } from '../middlewares/validations'

const router = Router()

router.get('/', getCards)
router.post('/', createCardValidation(), createCard)
router.delete('/:cardId', deleteCards)
router.put('/:cardId/likes', addLike)
router.delete('/:cardId/likes', deleteLike)

export default router
