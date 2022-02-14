const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compteSchema = new Schema({
    nom:{
        type: String,
        required: false,
        min: 2
    },
    prenom:{
        type: String,
        required: false,
        min: 2
    },
    adresse:{
        type: String,
        required: false
    },
    phone:{
        type: String,
        required: true,
        min: 9,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 9,
        max: 255
    },
    compte_type: {
        type: String,
        enum: ['PERSONAL','STANDARD', 'OWNER', 'BUSINESS', 'ADMIN'],
        default: 'PERSONAL'
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
    account:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Compte', compteSchema);