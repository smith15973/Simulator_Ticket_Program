const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    swrNum: {
        type: String,
    },
    dateSubmitted: {
        type: Date,
        required: true
    },
    originator: {
        type: String,
        //required: true
    },
    captured: {
        type: String,
        //required: true,
        enum: ['SavedIC#', 'Snapped', 'Not Captured']
    },
    capturedSlot: {
        type: Number,
        max: 420,
        min: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: true
    },
    attachments: [
        {
            url: String,
            fileName: String,
            originalName: String,
        }
    ],
    impactedTraining: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true,
    },
    system: {
        type: String,
        required: true,
        enum: ['Software', 'Hardware'],
    },
    assignedTo: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['Unassigned', 'In Progress', 'Ready To Test', 'Deferred', 'Closed'],
        default: 'Unassigned'
    },
    deferredID: {
        type: String,
    },
    workPerformed: {
        type: Array,
        default: '',
    },
    validatedBy: {
        type: String
    },
    dateClosed: {
        type: Date
    },
    author: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
})

module.exports = mongoose.model('Ticket', TicketSchema);