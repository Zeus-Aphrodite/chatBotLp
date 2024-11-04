$(function(){
	if($(".box_show")) {
		$(".box_show .title").click(function() {
			$(this).next(".box_show .show").slideToggle();
			$(this).toggleClass('clicked');
			/*if(this.className.indexOf("clicked") != -1) {
				$(this).removeClass("clicked");
			}
			else {
				$("box_show .title").removeClass();
				$(this).addClass("clicked");
				$(".box_show .show").slideUp(0);		
				$(this).next().slideDown(-500);
			}
			return false;*/
		});
	}
});








