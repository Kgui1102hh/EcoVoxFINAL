const { validationResult } = require("express-validator");


function verificarUsuAutenticado(req, res, next) {
    if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
    } else {
        var autenticado = { autenticado: null };
    }
    req.session.autenticado = autenticado;
    console.log(req.session.autenticado);
    next();
}

function limparSessao(req, res, next) {
    req.session.destroy();
    next()
}


function gravarUsuFisicoAutenticado(usuarioDAL, bcrypt) {
    return async (req, res, next) => {
        erros = validationResult(req)
        if (erros.isEmpty()) {
            var dadosForm = {
                nomeFisico: req.body.nomeFisico,
                senhaFisico: req.body.senhaFisico,
            };
            var results = await usuarioDAL.findUserEmailFisi(dadosForm);
            var total = Object.keys(results).length;
            if (total == 1) {
                if (bcrypt.compareSync(dadosForm.senhaFisico, results[0].senhaFisico)) {
                    var autenticado = {
                        autenticado: results[0].nomeFisico,
                        id: results[0].idFisico,
                        imgPerfilPastaFisi:results[0].imgPerfilPastaFisi,
                        imgPerfilBancoFisi:results[0].imgPerfilBancoFisi
                    };
                }
            } else {
                var autenticado =  null ;
            }
        } else {
            console.log(erros)
            var autenticado = null ;
            //tratar os erros no campo do formulário
        }
        req.session.autenticado = autenticado;
        next();
    }
}

function gravarUsuJuridicoAutenticado(usuarioDAL, bcrypt) {
    return async (req, res, next) => {
        erros = validationResult(req)
        if (erros.isEmpty()) {
            var dadosForm = {
                cnpj: req.body.cnpj,
                senhaJuridico: req.body.senhaJuridico,
            };
            var results = await usuarioDAL.findUserEmailJuri(dadosForm);
            var total = Object.keys(results).length;
            if (total == 1) {
                if (bcrypt.compareSync(dadosForm.senhaJuridico, results[0].senhaJuridico)) {
                    var autenticado = {
                        autenticado: results[0].nomeJuridico,
                        id: results[0].idJuridico,
                        imgPerfilPastaFisi:results[0].imgPerfilPastaJuri,
                        imgPerfilBancoFisi:results[0].imgPerfilBancoJuri
                    };
                }
            } else {
                var autenticado =  null ;
            }
        } else {
            console.log(erros)
            var autenticado = null ;
            //tratar os erros no campo do formulário
        }
        req.session.autenticado = autenticado;
        next();
    }
}


function verificarUsuAutorizado(tipoPermitido, destinoFalha) {
    return (req, res, next) => {
        if (req.session.autenticado.autenticado != null &&
            tipoPermitido.find(function (element) { return element == req.session.autenticado.tipo }) != undefined) {
            next();
        } else {
            res.render(destinoFalha);
        }
    };
}


module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuFisicoAutenticado,
    gravarUsuJuridicoAutenticado,
    verificarUsuAutorizado
}