ALTER USER 'root'@'localhost' IDENTIFIED with mysql_native_password BY '17022006';

create database ecovox
default character set utf8
default collate utf8_general_ci;

create table pessoaf (
idFisico INT AUTO_INCREMENT PRIMARY KEY,
nomeFisico VARCHAR(100) NOT NULL,
emailFisico VARCHAR(100) NOT NULL,
telFisico VARCHAR(20),
senhaFisico VARCHAR(100) NOT NULL,
imgPerfilPastaFisi varchar(80) DEFAULT NULL,
imgPerfilBancoFisi longblob
);

create table pessoaj (
idJuridico INT AUTO_INCREMENT PRIMARY KEY,
nomeJuridico VARCHAR(100) NOT NULL,
cnpj VARCHAR(19) NOT NULL,
emailJuridico VARCHAR(100) NOT NULL,
senhaJuridico VARCHAR(100) NOT NULL,
telJuridico VARCHAR(20) NOT NULL,
enderecoJuridico VARCHAR(100) NOT NULL,
imgPerfilPastaJuri varchar(80) DEFAULT NULL,
imgPerfilBancoJuri longblob
);

create table artigo (
idArtigo INT AUTO_INCREMENT PRIMARY KEY,
nomeArtigo VARCHAR(100) NOT NULL,
textoArtigo text NOT NULL,
imgArtigoPasta varchar(80) DEFAULT NULL,
imgArtigoBanco longblob,
datapostArtigo DATETIME NOT NULL,
autorArtigo VARCHAR(45)
);
 
create table categoriaartigo (
id_categoriaartigo INT AUTO_INCREMENT PRIMARY KEY,
nome_categoriaartigo VARCHAR(100) NOT NULL
);

create table produto (
idProduto INT AUTO_INCREMENT PRIMARY KEY,
nomeProduto VARCHAR(60) NOT NULL,
precoProduto DECIMAL(6,2) NOT NULL,
descricaoProduto text NOT NULL,
imgProdutoPasta varchar(80) DEFAULT NULL,
imgProdutoBanco longblob,
datapostProduto DATETIME NOT NULL,
CONSTRAINT `fk_produto_idProduto` FOREIGN KEY (`idProduto`) REFERENCES `idProduto` (`id_idProduto`)
);

create table caracteristica (
idCaracteristica INT AUTO_INCREMENT PRIMARY KEY,
caracteristica text,
CONSTRAINT `fk_caracteristica_idCaracteristica` FOREIGN KEY (`idCaracteristica`) REFERENCES `idCaracteristica` (`id_idCaracteristica`)
);

create table caracteristicasProduto (
id_idProduto INT AUTO_INCREMENT,
id_idCaracteristica INT AUTO_INCREMENT
);

create table categorialoja (
id_categorialoja INT AUTO_INCREMENT PRIMARY KEY,
nome_categorialoja VARCHAR(100) NOT NULL
);

UNLOCK TABLES;