var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);


var fabricadeconexao = require("../../config/connection-factory.cjs");
var conexao = fabricadeconexao();


var { verificarUsuAutenticado, limparSessao, gravarUsuFisicoAutenticado, gravarUsuJuridicoAutenticado,
  verificarUsuAutorizado } = require("../models/autenticacao.cjs")


var UsuarioDAL = require("../models/UsuarioDAL.cjs");
var usuarioDAL = new UsuarioDAL(conexao);

const { body, validationResult } = require("express-validator");


const multer = require('multer');
const path = require('path');

var storagePasta = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './app/public/imagen/perfil/') // diretório de destino  
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //renomeando o arquivo para evitar duplicidade de nomes
  }
})

var upload = multer({ storage: storagePasta });


router.get("/", verificarUsuAutenticado, function (req, res) {
  req.session.autenticado.login = req.query.login;
  res.render("pages/loginF", req.session.autenticado);
});
router.get("/", verificarUsuAutenticado, function (req, res) {
  req.session.autenticado.login = req.query.login;
  res.render("pages/loginJ", req.session.autenticado);
});

router.get("/sair", limparSessao, function (req, res) {
  res.redirect("/");
});






router.get('/', function (req, res) {
  res.render('pages/home');
});


router.get('/home', function (req, res) {
  res.render('pages/home');
});


router.get('/criacao', function (req, res) {
  res.render('pages/criacao');
});
router.get('/sucesso', function (req, res) {
  res.render('pages/sucesso');
});

router.get('/Produto', function (req, res) {
  res.render('pages/Produto');
});

router.get('/carrinho', function (req, res) {
  res.render('pages/carrinho');
});

router.get('/loginJ', function (req, res) {
  res.render('pages/loginJ');
});
router.get('/loja', function (req, res) {
  res.render('pages/loja');
});

router.get('/homeLF', function (req, res) {
  res.render('pages/homeLF');
});

router.get('/homeLJ', function (req, res) {
  res.render('pages/homeLJ');
});

router.get('/Termos', function (req, res) {
  res.render('pages/Termos');
});

router.get('/Verificacao', function (req, res) {
  res.render('pages/Verificacao');
});

router.get('/teste', function (req, res) {
  res.render('pages/teste');
});

router.get('/artigos', function (req, res) {
  res.render('pages/artigos');
});
router.get('/criacaoProduto', function (req, res) {
  res.render('pages/criacaoProduto');
});
router.get('/perfilF', function (req, res) {
  res.render('pages/perfilF');
});
router.get('/perfileditF', function (req, res) {
  res.render('pages/perfileditF');
});
router.get('/perfilJ', function (req, res) {
  res.render('pages/perfilJ');
});
router.get('/perfileditJ', function (req, res) {
  res.render('pages/perfileditJ');
});

router.get("/cadastroF", function (req, res) {
  res.render("pages/cadastroF.ejs", { listaErros: null, dadosNotificacao: null, valores: { nomeFisico: "", emailFisico: "", senhaFisico: "", telFisico: "" } });
});


