//npx sequelize migration:create --name usuario-add-senha

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
          'Usuarios',
          'senha',
          {
            type: Sequelize.STRING
          }
        )
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Usuarios, senha')
    ]);
  }
}

// npx sequelize model:generate --name Lista attributes titulo:string,usuarioId:integer
