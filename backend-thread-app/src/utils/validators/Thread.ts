import * as Joi from 'joi'

export const createThreadSchema = Joi.object({
  content: Joi.string(),
  image: Joi.string().required()
})

export const updateThreadSchema = Joi.object({
  content: Joi.string(),
  image: Joi.string()
})