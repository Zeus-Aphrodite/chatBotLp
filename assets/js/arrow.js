// JavaScript Document// JavaScript Document



function updown(){  

    $(".main_head,.hform_hed img").animate({top:"-=7px"},800).animate({top:"+=7px"}, 800);
    setTimeout("updown()",1000); 
} 
  
function animation(){  
    updown();  
} 

$(document).ready(function() {  
    setTimeout("animation()",300);   
});  


