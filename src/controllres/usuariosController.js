const Usuario = require('../models').Usuario

exports.listAll = (req, res) => {
	let usuarios = [
	{
		nome: 'teste 01',
		email: 'teste@123.com'
	},
	{
		nome: 'teste 02',
		email: 'teste2@123.com'
	}
	]
	res.send(usuarios)
}

exports.createOne = (req, res) => {
	console.log(Usuario)
	const {nome, email} = req.body
	Usuario.create({nome, email}).then(usuario => {
		res.send (response)	
	}).catch(error => {
		res.send(error)
	})

}