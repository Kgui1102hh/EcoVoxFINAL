
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
    let mascaracep = event.target
    mascaracep.value = zipCodeMask(mascaracep.value)
  }
  
  const zipCodeMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
  }

  function readURL(input){
    if (input.files && input.files[0]){
      var reader = new FileReader();

      reader.onload = function (e){

        $('#file_upload')
        .attr('src' , e.target.result);
      };
     reader.readAsDataURL(input.files[0]);
    }
  }
   

   