router.post("/cadastroFpp",
  body("nomeFisico")
    .isLength({ min: 3, max: 20 }).withMessage("Mínimo de 3 letras e máximo de 20!"),
  body("emailFisico")
    .isEmail().withMessage("Digite um e-mail válido!"),
  body("senhaFisico")
    .isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 caractere especial e 1 número"),
  body("telFisico")
    .isLength({ min: 10, max: 15 }).withMessage("O telefone tem 10 digitos!"),
  async function (req, res) {
    let dadosForm = {
      emailFisico: req.body.emailFisico,
      nomeFisico: req.body.nomeFisico,
      senhaFisico: bcrypt.hashSync(req.body.senhaFisico, salt),
      telFisico: req.body.telFisico,
    };

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      console.log(erros);
      return res.render("../views/pages/cadastroF.ejs", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      let insert = await usuarioDAL.createF(dadosForm);
      console.log(insert);
      res.render("pages/loginF", {
        listaErros: null, dadosNotificacao: {
          titulo: "Cadastro realizado!", mensagem: "Usuário criado com o id" + insert.insertId + "!", tipo: "success"
        }, valores: req.body
      })
    } catch (e) {
      console.log(e);
      res.render("pages/cadastroF", {
        listaErros: erros, dadosNotificacao: {
          titulo: "Erro ao cadastrar!", mensagem: "Verifique os valores digitados!", tipo: "error"
        }, valores: req.body
      })
    }
  })

  router.get("/cadastroFp/:id", 
  function(req, res ){
    res.locals.moment = moment;
      conexao.query("select * from pessoaf WHERE ?",
      {"idFisico":req.params.id},
        function(error, results){
          if (error) throw error;
            res.render("pages/cadastroF", { dados: null, erros: null,
            perfil:results });
        });
});
// LOGIN FÍSICO


router.get("/loginF", function (req, res) {
  res.locals.erroLogin = null
  res.render("pages/loginF", { listaErros: null });
});

router.post(
  "/loginfisico",
  body("emailFisico")
    .isEmail().withMessage("Digite um e-mail válido!"),
  body("senhaFisico")
    .isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 caractere especial e 1 número"),
  gravarUsuFisicoAutenticado(usuarioDAL, bcrypt),
  function (req, res) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      console.log(erros)
      return res.render("pages/loginF", { listaErros: erros, dadosNotificacao: null })
    }
    if (req.session.autenticacao != null) {
      //mudar para página de perfil quando existir
      res.render("pages/perfilF");
      res.redirect("/?loginF=logado");
    } else {
      res.render("pages/loginF", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" } })
    }
  });


// CADASTRO JURIDICO

router.get("/cadastroJ", function (req, res) {
  res.render("pages/cadastroJ.ejs", { listaErros: null, dadosNotificacao: null, valores: { nomeJuridico: "", cnpj: "", emailJuridico: "", senhaJuridico: "", telJuridico: "", enderecoJuridico: "" } });
});

router.post("/cadastrojuri",
  body("nomeJuridico")
    .isLength({ min: 3, max: 20 }).withMessage("Mínimo de 3 letras e máximo de 20!"),
  body("cnpj")
    .isLength({ min: 10, max: 15 }).withMessage("O CNPJ deve ter 14 dígitos!"),
  body("emailJuridico")
    .isEmail().withMessage("Digite um e-mail válido!"),
  body("senhaJuridico")
    .isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 caractere especial e 1 número"),
  body("telJuridico")
    .isLength({ min: 10, max: 15 }).withMessage("O telefone tem 10 digitos!"),
  async function (req, res) {
    let dadosForm = {
      nomeJuridico: req.body.nomeJuridico,
      cnpj: req.body.cnpj,
      emailJuridico: req.body.emailJuridico,
      senhaJuridico: bcrypt.hashSync(req.body.senhaJuridico, salt),
      telJuridico: req.body.telJuridico,
      enderecoJuridico: req.body.enderecoJuridico,
    };

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      console.log(erros);
      return res.render("../views/pages/cadastroJ.ejs", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      let insert = await usuarioDAL.createJ(dadosForm);
      res.render("pages/loginJ", {
        listaErros: null, dadosNotificacao: {
          titulo: "Cadastro realizado!", mensagem: "Usuário criado com o id" + insert.insertId + "!", tipo: "success"
        }, valores: req.body
      })
    } catch (e) {
      console.log(e);
      res.render("pages/cadastroJ", {
        listaErros: erros, dadosNotificacao: {
          titulo: "Erro ao cadastrar!", mensagem: "Verifique os valores digitados!", tipo: "error"
        }, valores: req.body
      })
    }
  })


// LOGIN JURIDICO


