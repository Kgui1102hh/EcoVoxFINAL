function validarFor(){
    var  data = document.getElementById("data").value;
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
   
    

    if  (nome == "" || email == "" || senha == "" || data == ""){
        alert("Por favor, preencha todos os campos.");
       
    }

    else if(senha < 8){
        alert(" Sua senha é muito curta ;-; (8 min).");
    }
   else if ( senha > 8){
   
   }
    
}