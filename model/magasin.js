const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const magasinSchema = Schema({
    designation: {
        type: String,
        require: true,
        min: 8,
        max: 255
    },
    description: {
        type: String,
        require: true,
        min: 8,
        max: 255
    },
    adresse: {
        type: String,
        require: true,
        min: 8,
        max: 255
    },
    latitude:{
        type: String,
    },
    longitude:{
        type: String
    },
    type_magasin:{
        type: Schema.Types.ObjectId,
        ref: "TypeMagasin"
    },
    telephones: {
        type: Array
    }
});

module.exports = { magasinSchema }