router.get("/loginJ", function (req, res) {
  res.locals.erroLogin = null
  res.render("pages/loginJ", { listaErros: null });
});

router.post(
  "/loginJ",
  body("cnpj")
    .isLength({ min: 14, max: 14 }).withMessage("O CNPJ deve ter 14 dígitos!"),
  body("senhaJuridico")
    .isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)"),

  gravarUsuJuridicoAutenticado(usuarioDAL, bcrypt),
  function (req, res) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/loginJ", { listaErros: erros, dadosNotificacao: null })
    }
    if (req.session.autenticacao != null) {
      //mudar para página de perfil quando existir
      res.render("pages/perfilJ");
      res.redirect("/?loginJ=logado");
    } else {
      res.render("pages/loginJ", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao logar!", mensagem: "Usuário e/ou senha inválidos!", tipo: "error" } })
    }
  });

// PERFIL FÍSICO

router.get("/perfilF", verificarUsuAutorizado([1, 2, 3], "pages/restrito"), async function (req, res) {
  try {
    let results = await usuarioDAL.findIDFisi(req.session.autenticado.id);
    console.log(results);
    let campos = {
      nomeFisico: results[0].nomeFisico, emailFisico: results[0].emailFisico,
      imgPerfilPastaFisi: results[0].imgPerfilPastaFisi, imgPerfilBancoFisi: results[0].imgPerfilBancoFisi,
      telFisico: results[0].telFisico, senhaFisico: ""
    }
    res.render("pages/perfilF", { listaErros: null, dadosNotificacao: null, valores: campos })
  } catch (e) {
    res.render("pages/perfilF", {
      listaErros: null, dadosNotificacao: null, valores: {
        imgPerfilBancoFisi: "", imgPerfilPastaFisi: "", nomeFisico: "", emailFisico: "",
        telFisico: "", senhaFisico: ""
      }
    })
  }
});

router.post("/perfilF", upload.single('imagem-perfilF'),
  body("nomeFisico")
    .isLength({ min: 3, max: 20 }).withMessage("Mínimo de 3 letras e máximo de 20!"),
  body("emailFisico")
    .isEmail().withMessage("Digite um e-mail válido!"),
  body("senhaFisico")
    .isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 caractere especial e 1 número"),
  body("telFisico")
    .isLength({ min: 10, max: 15 }).withMessage("O telefone tem 10 digitos!"),
  verificarUsuAutorizado([1, 2, 3], "pages/restrito"),
  async function (req, res) {
    const erros = validationResult(req);
    console.log(erros)
    if (!erros.isEmpty()) {
      console.log(erros);
      return res.render("pages/perfilF", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      var dadosForm = {
        emailFisico: req.body.emailFisico,
        nomeFisico: req.body.nomeFisico,
        senhaFisico: bcrypt.hashSync(req.body.senhaFisico, salt),
        telFisico: req.body.telFisico,
        imgPerfilPastaFisi: null,
      };
      console.log("senha: " + req.body.senhaFisico)
      if (req.body.senhaFisico != "") {
        dadosForm.senhaFisico = bcrypt.hashSync(req.body.senhaFisico, salt);
      }
      if (!req.file) {
        console.log("Falha no carregamento");
      } else {
        caminhoArquivo = "imagem/perfil/" + req.file.filename;
        dadosForm.imgPerfilPastaFisi = caminhoArquivo
      }
      console.log(dadosForm);

      let resultUpdate = await usuarioDAL.updateF(dadosForm, req.session.autenticado.id);
      if (!resultUpdate.isEmpty) {
        if (resultUpdate.changedRows == 1) {
          var result = await usuarioDAL.findIDFisi(req.session.autenticado.id);
          var autenticado = {
            autenticado: result[0].nomeFisico,
            id: result[0].idFisico,
            imgPerfilBancoFisi: result[0].imgPerfilBancoFisi,
            imgPerfilPastaFisi: result[0].imgPerfilPastaFisi
          };
          req.session.autenticado = autenticado;
          var campos = {
            nomeFisico: result[0].nomeFisico, emailFisico: result[0].emailFisico,
            imgPerfilPastaFisi: result[0].imgPerfilPastaFisi, imgPerfilBancoFisi: result[0].imgPerfilBancoFisi,
            telFisico: result[0].telFisico, senhaFisico: ""
          }
          res.render("pages/perfilF", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "", tipo: "success" }, valores: campos });
        }
      }
    } catch (e) {
      console.log(e)
      res.render("pages/perfilF", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao atualizar o perfil!", mensagem: "Verifique os valores digitados!", tipo: "error" }, valores: req.body })
    }

  });

