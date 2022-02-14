const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeMagasinSchema = Schema({
    nom: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: String
    }
});

module.exports = {typeMagasinSchema}