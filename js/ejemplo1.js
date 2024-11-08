$(document).ready(function(){

    //Instrucciones

    $(".prueba").hide().delay(3000).fadeIn(2000);
    $(".logoMov").show().delay(2000).fadeIn(2500);
    
    //mostrar y ocultar video

    $(".btn-outline-secondary").click(function(){
        $(".videoNuestro").hide();
        
    });

    $(".btn-secondary").click(function(){
        $(".videoNuestro").fadeIn(2000);

    });

});