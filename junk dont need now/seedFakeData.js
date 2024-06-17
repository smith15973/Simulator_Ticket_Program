places = [
    'Flats',
    'Village',
    'Canyon',
    'Pond',
    'Group Camp',
    'Horse Camp',
    'Ghost Town',
    'Camp',
    'Dispersed Camp',
    'Backcountry',
    'River',
    'Creek',
    'Creekside',
    'Bay',
    'Spring',
    'Bayshore',
    'Sands',
    'Mule Camp',
    'Hunting Camp',
    'Cliffs',
    'Hollow'
]

descriptors = [
    'Forest',
    'Ancient',
    'Petrified',
    'Roaring',
    'Cascade',
    'Tumbling',
    'Silent',
    'Redwood',
    'Bullfrog',
    'Maple',
    'Misty',
    'Elk',
    'Grizzly',
    'Ocean',
    'Sea',
    'Sky',
    'Dusty',
    'Diamond'
] 


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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Ticket.deleteMany({});

    for (let i = 0; i < 899; i++) {
        const random4 = Math.floor(Math.random() * 4);
        const randomTrain = Math.floor(Math.random() * 2);
        const randomSystem = Math.floor(Math.random() * 2);

        let systemAff = 'Software';
        let train = 'No';
        if (randomTrain === 1) {
            train = 'Yes';
        }
        if (randomSystem === 1) {
            systemAff = 'Hardware';
        }

        const ticket = new Ticket({

            swrNum: `24-0${i+100}`,

            dateSubmitted: '2024-05-17T00:00:00.000Z',

            originator: `${sample(places)}`,

            title: `${sample(places)}, ${sample(descriptors)}`,

            description: `${sample(descriptors)} ${sample(places)}`,

            system: systemAff,

            impactedTraining: train,

            priority: random4 + 1,

        })
        await ticket.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})