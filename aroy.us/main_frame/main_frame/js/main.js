require.config({
	baseUrl: "main_frame/js/lib/",
  paths: {
    jquery: 'jquery-1.11.1.min',
    //underscore: 'underscore/underscore',
   // backbone: 'backbone/backbone',
    jquery_ui:'//code.jquery.com/ui/1.11.1/jquery-ui',
    
    image_loader:'imageload/imagesloaded.pkgd.min',
    lazy_load: 'lazyload/jquery.lazyload',
    jquery_ui_widget:'jquery.ui.widget',
    
    tmpl: 'fileupload/tmpl.min.js',
    image_load:'fileupload/load-image.all.min',
    canvas:'fileupload/canvas-to-blob.min',
    bootstrap:'bootstrap.min',
    
    upload_transport:'fileupload/jquery.iframe-transport',
    upload:'fileupload/jquery.fileupload',
    upload_process:'fileupload/jquery.fileupload-process',
    upload_image:'fileupload/jquery.fileupload-image',
    upload_audio:'fileupload/jquery.fileupload-audio',
   	upload_video:'fileupload/jquery.fileupload-video',
    upload_validate:'fileupload/jquery.fileupload-validate',
    
    drop:'dropzone/dropzone.min',
    fancybox:'fancybox',
    tabs:'../contentTabs.main',
    image:'../image.main',
    placeholder:'../placeholder.main',
    tableController: '../tableController',
    main:"../jquery.main"

  }

});
 requirejs(['jquery'], function(jquery){
	requirejs(['jquery_ui',"image_loader","lazy_load","jquery_ui_widget"]);
	//requirejs(["image_load"]);
	// requirejs(["canvas","bootstrap"]);
	//requirejs(["upload_transport", "upload"]);
	//requirejs(["upload_process"]);
	//requirejs(["upload_image"]);
	//requirejs(["upload_audio","upload_video"]);
	//requirejs(["upload_validate"]);
	requirejs(["drop","fancybox","tableController","tabs","image","placeholder", "main"]);
});
