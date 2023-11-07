
connection.connect((error) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ', error);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    }
});

function cadastrarUsuario(nome, email, senha) {
    const sql = `INSERT INTO usuarios (nome, email, senha, ) VALUES (?, ?, ?)`;
    const values = [nome, email, senha];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erro ao cadastrar usuário: ', error);
        } else {
            console.log('Usuário cadastrado com sucesso.');
        }
    });
}

module.exports = { cadastrarUsuario };