// PERFIL JURIDICO

router.get("/perfilJuridico", verificarUsuAutorizado([1, 2, 3], "pages/restrito"), async function (req, res) {
  try {
    let results = await usuarioDAL.findIDJuri(req.session.autenticado.id);
    console.log(results);
    let campos = {
      nomeJuridico: results[0].nomeFisico, emailFisico: results[0].emailJuridico,
      imgPerfilPastaJuri: results[0].imgPerfilPastaJuri, imgPerfilBancoJuri: results[0].imgPerfilBancoJuri,
      telJuridico: results[0].telJuridico, cnpj: results[0].cnpj, enderecoJuridico: results[0].enderecoJuridico,
      senhaJuridico: ""
    }
    res.render("pages/perfilJuridico", { listaErros: null, dadosNotificacao: null, valores: campos })
  } catch (e) {
    res.render("pages/perfilJuridico", {
      listaErros: null, dadosNotificacao: null, valores: {
        imgPerfilBancoFisi: "", imgPerfilPastaFisi: "", nomeFisico: "", emailFisico: "",
        telFisico: "", senhaFisico: "", cnpj: "", enderecoJuridico: ""
      }
    })
  }
});

router.post("/perfilJuridico", upload.single('imagem-perfilJuridico'),
  body("nomeJuridico")
    .isLength({ min: 3, max: 20 }).withMessage("Mínimo de 3 letras e máximo de 20!"),
  body("cnpj")
    .isLength({ min: 11, max: 14 }).withMessage("O CNPJ deve ter 14 dígitos!"),
  body("emailJuridico")
    .isEmail().withMessage("Digite um e-mail válido!"),
  body("senhaJuridico")
    .isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 caractere especial e 1 número"),
  body("telJuridico")
    .isLength({ min: 10, max: 10 }).withMessage("O telefone tem 10 digitos!"),
  verificarUsuAutorizado([1, 2, 3], "pages/restrito"),
  async function (req, res) {
    const erros = validationResult(req);
    console.log(erros)
    if (!erros.isEmpty()) {
      return res.render("pages/perfilJuridico", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      var dadosForm = {
        nomeJuridico: req.body.nomeJuridico,
        cnpj: req.body.cnpj,
        emailJuridico: req.body.emailJuridico,
        senhaJuridico: bcrypt.hashSync(req.body.senhaJuridico, salt),
        telJuridico: req.body.telJuridico,
        enderecoJuridico: req.body.enderecoJuridico,
        imgPerfilPastaJuri: null,
      };
      console.log("Senha: " + req.body.senhaJuridico)
      if (req.body.senhaJuridico != "") {
        dadosForm.senhaJuridico = bcrypt.hashSync(req.body.senhaJuridico, salt);
      }
      if (!req.file) {
        console.log("Falha no carregamento");
      } else {
        caminhoArquivo = "imagem/perfilJuridico/" + req.file.filename;
        dadosForm.imgPerfilPastaJuri = caminhoArquivo
      }
      console.log(dadosForm);

      let resultUpdate = await usuarioDAL.updateJ(dadosForm, req.session.autenticado.id);
      if (!resultUpdate.isEmpty) {
        if (resultUpdate.changedRows == 1) {
          var result = await usuarioDAL.findIDJuri(req.session.autenticado.id);
          var autenticado = {
            autenticado: result[0].nomeJuridico,
            id: result[0].idJuridico,
            img_perfil_banco: result[0].imgPerfilBancoJuri,
            img_perfil_pasta: result[0].imgPerfilPastaJuri
          };
          req.session.autenticado = autenticado;
          var campos = {
            nomeJuridico: result[0].nomeJuridico, emailJuridico: result[0].emailJuridico,
            imgPerfilPastaJuri: result[0].imgPerfilPastaJuri, imgPerfilBancoJuri: result[0].imgPerfilBancoJuri,
            cnpj: result[0].cnpj, telJuridico: result[0].telJuridico, enderecoJuridico: result[0].enderecoJuridico, senhaJuridico: ""
          }
          res.render("pages/perfilJuridico", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "", tipo: "success" }, valores: campos });
        }
      }
    } catch (e) {
      console.log(e)
      res.render("pages/perfilJuridico", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao atualizar o perfil!", mensagem: "Verifique os valores digitados!", tipo: "error" }, valores: req.body })
    }

  });


