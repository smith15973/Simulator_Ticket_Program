// const Joi = require('joi');
// module.exports.ticketSchema = Joi.object({
//     ticket: Joi.object({
//         swrNum: Joi.string(),
//         dateSubmitted: Joi.date().required(),
//         originator: Joi.string().required(),
//         captured: Joi.string().required(),
//         capturedSlot: Joi.number().min(0).max(350),
//         title: Joi.string().required(),
//         description: Joi.array().required(),
//         impactedTraining: Joi.string().required(),
//         priority: Joi.number().required(),
//         system: Joi.string().required(),
//         assignedTo: Joi.string(),
//         status: Joi.string().required(),
//         deferredID: Joi.string().required(),
//         workPerformed: Joi.array(),
//         validatedBy: Joi.string(),
//         dateClosed: Joi.date()
//     }
//     ).required()
// })