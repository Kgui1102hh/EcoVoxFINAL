
document.querySelector(".hamburguer").addEventListener("click", () =>
document.querySelector(".conteiner").classList.toggle("show-menu")
);

let btn = document.querySelector('#btn-mobile');

let sidebar = document.querySelector('.sidebar');

let searchBtn = document.querySelector('.bx-search');

let listItem = document.querySelectorAll('.list-item');

let listlogout = document.querySelectorAll('.list-logout');



btn.onclick = function(){

 sidebar.classList.toggle('active');

}




searchBtn.onclick = function(){

 sidebar.classList.toggle('active');

}

var bot = window.idBotaoClicado
      function botaoClicado(E) {
      bot = E
      document.querySelector('.bot-click').style.background = '#00AAAA'
      document.querySelector('.bot-click').style.border = 'none'
    
    }
    var bot = window.idBotaoClicad
    function botaoClicado(D) {
    bot = D
    document.querySelector('.bot-click').style.background = '#00AAAA'
    document.querySelector('.bot-click').style.border = 'none'
  
  }


  const handleZipCode = (event) => {
    let input = event.target
    input.value = zipCodeMask(input.value)
  }
  
  const zipCodeMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
  } 

 

  
  function validarFo(){
    var cpf = document.getElementById("cpf").value;
    var senha = document.getElementById("senha").value;
 

    if  ( cpf == "" || senha == ""){
    alert("Por favor, preencha todos os campos.");  
    }
    else if(senha < 8){
   alert(" Sua senha é muito curta ;-; (8 min).");
    }
   else if ( senha > 8){
    window.location.href = "home"
  
   }
 
      }
  
  
      function validarF(){
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha2").value;
  

        
    
        if  (  senha == ""|| email == "" ){
        alert("Por favor, preencha todos os campos.");  
        }
        else if(senha < 8){
       alert(" Sua senha é muito curta ;-; (8 min).");
        }
       else if ( senha > 8){
        window.location.href = "home.html";
    
       }
       
      }


    

  