// CRIAÇÃO DE ARTIGOS

router.get("/criacao", function (req, res) {
  res.render("pages/criacao", { listaErros: null, dadosNotificacao: null, valores: { nomeArtigo: "", textoArtigo: "", datapostArtigo: "", autorArtigo: "" } });
});

router.post("/criacao",
  body("nomeArtigo").isLength({ min: 10, max: 60 }).withMessage("Mínimo de 10, máximo de 60 palavras."),
  async function (req, res) {
    let dadosForm = {
      nomeArtigo: req.body.nomeArtigo,
      textoArtigo: req.body.textoArtigo,
      datapostArtigo: req.body.datapostArtigo,
      autorArtigo: req.body.nomeJuridico,
      imgArtigoPasta: null
    };

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      console.log(erros);
      return res.render("../views/pages/criacao.ejs", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      let insert = await usuarioDAL.createArtigo(dadosForm);
      res.render("pages/artigos", {
        listaErros: null, dadosNotificacao: {
          titulo: "Artigo pulicado!", mensagem: "Artigo criado com o id" + insert.insertId + "!", tipo: "success"
        }, valores: req.body
      })
    } catch (e) {
      console.log(e);
      res.render("pages/criacao", {
        listaErros: erros, dadosNotificacao: {
          titulo: "Erro ao publicar!", tipo: "error"
        }, valores: req.body
      })
    }
  })

router.post("/criacao"),
  body("nomeArtigo").isLength({ min: 10, max: 60 }).withMessage("Mínimo de 10, máximo de 60 palavras."),
  async function (req, res) {
    const erros = validationResult(req);
    console.log(erros)
    if (!erros.isEmpty()) {
      console.log(erros)
      return res.render("pages/criacao", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      var dadosForm = {
        nomeArtigo: req.body.nomeArtigo,
        textoArtigo: req.body.textoArtigo,
        datapostArtigo: req.body.datapostArtigo,
        autorArtigo: req.body.nomeJuridico
      };
      let resultUpdate = await usuarioDAL.createArtigo(dadosForm, req.session.autenticado.id);
      if (!resultUpdate.isEmpty) {
        if (resultUpdate.changedRows == 1) {
          var result = await usuarioDAL.findID(req.session.autenticado.id);
          var autenticado = {
            autenticado: result[0].nomeArtigo,
            id: result[0].idArtigo,
            imgArtigoBanco: result[0].imgArtigoBanco,
            imgArtigoPasta: result[0].imgArtigoPasta
          };
          req.session.autenticado = autenticado;
          var campos = {
            nomeArtigo: result[0].nomeArtigo, autorArtigo: result[0].nomeJuridico,
            imgArtigoPasta: result[0].imgArtigoPasta, imgArtigoBanco: result[0].imgArtigoBanco,
            datapostArtigo: result[0].datapostArtigo, textoArtigo: result[0].textoArtigo
          }
          res.render("pages/criacao", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "", tipo: "success" }, valores: campos });
        }
      }
    } catch (e) {
      console.log(e)
      res.render("pages/criacao", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao atualizar o perfil!", mensagem: "Verifique os valores digitados!", tipo: "error" }, valores: req.body })
    }

  };




