jQuery(document).ready(function() {
    jQuery('#main_navbar .nav  li a').on('click', function(e)  {
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
    });
});