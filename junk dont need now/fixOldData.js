const mongoose = require('mongoose');
const Ticket = require('../models/ticket');

mongoose.connect('mongodb://localhost:27017/simTicketSystem')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// Import the file system module
const fs = require('fs');

// Path to your JSON file
const filePath = './data.json';

const fixDate = (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number);
    const fullYear = year + 2000;
    const date = new Date(Date.UTC(fullYear, month - 1, day, 0, 0, 0, 0));
    return date.toISOString().slice(0, -1);
}

const validate = (thing) => {
    if (thing === undefined || thing === null) {
        return '';
    }
    return thing;
}

const validateDate = (date) => {
    if (date === undefined || date === null) {
        return '';
    }
    return fixDate(date);
}

const validateDateClosed = (info) => {
    if (info.dateClosed === undefined || info.dateClosed === null) {
        return validateDate(info.dateSubmitted);
    }
    return validateDate(info.dateClosed);
}

const validateImpactedTraining = (training) => {
    if (training !== 'Yes' || training !== 'No') {
        return 'No';
    }
    return training;
}

const validatePriority = (priority) => {
    if (priority === undefined || priority === null) {
        return 4;
    }
    return priority;
}

const validateSystem = (system) => {
    if (system === undefined || system === null || (system !== 'Software' && system !== 'Hardware')) {
        return 'Software';
    }
    return system;
}

const validateSWRNum = (swr) => {
    const whole = swr.split('-');
    if (whole[1].length === 4) {
        return `${whole[0]}-${whole[1]}`;
    }
    else if (whole[1].length === 3) {
        return `${whole[0]}-0${whole[1]}`;
    }
    else if (whole[1].length === 2) {
        return `${whole[0]}-00${whole[1]}`;
    }
    else if (whole[1].length === 1) {
        return `${whole[0]}-000${whole[1]}`;
    }
    else if (whole[1].length === 0) {
        return `${whole[0]}-0000`;
    }
}

let jsonData;
// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        // Parse the JSON data
        jsonData = JSON.parse(data);
        seedDB().then(() => {
            mongoose.connection.close();
        })
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});

const seedDB = async () => {
    await Ticket.deleteMany({});
    for (let i = 0; i < jsonData.length; i++) {

        const ticket = new Ticket({

            swrNum: validateSWRNum(jsonData[i].swrNum),

            dateSubmitted: validateDate(jsonData[i].dateSubmitted),

            originator: validate(jsonData[i].originator),

            title: validate(jsonData[i].title),

            description: validate(jsonData[i].description),

            system: validateSystem(jsonData[i].system),

            impactedTraining: validateImpactedTraining(jsonData[i].impactedTraining),

            priority: validatePriority(jsonData[i].priority),

            status: 'Closed',

            workPerformed: '',

            assignedTo: validate(jsonData[i].assignedTo),

            captured: 'Not Captured',

            capturedSlot: null,

            dateClosed: validateDateClosed(jsonData[i]),

            validatedBy: validate(jsonData[i].validatedBy),

            attachments: [],

            deferredID: '',
        })

        await ticket.save();
        console.log(ticket);
    }
}

