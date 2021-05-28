
module.exports = function (app) {
	const usuarios = require('../controllres/usuariosController')
	app.route('/usuarios')
		.get(usuarios.listAll)
		.post(usuarios.createOne)
	}