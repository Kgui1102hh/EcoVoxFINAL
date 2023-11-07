const tel = document.getElementById('tel') // Seletor do campo de telefone

tel.addEventListener('keypress', (e) => mascaraTelefone(e.target.value)) // Dispara quando digitado no campo
tel.addEventListener('change', (e) => mascaraTelefone(e.target.value)) // Dispara quando autocompletado o campo

const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    tel.value = valor // Insere o(s) valor(es) no campo
}
function validarForm(){
    var  cpf = document.getElementById("cpf").value;
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var tel = document.getElementById("tel").value;
    var end = document.getElementById("end").value;
    

    if  (nome == "" || email == "" || senha == "" || tel == ""|| cpf == ""|| end == ""){
        alert("Por favor, preencha todos os campos.");
       
    }

    else if(senha < 8){
        alert(" Sua senha é muito curta ;-; (8 min).");
    }
   else if ( senha > 8){
    window.location.href = "/termos"
   }
    
}