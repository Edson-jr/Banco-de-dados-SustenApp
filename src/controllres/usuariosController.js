
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
	let response = {
		message: 'Usuarios criado com sucesso',
		data: req.body
	}
	res.send (response)
}