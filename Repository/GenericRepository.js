const UserRepository = require('../Repository/userRepository');
const CompteRepository = require('../Repository/compteRepository');

let GenericRepository = {
    repository_user     : UserRepository,
    repository_compte   : CompteRepository
};

module.exports = GenericRepository;