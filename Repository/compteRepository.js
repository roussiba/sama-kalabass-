const Compte = require('../model/compte');

let CompteRepository = {
    model : Compte,
    create_model : async(data_model) => {
        return await Compte.create({
            nom:        data_model.nom,
            prenom:     data_model.prenom,
            adresse:    data_model.adresse,
            email:      data_model.email,
            phone:      data_model.adresse
        }).save();
    }
};

module.exports = CompteRepository ;