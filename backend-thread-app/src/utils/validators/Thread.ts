import * as Joi from 'joi'

export const createThreadSchema = Joi.object().keys({
  content: Joi.string(),
  image: Joi.string().required(),
  user: Joi.number()
})

export const updateThreadSchema = Joi.object().keys({
  content: Joi.string(),
  image: Joi.string()
})