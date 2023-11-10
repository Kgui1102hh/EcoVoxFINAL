module.exports = class UsuarioDAL {

    constructor(conexao) {
        this.conexao = conexao;
    }
    
    findAllF() {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.idFisico, u.nomeFisico " +
                "u.senhaFisico, u.emailFisico, u.telFisico" +
                " u.statusFisico, u.lojaFisico FROM pessoaf where u.statusFisico = 1 " +
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findAllJ() {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.idJuridico, u.nomeJuridico, u.cnpj " +
                "u.senhaJuridico, u.emailJuridico, u.telJuridico, u.enderecoJuridico" +
                " u.statusJuridico, u.lojaJuridico FROM pessoaf where u.statusJuridico = 1 " +
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findUserEmailFisi(dadosForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM pessoaf WHERE emailFisico = ?",
            [dadosForm.emailFisico],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findUserEmailJuri(dadosForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM pessoaj WHERE emailJuridico = ?",
            [dadosForm.emailJuridico],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findIDFisi(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT idFisico, nomeFisico," +
                " senhaFisico, emailFisico, telFisico," +
                " imgPerfilPastaFisi, imgPerfilPastaFisi, lojaFisico," +
                " statusFisico FROM pessoaf where statusFisico = 1 " +
                " and idFisico = ?", [id], function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findIDJuri(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT idJuridico, nomeJuridico, cnpj" +
                " senhaJuridico, emailJuridico, telJuridico, enderecoJuridico" +
                " imgPerfilPastaJuri, imgPerfilPastaJuri," +
                " statusJuridico FROM pessoaj where statusJuridico = 1 " +
                " and idJuridico = ?", [id], function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    createF(dadosForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into pessoaf set ?",
            dadosForm,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }

    createJ(dadosForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into pessoaj set ?",
            dadosForm,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }

    createArtigo(dadosForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into artigo ?",
            dadosForm,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }

    createProduto(dadosForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into produto ?",
            dadosForm,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }

    updateF(dadosForm, id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE pessoaf SET ? WHERE idFisico = ?",
            [dadosForm, id],
            function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    updateJ(dadosForm, id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE pessoaj SET ? WHERE idJuridico = ?",
            [dadosForm, id],
            function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    deleteF(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE pessoaF SET statusFisico = 0 WHERE idFisico = ?", [id], function (error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

    deleteJ(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE pessoaJ SET statusJuridico = 0 WHERE idJuridico  = ?", [id], function (error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }
}