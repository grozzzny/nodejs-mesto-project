import { Router } from 'express'
import { addLike, createCard, deleteCards, deleteLike, getCards } from '../controllers/cards'

const router = Router()

router.get('/', getCards)
router.post('/', createCard)
router.delete('/:cardId', deleteCards)
router.put('/:cardId/likes', addLike)
router.delete('/:cardId/likes', deleteLike)

export default router
