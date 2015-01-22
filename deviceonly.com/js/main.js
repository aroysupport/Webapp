jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        /*console.log($(this).find("div"));
 		$(this).find("div").css({
 			"height": "2px",
			"background":"#E97601"
 		});*/
    });
});