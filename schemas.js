const Joi = require('joi');
module.exports.ticketSchema = Joi.object({
    swrNum: Joi.string(),
    dateSubmitted: Joi.date()
        .default(Date.now())
        .required(),
    originator: Joi.string()
        .required(),
    captured: Joi.string()
        .required(),
    capturedSlot: Joi
        .when('captured', { is: 'SavedIC#', then: Joi.number().max(350).min(1).required() })
        .when('captured', { is: 'Snapped', then: Joi.number().max(5).min(1).required() })
    ,
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
    assignedTo: Joi
        .when('status', { not: 'Unassigned', then: Joi.string().required() }),
    status: Joi.string().default('Unassigned'),
    deferredID: Joi.string().allow(''),
    workPerformed: Joi.string()
        .when('status', { is: 'Closed', then: Joi.string().required() })
        .when('status', { not: 'Closed', then: Joi.string().allow('') },),
    validatedBy: Joi.string(),
        // .when('status', {
        //     is: 'Closed',
        //     then: Joi.string().required()
        // }),
    dateClosed: Joi.date()
        .when('status', {
            is: 'Closed', then: Joi.date().required()
        }),
}).required()
    .options({ allowUnknown: true });

    
    module.exports.userSchema = Joi.object({
        email: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    }).required()