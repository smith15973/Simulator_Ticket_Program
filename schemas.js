const Joi = require('joi');
module.exports.ticketSchema = Joi.object({
    swrNum: Joi.string(),
    dateSubmitted: Joi.date()
        .required(),
    originator: Joi.string()
        .required(),
    captured: Joi.string()
        .required(),
    capturedSlot: Joi.number()
        .min(0)
        .max(350)
        .allow(''),
    title: Joi.string()
        .required(),
    description: Joi.string()
        .required(),
    impactedTraining: Joi.string()
        .required(),
    priority: Joi.number()
        .required(),
    system: Joi.string()
        .required(),
    assignedTo: Joi.string(),
    status: Joi.string(),
    deferredID: Joi.string(),
    workPerformed: Joi.string(),
    validatedBy: Joi.string(),
    dateClosed: Joi.date()
})
    .required()
    .options({ allowUnknown: true });