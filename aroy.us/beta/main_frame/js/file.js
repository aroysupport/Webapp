/*
 * jQuery upload files plugin
 *
;( function($) {
		function CustomUploadFiles(options) {
			this.options = $.extend({
				input : 'input[type=file]',
				uploadList : '.img-list',
				closeBtnClass : 'remove icon-cross',
				closeBtn : '.remove',
				url : window.location.hostname === 'blueimp.github.io' ? '//jquery-file-upload.appspot.com/' : 'server/php/',
				dropArea : '.drop-area',
				progressHolderStructure : ' <div id="progress" class="progress">',
				progressBarStructure : '<div class="progress-bar progress-bar-success">',
				progressCountStructure : '<span class="num"></span>',
				editStructure : '<a href="#" class="edit">Edit</a> <input type="checkbox">'
			}, options);
			this.init();
		}

		function bytesToSize(bytes, precision) {
			var kilobyte = 1024;
			var megabyte = kilobyte * 1024;
			var gigabyte = megabyte * 1024;
			var terabyte = gigabyte * 1024;

			if ((bytes >= 0) && (bytes < kilobyte)) {
				return bytes + ' B';

			} else if ((bytes >= kilobyte) && (bytes < megabyte)) {
				return (bytes / kilobyte).toFixed(precision) + ' KB';

			} else if ((bytes >= megabyte) && (bytes < gigabyte)) {
				return (bytes / megabyte).toFixed(precision) + ' MB';

			} else if ((bytes >= gigabyte) && (bytes < terabyte)) {
				return (bytes / gigabyte).toFixed(precision) + ' GB';

			} else if (bytes >= terabyte) {
				return (bytes / terabyte).toFixed(precision) + ' TB';

			} else {
				return bytes + ' B';
			}
		}

		function getDate(dateString) {
			var date = new Date(dateString);
			var newDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
			return newDate;
		}

		var _URL = window.URL || window.webkitURL;
		function displayPreview(files) {
			//console.log("displayPreview");
			//console.log("files : ", files);
			//console.log("files[0] : ", files[0]);
			var file = files[0];
			var img = new Image();
			//var sizeKB = file.size / 1024;
			//console.log("sizeKB : ", sizeKB);
			img.onload = function() {
				//$('#preview').append(img);
				//alert("Size: " + sizeKB + "KB\nWidth: " + img.width + "\nHeight: " + img.height);
				function gcd(a, b) {
					if (b > a) {
						temp = a;
						a = b;
						b = temp;
					}
					while (b != 0) {
						m = a % b;
						a = b;
						b = m;
					}
					return a;
				}

				function ratio(x, y) {
					c = gcd(x, y);
					return "" + (x / c) + ":" + (y / c);
				}

				var ratio = ratio(img.width, img.height);
				//console.log("width: " + img.width + ", height: " + img.height);
				//console.log("ratio : ", ratio);
				$("#aspectRatio").val(ratio);
			};
			img.src = _URL.createObjectURL(file);
		}


		CustomUploadFiles.prototype = {
			init : function() {
				if (this.options.form) {
					this.findElements();
					this.attachEvents();
				}
			},
			findElements : function() {
				this.form = $(this.options.form);
				this.input = this.form.find(this.options.input);
				this.dropArea = this.form.find(this.options.dropArea);
				this.uploadList = jQuery(this.options.uploadList);
			},
			attachEvents : function() {
				var self = this;
				/*var uploadButton = $('<button/>').addClass('btn btn-primary').prop('disabled', true).text('Processing...').on('click', function(event) {
				 event.preventDefault();
				 var $this = $(this), data = $this.data();
				 $this.off('click').text('Abort').on('click', function() {
				 $this.remove();
				 data.abort();
				 });
				 data.submit().always(function() {
				 $this.remove();
				 });
				 });*
				$('.upload-form input[type=submit]').addClass('btn btn-primary').prop('disabled', true).on('click', function(event) {
					event.preventDefault();
					var $this = $(this), data = $this.data();
					$this.off('click').text('Abort').on('click', function() {
						$this.remove();
						data.abort();
					});
					data.submit().always(function() {
						$this.remove();
					});
				});

				if ($.fn.fileupload) {
					this.input.fileupload({
						url : this.options.url,
						dataType : 'json',
						autoUpload : false,
						acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i,
						maxFileSize : 5000000, // 5 MB
						// Enable image resizing, except for Android and Opera,
						// which actually support image resizing, but fail to
						// send Blob objects via XHR requests:
						disableImageResize : /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
						previewMaxWidth : 200,
						previewMaxHeight : 200,
						previewCrop : true,
						done : function(e, data) {
							console.log("done");
							if (data.files.length > 1) {
								return false;
							}
							//var lastCell = self.uploadList.find('>div:last');
							//lastCell.addClass('done');
							//jQuery(self.options.editStructure).appendTo(lastCell);
						},
						fail : function(e, t) {
							console.log("fail");
							alert('error');
						},
						progress : function(e, data) {
							console.log("progress");
							if (data.files.length > 1) {
								return false;
							}
							var progress = parseInt(data.loaded / data.total * 100, 10);

							self.uploadList.find('.progress').css({
								width : progress + '%'
							});
							self.uploadList.find('.num').text(progress + '%\n');
							$('.upload-form #progress .progress-bar').css('width', progress + '%');
						}
					}).on('fileuploadadd', function(e, data) {
						console.log("self.uploadList.html() =", self.uploadList.html());
						/*data.context = $('<div/>').appendTo('.files');
						 $.each(data.files, function(index, file) {
						 var node = $('<p/>').append($('<span/>').text(file.name));
						 if (!index) {
						 node.append('<br>').append(uploadButton.clone(true).data(data));
						 }
						 node.appendTo(data.context);
						 });*
						if (self.uploadList.html() != "") {
							self.uploadList.empty();
						}
						if (data.files.length > 1) {
							alert('load only one file');
							return false;
						}

						data.context = $('<div/>').appendTo(self.uploadList);
						var cells = $('<div class="upload-area2 image-col"></div><div class="progress-col"></div>');
						var infoCell = cells.eq(cells.length - 1);
						cells.appendTo(data.context);
						//console.log("files = ", data.files);
						displayPreview(data.files);
						//console.log("timestamp :", getDate(e.timeStamp));
						$("#date").val(getDate(e.timeStamp));
						$.each(data.files, function(index, file) {
							//$($('<span class="fileName"><span/>').text(file.name)).appendTo('.progress');
							$(".upload-form #size").val(bytesToSize(file.size, 2));

							if (!index) {
								var progressHolder = $(self.options.progressHolderStructure).appendTo(infoCell);
								var progressBar = $(self.options.progressBarStructure).appendTo(progressHolder);
								var progressCount = $(self.options.progressCountStructure).appendTo(progressBar);
								//node.append(uploadButton.clone(true).data(data));
								$($('<span class="fileName"><span/>').text(file.name)).appendTo('.progress-bar');
								//self.uploadList.find('.num').text(file.name);
								$('.upload-form input[type=submit]').data(data);
							}
							//node.appendTo(data.context);
						});
						var lastCell = self.uploadList.find('>div:last');
						lastCell.addClass('uploaded').siblings().removeClass('uploaded');
					}).on('fileuploadprocessalways', function(e, data) {
						console.log("fileuploadprocessalways");
						/*if (data.files.length > 1) {
						 return false;
						 }
						 var index = data.index, file = data.files[index], node = $(data.context.children()[index]);

						 if (file.preview) {
						 node.prepend(file.preview);
						 }*
						var index = data.index, file = data.files[index], node = $(data.context.children()[index]);
						console.log("file = ", file);
						console.log("data.index = ", index);
						if (file.preview) {
							node.prepend(file.preview);
						}
						if (file.error) {
							node.append($('<span class="text-danger"/>').text(file.error));
						}
						if (index + 1 === data.files.length) {
							$('.upload-form input[type=submit]').val('Upload').prop('disabled', !!data.files.error);
						}
					}).on('fileuploaddone', function(e, data) {
						console.log("fileuploaddone");
						$.each(data.result.files, function(index, file) {
							if (file.url) {
								var link = $('<a>').attr('target', '_blank').prop('href', file.url);
								console.log('data.context.children() = ', data.context.children());
								//console.log("data.context.children()[index].find('.fileName')",data.context.children()[index].find(".fileName"));
								//$($(data.context.children()[index]).find(".fileName")).wrap(link);
								//$(self.uploadList.find('.progress .fileName')).wrap(link);
								self.uploadList.find('.fileName').wrap(link);
							} else if (file.error) {
								var error = $('<span class="text-danger"/>').text(file.error);
								$(data.context.children()[index]).append(error);
							}
						});
					}).on('fileuploadfail', function(e, data) {
						console.log("fileuploadfail");
						$.each(data.files, function(index) {
							var error = $('<span class="text-danger"/>').text('File upload failed.');
							$(data.context.children()[index]).append(error);
						});
					}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
				}
			},
			makeCallback : function(name) {
				if ( typeof this.options[name] === 'function') {
					var args = Array.prototype.slice.call(arguments);
					args.shift();
					this.options[name].apply(this, args);
				}
			}
		};

		$.fn.customUploadFiles = function(opt) {
			return this.each(function() {
				$(this).data('CustomUploadFiles', new CustomUploadFiles($.extend({
					form : this
				}, opt)));
			});
		};
	}(jQuery));*/