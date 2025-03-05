import { Joi, celebrate } from 'celebrate'
import { IUser } from '../models/user'
import { PatternLink } from '../constants'
import { ICard } from '../models/card'

export const signUpValidation = () =>
  celebrate({
    body: Joi.object<IUser>().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(PatternLink),
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
  })

export const signInValidation = () =>
  celebrate({
    body: Joi.object<IUser>().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
  })

export const createCardValidation = () =>
  celebrate({
    body: Joi.object<ICard>().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(PatternLink)
    })
  })

export const updateUserValidation = () =>
  celebrate({
    body: Joi.object<IUser>().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200)
    })
  })

export const updateAvatarValidation = () =>
  celebrate({
    body: Joi.object<IUser>().keys({
      avatar: Joi.string().pattern(PatternLink)
    })
  })
