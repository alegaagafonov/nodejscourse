const mongoose = require('mongoose');

const initConnection = () => {
    mongoose.connect(`mongodb+srv://michael2022:C9bbOk1UYZeRadB9@cluster0.j2f0b.mongodb.net/test`)
        .then(() => {
            console.log('db is connected!');
        }).catch(
        () => {
            console.log('Error with connection!');
        }
    );
};

module.exports = {
    initConnection
}