// CRIAÇÃO DE PRODUTOS


router.get("/criacaoProduto", function (req, res) {
  res.render("pages/criacaoProduto", { listaErros: null, dadosNotificacao: null, valores: { nomeArtigo: "", textoArtigo: "", datapostArtigo: "", autorArtigo: "" } });
});

router.post("/criacaoProduto",
  body("nomeProduto").isLength({ min: 10, max: 60 }).withMessage("Mínimo de 10, máximo de 60 palavras."),
  body("precoProduto").isLength({ min: 5, max: 8 }).withMessage("O preço do seu produto não pode valor mais do que 999,00 reais."),
  async function (req, res) {
    let dadosForm = {
      nomeArtigo: req.body.nomeArtigo,
      textoArtigo: req.body.textoArtigo,
      datapostArtigo: req.body.datapostArtigo,
      autorArtigo: req.body.nomeJuridico,
      imgArtigoPasta: null
    };

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      console.log(erros);
      return res.render("../views/pages/criacaoProduto.ejs", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      let insert = await usuarioDAL.createArtigo(dadosForm);
      res.render("pages/produto", {
        listaErros: null, dadosNotificacao: {
          titulo: "Artigo pulicado!", mensagem: "Artigo criado com o id" + insert.insertId + "!", tipo: "success"
        }, valores: req.body
      })
    } catch (e) {
      console.log(e);
      res.render("pages/criacaoProduto", {
        listaErros: erros, dadosNotificacao: {
          titulo: "Erro ao publicar!", tipo: "error"
        }, valores: req.body
      })
    }
  })

router.post("/criacao"),
  body("nomeArtigo").isLength({ min: 10, max: 60 }).withMessage("Mínimo de 10, máximo de 60 palavras."),
  async function (req, res) {
    const erros = validationResult(req);
    console.log(erros)
    if (!erros.isEmpty()) {
      console.log(erros)
      return res.render("pages/criacao", { listaErros: erros, dadosNotificacao: null, valores: req.body })
    }
    try {
      var dadosForm = {
        nomeArtigo: req.body.nomeArtigo,
        textoArtigo: req.body.textoArtigo,
        datapostArtigo: req.body.datapostArtigo,
        autorArtigo: req.body.nomeJuridico
      };
      let resultUpdate = await usuarioDAL.createArtigo(dadosForm, req.session.autenticado.id);
      if (!resultUpdate.isEmpty) {
        if (resultUpdate.changedRows == 1) {
          var result = await usuarioDAL.findID(req.session.autenticado.id);
          var autenticado = {
            autenticado: result[0].nomeArtigo,
            id: result[0].idArtigo,
            imgArtigoBanco: result[0].imgArtigoBanco,
            imgArtigoPasta: result[0].imgArtigoPasta
          };
          req.session.autenticado = autenticado;
          var campos = {
            nomeArtigo: result[0].nomeArtigo, autorArtigo: result[0].nomeJuridico,
            imgArtigoPasta: result[0].imgArtigoPasta, imgArtigoBanco: result[0].imgArtigoBanco,
            datapostArtigo: result[0].datapostArtigo, textoArtigo: result[0].textoArtigo
          }
          res.render("pages/criacao", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "", tipo: "success" }, valores: campos });
        }
      }
    } catch (e) {
      console.log(e)
      res.render("pages/criacao", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao atualizar o perfil!", mensagem: "Verifique os valores digitados!", tipo: "error" }, valores: req.body })
    }

  };

module.exports = router