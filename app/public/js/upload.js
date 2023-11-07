function alterarImagemDeFundo() {
    const inputImagem = document.getElementById('input-imagem');
    const imagemDeFundo = document.getElementById('imagem-de-fundo');

    if (inputImagem.files.length > 0) {
        const file = inputImagem.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            imagemDeFundo.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}




function alterarImagemDeFundo1() {
    const inputImagem1 = document.getElementById('input-imagem1');
    const imagemDeFundo1 = document.getElementById('imagem-de-fundo1');

    if (inputImagem1.files.length > 0) {
        const file = inputImagem1.files[0];
        const reader = new FileReader();

        reader.onload = function(a) {
            imagemDeFundo1.src = a.target.result;
        };

        reader.readAsDataURL(file);
    }
}
