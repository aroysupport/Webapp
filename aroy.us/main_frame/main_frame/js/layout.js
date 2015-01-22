/*--------------------------------Style Init------------------------------------------*/
function openCloseReload() {
	jQuery('.newAdd').each(function() {
		$(this).removeClass("newAdd");
		jQuery(this).openClose({
			activeClass : 'active',
			opener : '.opener',
			slider : '.slide',
			animSpeed : 400,
			effect : 'slide',
			animEnd : function() {
				var scrollBlockAPI = jQuery('.jcf-scrollable').data('jcfInstance');
				if (scrollBlockAPI) {
					jcf.replaceAll();
				}
			}
		});
	});
}

function lightboxReload() {
	jQuery('a.Newlightbox').each(function() {
		$(this).removeClass("Newlightbox");
		$(this).addClass("lightbox");
		var link = jQuery(this);
		link.attr('rel', link.attr('data-rel')).fancybox({
			padding : 10,
			margin : 0,
			cyclic : false,
			autoScale : true,
			overlayShow : true,
			overlayOpacity : 0.65,
			overlayColor : '#000000',
			titlePosition : 'inside',
			onComplete : function(box) {
				if (link.attr('href').indexOf('#') === 0) {
					jQuery('#fancybox-content').find('a.close').unbind('click.fb').bind('click.fb', function(e) {
						jQuery.fancybox.close();
						e.preventDefault();
					});
				}
			}
		});
	});
}

// upload files init
function initUploadFiles() {
	var url = window.location.hostname === 'blueimp.github.io' ? '//jquery-file-upload.appspot.com/' : 'main_frame/server/php/';
	uploadButton();
	jQuery('.compaign-form').customUploadFiles({
		input : 'input#img-uploader',
		uploadList : '.upload-area',
		url : url
	});
	jQuery('.upload-form').customUploadFiles({
		input : 'input#img-uploader',
		uploadList : '.files',
		url : url
	});
}

// initialize custom form elements
function initCustomForms() {
	jcf.setOptions('Select', {
		wrapNative : false,
		wrapNativeOnMobile : false
	});
	jcf.replaceAll();
}

function initAddClasses() {
	lib.each(lib.queryElementsBySelector('.thumbnail-block ul li'), function(index, item) {
		new AddClass({
			item : item,
			classAdd : 'selected'
		});
	});
}

// content tabs init
function initTabs() {
	jQuery('.tabset').contentTabs({
		addToParent : true,
		autoHeight : true,
		tabLinks : 'a.teb-opener'
	});
}

// open-close init
function initOpenClose() {
	jQuery('.open-close tr').openClose({
		activeClass : 'active',
		opener : '.opener',
		slider : '.slide',
		animSpeed : 400,
		effect : 'slide'/*,
		 animEnd : function() {
		 var scrollBlockAPI = jQuery('.jcf-scrollable').data('jcfInstance');
		 if (scrollBlockAPI) {
		 jcf.replaceAll();
		 }
		 }*/
	});
}

function initTabDropdown() {
	jQuery('.open-close1').openClose({
		hideOnClickOutside : true,
		activeClass : 'active',
		opener : '.opener1',
		slider : '.slide1',
		animSpeed : 400,
		effect : 'none'
	});
}

// fancybox modal popup init
function initLightbox() {
	jQuery('a.lightbox, a[data-rel*="lightbox"]').each(function() {
		var link = jQuery(this);
		link.attr('rel', link.attr('data-rel')).fancybox({
			padding : 10,
			margin : 0,
			cyclic : false,
			autoScale : true,
			overlayShow : true,
			overlayOpacity : 0.65,
			overlayColor : '#000000',
			titlePosition : 'inside',
			onComplete : function(box) {
				if (link.attr('href').indexOf('#') === 0) {
					jQuery('#fancybox-content').find('a.close').unbind('click.fb').bind('click.fb', function(e) {
						jQuery.fancybox.close();
						e.preventDefault();
					});
				}
			}
		});
	});
}

// popups init
function initPopups() {
	jQuery('.popup-holder').contentPopup({
		mode : 'click'
	});
}



/* Fancybox overlay fix */
jQuery(function() {
	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
	var isWinPhoneDevice = navigator.msPointerEnabled && /MSIE 10.*Touch/.test(navigator.userAgent);

	// create stylesheet
	var styleTag = jQuery('<style>').appendTo('head');
	styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

	// crossbrowser style handling
	var addCSSRule = function(selector, rules, index) {
		if (styleSheet.insertRule) {
			styleSheet.insertRule(selector + '{' + rules + '}', index);
		} else {
			styleSheet.addRule(selector, rules, index);
		}
	};

	if (isTouchDevice || isWinPhoneDevice) {
		// custom positioning for mobile devices
		setTimeout(function() {
			var page = jQuery('body'), fancySideShadows = jQuery('#fancybox-bg-ne, #fancybox-bg-e, #fancybox-bg-se'), fancyOverlay = jQuery('#fancybox-overlay'), fancyWrap = jQuery('#fancybox-wrap');

			// override position handler
			jQuery.fancybox.center = function() {
				if (fancyWrap.innerWidth() > fancyOverlay.innerWidth()) {
					fancyWrap.css({
						padding : 0
					});
					fancySideShadows.css({
						display : 'none'
					});
				} else {
					fancyWrap.css({
						padding : ''
					});
					fancySideShadows.css({
						display : ''
					});
				}
				fancyWrap.css({
					left : (page.innerWidth() - fancyWrap.innerWidth()) / 2
				});
			};
			jQuery(window).on('resize orientationchange', function() {
				jQuery.fancybox.center();
			});
		}, 1);
	} else {
		// use position fixed for desktop
		addCSSRule('#fancybox-overlay', 'position:fixed;top:0;left:0');
	}
});

/*
 * jQuery Open/Close plugin
 */
;( function($) {
		function OpenClose(options) {
			this.options = $.extend({
				addClassBeforeAnimation : true,
				hideOnClickOutside : false,
				activeClass : 'active',
				opener : '.opener',
				slider : '.slide',
				animSpeed : 400,
				effect : 'fade',
				event : 'click'
			}, options);
			this.init();
		}


		OpenClose.prototype = {
			init : function() {
				if (this.options.holder) {
					this.findElements();
					this.attachEvents();
					this.makeCallback('onInit', this);
				}
			},
			findElements : function() {
				this.holder = $(this.options.holder);
				this.opener = this.holder.find(this.options.opener);
				this.slider = this.holder.find(this.options.slider);
			},
			attachEvents : function() {
				// add handler
				var self = this;
				this.eventHandler = function(e) {
					e.preventDefault();
					if (self.slider.hasClass(slideHiddenClass)) {
						self.showSlide();
					} else {
						self.hideSlide();
					}
				};
				self.opener.bind(self.options.event, this.eventHandler);

				// hover mode handler
				if (self.options.event === 'over') {
					self.opener.bind('mouseenter', function() {
						console.log("mouse enter");
						self.showSlide();
					});
					self.holder.bind('mouseleave', function() {
						console.log("mouse leave");
						self.hideSlide();
					});
				}

				// outside click handler
				self.outsideClickHandler = function(e) {
					if (self.options.hideOnClickOutside) {
						var target = $(e.target);
						if (!target.is(self.holder) && !target.closest(self.holder).length) {
							self.hideSlide();
						}
					}
				};

				// set initial styles
				if (this.holder.hasClass(this.options.activeClass)) {
					$(document).bind('click touchstart', self.outsideClickHandler);
				} else {
					this.slider.addClass(slideHiddenClass);
				}
			},
			showSlide : function() {
				var self = this;
				console.log("Show slide - ", self);
				if (self.options.addClassBeforeAnimation) {
					self.holder.addClass(self.options.activeClass);
				}
				self.slider.removeClass(slideHiddenClass);
				$(document).bind('click touchstart', self.outsideClickHandler);

				self.makeCallback('animStart', true);
				toggleEffects[self.options.effect].show({
					box : self.slider,
					speed : self.options.animSpeed,
					complete : function() {
						if (!self.options.addClassBeforeAnimation) {
							self.holder.addClass(self.options.activeClass);
						}
						self.makeCallback('animEnd', true);
					}
				});
			},
			hideSlide : function() {
				var self = this;
				if (self.options.addClassBeforeAnimation) {
					self.holder.removeClass(self.options.activeClass);
				}
				$(document).unbind('click touchstart', self.outsideClickHandler);

				self.makeCallback('animStart', false);
				toggleEffects[self.options.effect].hide({
					box : self.slider,
					speed : self.options.animSpeed,
					complete : function() {
						if (!self.options.addClassBeforeAnimation) {
							self.holder.removeClass(self.options.activeClass);
						}
						self.slider.addClass(slideHiddenClass);
						self.makeCallback('animEnd', false);
					}
				});
			},
			destroy : function() {
				this.slider.removeClass(slideHiddenClass).css({
					display : ''
				});
				this.opener.unbind(this.options.event, this.eventHandler);
				this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
				$(document).unbind('click touchstart', this.outsideClickHandler);
			},
			makeCallback : function(name) {
				if ( typeof this.options[name] === 'function') {
					var args = Array.prototype.slice.call(arguments);
					args.shift();
					this.options[name].apply(this, args);
				}
			}
		};

		// add stylesheet for slide on DOMReady
		var slideHiddenClass = 'js-slide-hidden';
		( function() {
				var tabStyleSheet = $('<style type="text/css">')[0];
				var tabStyleRule = '.' + slideHiddenClass;
				tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
				if (tabStyleSheet.styleSheet) {
					tabStyleSheet.styleSheet.cssText = tabStyleRule;
				} else {
					tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
				}
				$('head').append(tabStyleSheet);
			}());

		// animation effects
		var toggleEffects = {
			slide : {
				show : function(o) {
					o.box.stop(true).hide().slideDown(o.speed, o.complete);
				},
				hide : function(o) {
					o.box.stop(true).slideUp(o.speed, o.complete);
				}
			},
			fade : {
				show : function(o) {
					o.box.stop(true).hide().fadeIn(o.speed, o.complete);
				},
				hide : function(o) {
					o.box.stop(true).fadeOut(o.speed, o.complete);
				}
			},
			none : {
				show : function(o) {
					o.box.hide().show(0, o.complete);
				},
				hide : function(o) {
					o.box.hide(0, o.complete);
				}
			}
		};

		// jQuery plugin interface
		$.fn.openClose = function(opt) {
			return this.each(function() {
				jQuery(this).data('OpenClose', new OpenClose($.extend(opt, {
					holder : this
				})));
			});
		};
	}(jQuery));

/*
 * Popups plugin
 */
;( function($) {
		function ContentPopup(opt) {
			this.options = $.extend({
				holder : null,
				popup : '.popup',
				btnOpen : '.open',
				btnClose : '.close',
				openClass : 'popup-active',
				clickEvent : 'click',
				mode : 'click',
				hideOnClickLink : true,
				hideOnClickOutside : true,
				delay : 50
			}, opt);
			if (this.options.holder) {
				this.holder = $(this.options.holder);
				this.init();
			}
		}


		ContentPopup.prototype = {
			init : function() {
				this.findElements();
				this.attachEvents();
			},
			findElements : function() {
				this.popup = this.holder.find(this.options.popup);
				this.btnOpen = this.holder.find(this.options.btnOpen);
				this.btnClose = this.holder.find(this.options.btnClose);
			},
			attachEvents : function() {
				// handle popup openers
				var self = this;
				this.clickMode = isTouchDevice || (self.options.mode === self.options.clickEvent);

				if (this.clickMode) {
					// handle click mode
					this.btnOpen.bind(self.options.clickEvent, function(e) {
						if (self.holder.hasClass(self.options.openClass)) {
							if (self.options.hideOnClickLink) {
								self.hidePopup();
							}
						} else {
							self.showPopup();
						}
						e.preventDefault();
					});

					// prepare outside click handler
					this.outsideClickHandler = this.bind(this.outsideClickHandler, this);
				} else {
					// handle hover mode
					var timer, delayedFunc = function(func) {
						clearTimeout(timer);
						timer = setTimeout(function() {
							func.call(self);
						}, self.options.delay);
					};
					this.btnOpen.bind('mouseover', function() {
						delayedFunc(self.showPopup);
					}).bind('mouseout', function() {
						delayedFunc(self.hidePopup);
					});
					this.popup.bind('mouseover', function() {
						delayedFunc(self.showPopup);
					}).bind('mouseout', function() {
						delayedFunc(self.hidePopup);
					});
				}

				// handle close buttons
				this.btnClose.bind(self.options.clickEvent, function(e) {
					self.hidePopup();
					e.preventDefault();
				});
			},
			outsideClickHandler : function(e) {
				// hide popup if clicked outside
				var targetNode = $((e.changedTouches ? e.changedTouches[0] : e).target);
				if (!targetNode.closest(this.popup).length && !targetNode.closest(this.btnOpen).length) {
					this.hidePopup();
				}
			},
			showPopup : function() {
				// reveal popup
				this.holder.addClass(this.options.openClass);
				this.popup.css({
					display : 'block'
				});

				// outside click handler
				if (this.clickMode && this.options.hideOnClickOutside && !this.outsideHandlerActive) {
					this.outsideHandlerActive = true;
					$(document).bind('click touchstart', this.outsideClickHandler);
				}
			},
			hidePopup : function() {
				// hide popup
				this.holder.removeClass(this.options.openClass);
				this.popup.css({
					display : 'none'
				});

				// outside click handler
				if (this.clickMode && this.options.hideOnClickOutside && this.outsideHandlerActive) {
					this.outsideHandlerActive = false;
					$(document).unbind('click touchstart', this.outsideClickHandler);
				}
			},
			bind : function(f, scope, forceArgs) {
				return function() {
					return f.apply(scope, forceArgs ? [forceArgs] : arguments);
				};
			}
		};

		// detect touch devices
		var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

		// jQuery plugin interface
		$.fn.contentPopup = function(opt) {
			return this.each(function() {
				new ContentPopup($.extend(opt, {
					holder : this
				}));
			});
		};
	}(jQuery));

/*!
 * JCF - JavaScript Custom Forms - Core
 */
;( function(root, factory) {
		if ( typeof define === 'function' && define.amd) {
			define(['jquery'], factory);
		} else if ( typeof exports === 'object') {
			module.exports = factory(require('jquery'));
		} else {
			root.jcf = factory(jQuery);
		}
	}(this, function($) {
		'use strict';

		// private variables
		var customInstances = [];

		// default global options
		var commonOptions = {
			optionsKey : 'jcf',
			dataKey : 'jcf-instance',
			rtlClass : 'jcf-rtl',
			focusClass : 'jcf-focus',
			pressedClass : 'jcf-pressed',
			disabledClass : 'jcf-disabled',
			hiddenClass : 'jcf-hidden',
			resetAppearanceClass : 'jcf-reset-appearance',
			unselectableClass : 'jcf-unselectable'
		};

		// detect device type
		var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch, isWinPhoneDevice = navigator.msPointerEnabled && /MSIE 10.*Touch/.test(navigator.userAgent);
		commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

		// create global stylesheet if custom forms are used
		var createStyleSheet = function() {
			var styleTag = $('<style>').appendTo('head'), styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

			// crossbrowser style handling
			var addCSSRule = function(selector, rules, index) {
				if (styleSheet.insertRule) {
					styleSheet.insertRule(selector + '{' + rules + '}', index);
				} else {
					styleSheet.addRule(selector, rules, index);
				}
			};

			// add special rules
			addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;display:block !important');
			addCSSRule('.' + commonOptions.rtlClass + '.' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
			addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;');
			addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

			// detect rtl pages
			var html = $('html'), body = $('body');
			if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
				html.addClass(commonOptions.rtlClass);
			}

			// mark stylesheet as created
			commonOptions.styleSheetCreated = true;
		};

		// simplified pointer events handler
		( function() {
				var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled, touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch, eventList, eventMap = {}, eventPrefix = 'jcf-';

				// detect events to attach
				if (pointerEventsSupported) {
					eventList = {
						pointerover : navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
						pointerdown : navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
						pointermove : navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
						pointerup : navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
					};
				} else {
					eventList = {
						pointerover : 'mouseover',
						pointerdown : 'mousedown' + ( touchEventsSupported ? ' touchstart' : ''),
						pointermove : 'mousemove' + ( touchEventsSupported ? ' touchmove' : ''),
						pointerup : 'mouseup' + ( touchEventsSupported ? ' touchend' : '')
					};
				}

				// create event map
				$.each(eventList, function(targetEventName, fakeEventList) {
					$.each(fakeEventList.split(' '), function(index, fakeEventName) {
						eventMap[fakeEventName] = targetEventName;
					});
				});

				// jQuery event hooks
				$.each(eventList, function(eventName, eventHandlers) {
					eventHandlers = eventHandlers.split(' ');
					$.event.special[eventPrefix + eventName] = {
						setup : function() {
							var self = this;
							$.each(eventHandlers, function(index, fallbackEvent) {
								if (self.addEventListener)
									self.addEventListener(fallbackEvent, fixEvent, false);
								else
									self['on' + fallbackEvent] = fixEvent;
							});
						},
						teardown : function() {
							var self = this;
							$.each(eventHandlers, function(index, fallbackEvent) {
								if (self.addEventListener)
									self.removeEventListener(fallbackEvent, fixEvent, false);
								else
									self['on' + fallbackEvent] = null;
							});
						}
					};
				});

				// check that mouse event are not simulated by mobile browsers
				var lastTouch = null;
				var mouseEventSimulated = function(e) {
					var dx = Math.abs(e.clientX - lastTouch.x), dy = Math.abs(e.clientY - lastTouch.y), rangeDistance = 25;

					if (dx <= rangeDistance && dy <= rangeDistance) {
						return true;
					}
				};

				// normalize event
				var fixEvent = function(e) {
					var origEvent = e || window.event, targetEventName = eventMap[origEvent.type];

					e = $.event.fix(origEvent);
					e.type = eventPrefix + targetEventName;

					if (origEvent.pointerType) {
						switch(origEvent.pointerType) {
						case 2:
							e.pointerType = 'touch';
							break;
						case 3:
							e.pointerType = 'pen';
							break;
						case 4:
							e.pointerType = 'mouse';
							break;
						default:
							e.pointerType = origEvent.pointerType;
						}
					} else {
						e.pointerType = origEvent.type.substr(0, 5);
						// "mouse" or "touch" word length
					}
					if (!e.pageX || !e.pageY) {
						e.pageX = (origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent).pageX;
						e.pageY = (origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent).pageY;
					}

					if (origEvent.type === 'touchend' && origEvent.changedTouches[0]) {
						lastTouch = {
							x : origEvent.changedTouches[0].clientX,
							y : origEvent.changedTouches[0].clientY
						};
					}
					if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
						return;
					} else {
						return ($.event.dispatch || $.event.handle).call(this, e);
					}
				};
			}());

		// custom mousewheel/trackpad handler
		( function() {
				var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '), shimEventName = 'jcf-mousewheel';

				$.event.special[shimEventName] = {
					setup : function() {
						var self = this;
						$.each(wheelEvents, function(index, fallbackEvent) {
							if (self.addEventListener)
								self.addEventListener(fallbackEvent, fixEvent, false);
							else
								self['on' + fallbackEvent] = fixEvent;
						});
					},
					teardown : function() {
						var self = this;
						$.each(wheelEvents, function(index, fallbackEvent) {
							if (self.addEventListener)
								self.removeEventListener(fallbackEvent, fixEvent, false);
							else
								self['on' + fallbackEvent] = null;
						});
					}
				};

				var fixEvent = function(e) {
					var origEvent = e || window.event;
					e = $.event.fix(origEvent);
					e.type = shimEventName;

					// old wheel events handler
					if ('detail' in origEvent) {
						e.deltaY = -origEvent.detail;
					}
					if ('wheelDelta' in origEvent) {
						e.deltaY = -origEvent.wheelDelta;
					}
					if ('wheelDeltaY' in origEvent) {
						e.deltaY = -origEvent.wheelDeltaY;
					}
					if ('wheelDeltaX' in origEvent) {
						e.deltaX = -origEvent.wheelDeltaX;
					}

					// modern wheel event handler
					if ('deltaY' in origEvent) {
						e.deltaY = origEvent.deltaY;
					}
					if ('deltaX' in origEvent) {
						e.deltaX = origEvent.deltaX;
					}
					e.delta = e.deltaY || e.deltaX;
					return ($.event.dispatch || $.event.handle).call(this, e);
				};
			}());

		// public API
		return {
			modules : {},
			getOptions : function() {
				return $.extend({}, commonOptions);
			},
			setOptions : function(moduleName, moduleOptions) {
				if (arguments.length > 1) {
					// set module options
					if (this.modules[moduleName]) {
						$.extend(this.modules[moduleName].prototype.options, moduleOptions);
					}
				} else {
					// set common options
					$.extend(commonOptions, moduleName);
				}
			},
			addModule : function(proto) {
				// add module to list
				var Module = function(options) {
					// save instance to collection
					options.element.data(commonOptions.dataKey, this);
					customInstances.push(this);

					// save options
					this.options = $.extend({}, commonOptions, this.options, options.element.data(commonOptions.optionsKey), options);

					// bind event handlers to instance
					this.bindHandlers();

					// call constructor
					this.init.apply(this, arguments);
				};

				// set proto as prototype for new module
				Module.prototype = proto;

				// bind event handlers for module and its plugins (functions beggining with on)
				Module.prototype.bindHandlers = function() {
					var self = this;
					$.each(self, function(propName, propValue) {
						if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
							// dont use $.proxy here because it doesn't create unique handler
							self[propName] = function() {
								return propValue.apply(self, arguments);
							};
						}
					});
				};
				if (proto.plugins) {
					$.each(proto.plugins, function(pluginName, plugin) {
						plugin.prototype.bindHandlers = Module.prototype.bindHandlers;
					});
				}

				// override destroy method
				var originalDestroy = Module.prototype.destroy;
				Module.prototype.destroy = function() {
					this.options.element.removeData(this.options.dataKey);

					for (var i = customInstances.length - 1; i >= 0; i--) {
						if (customInstances[i] === this) {
							customInstances.splice(i, 1);
							break;
						}
					}

					if (originalDestroy) {
						originalDestroy.apply(this, arguments);
					}
				};

				// save module to list
				this.modules[proto.name] = Module;
			},
			getInstance : function(element) {
				return $(element).data(commonOptions.dataKey);
			},
			replace : function(elements, moduleName, customOptions) {
				var self = this, instance;

				if (!commonOptions.styleSheetCreated) {
					createStyleSheet();
				}

				$(elements).each(function() {
					var moduleOptions, element = $(this);

					instance = element.data(commonOptions.dataKey);
					if (instance) {
						instance.refresh();
					} else {
						if (!moduleName) {
							$.each(self.modules, function(currentModuleName, module) {
								if (module.prototype.matchElement.call(module.prototype, element)) {
									moduleName = currentModuleName;
									return false;
								}
							});
						}
						if (moduleName) {
							moduleOptions = $.extend({
								element : element
							}, customOptions);
							instance = new self.modules[moduleName](moduleOptions);
						}
					}
				});
				return instance;
			},
			refresh : function(elements) {
				$(elements).each(function() {
					var instance = $(this).data(commonOptions.dataKey);
					if (instance) {
						instance.refresh();
					}
				});
			},
			destroy : function(elements) {
				$(elements).each(function() {
					var instance = $(this).data(commonOptions.dataKey);
					if (instance) {
						instance.destroy();
					}
				});
			},
			replaceAll : function(context) {
				var self = this;
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function() {
						self.replace(this, moduleName);
					});
				});
			},
			refreshAll : function(context) {
				if (context) {
					$.each(this.modules, function(moduleName, module) {
						$(module.prototype.selector, context).each(function() {
							var instance = $(this).data(commonOptions.dataKey);
							if (instance) {
								instance.refresh();
							}
						});
					});
				} else {
					for (var i = customInstances.length - 1; i >= 0; i--) {
						customInstances[i].refresh();
					}
				}
			},
			destroyAll : function(context) {
				var self = this;
				if (context) {
					$.each(this.modules, function(moduleName, module) {
						$(module.prototype.selector, context).each(function(index, element) {
							var instance = $(element).data(commonOptions.dataKey);
							if (instance) {
								instance.destroy();
							}
						});
					});
				} else {
					while (customInstances.length) {
						customInstances[0].destroy();
					}
				}
			}
		};
	}));

/*!
 * JCF - JavaScript Custom Forms - Select Module
 */
;( function($, window) {
		'use strict';

		jcf.addModule({
			name : 'Select',
			selector : 'select',
			options : {
				element : null
			},
			plugins : {
				ListBox : ListBox,
				ComboBox : ComboBox,
				SelectList : SelectList
			},
			matchElement : function(element) {
				return element.is('select');
			},
			init : function() {
				this.element = $(this.options.element);
				this.createInstance();
			},
			isListBox : function() {
				return this.element.is('[size]:not([jcf-size]), [multiple]');
			},
			createInstance : function() {
				if (this.instance) {
					this.instance.destroy();
				}
				if (this.isListBox()) {
					this.instance = new ListBox(this.options);
				} else {
					this.instance = new ComboBox(this.options);
				}
			},
			refresh : function() {
				var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) || (!this.isListBox() && this.instance instanceof ListBox);

				if (typeMismatch) {
					this.createInstance();
				} else {
					this.instance.refresh();
				}
			},
			destroy : function() {
				this.instance.destroy();
			}
		});

		// combobox module
		function ComboBox(options) {
			this.options = $.extend({
				wrapNative : true,
				wrapNativeOnMobile : true,
				fakeDropInBody : true,
				useCustomScroll : true,
				flipDropToFit : true,
				maxVisibleItems : 10,
				fakeAreaStructure : '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
				fakeDropStructure : '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
				optionClassPrefix : 'jcf-option-',
				selectClassPrefix : 'jcf-select-',
				dropContentSelector : '.jcf-select-drop-content',
				selectTextSelector : '.jcf-select-text',
				dropActiveClass : 'jcf-drop-active',
				flipDropClass : 'jcf-drop-flipped'
			}, options);
			this.init();
		}


		$.extend(ComboBox.prototype, {
			init : function(options) {
				this.initStructure();
				this.bindHandlers();
				this.attachEvents();
				this.refresh();
			},
			initStructure : function() {
				// prepare structure
				this.win = $(window);
				this.doc = $(document);
				this.realElement = $(this.options.element);
				this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
				this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
				this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
				makeUnselectable(this.fakeElement);

				// copy classes from original select
				this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

				// detect device type and dropdown behavior
				if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
					this.options.wrapNative = true;
				}

				if (this.options.wrapNative) {
					// wrap native select inside fake block
					this.realElement.prependTo(this.fakeElement).css({
						position : 'absolute',
						height : '100%',
						width : '100%'
					}).addClass(this.options.resetAppearanceClass);
				} else {
					// just hide native select
					this.realElement.addClass(this.options.hiddenClass);
					this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
				}
			},
			attachEvents : function() {
				// delayed refresh handler
				var self = this;
				this.delayedRefresh = function() {
					setTimeout(function() {
						self.refresh();
						if (self.list) {
							self.list.refresh();
						}
					}, 1);
				};

				// native dropdown event handlers
				if (this.options.wrapNative) {
					this.realElement.on({
						focus : this.onFocus,
						change : this.onChange,
						click : this.onChange,
						keydown : this.onChange
					});
				} else {
					// custom dropdown event handlers
					this.realElement.on({
						focus : this.onFocus,
						change : this.onChange,
						keydown : this.onKeyDown
					});
					this.fakeElement.on({
						'jcf-pointerdown' : this.onSelectAreaPress
					});
				}
			},
			onKeyDown : function(e) {
				if (e.which === 13) {
					this.toggleDropdown();
				} else {
					this.delayedRefresh();
				}
			},
			onChange : function() {
				this.refresh();
			},
			onFocus : function() {
				if (!this.pressedFlag || !this.focusedFlag) {
					this.fakeElement.addClass(this.options.focusClass);
					this.realElement.on('blur', this.onBlur);
					this.toggleListMode(true);
					this.focusedFlag = true;
				}
			},
			onBlur : function() {
				if (!this.pressedFlag) {
					this.fakeElement.removeClass(this.options.focusClass);
					this.realElement.off('blur', this.onBlur);
					this.toggleListMode(false);
					this.focusedFlag = false;
				}
			},
			onResize : function() {
				if (this.dropActive) {
					this.hideDropdown();
				}
			},
			onSelectDropPress : function() {
				this.pressedFlag = true;
			},
			onSelectDropRelease : function(e, pointerEvent) {
				this.pressedFlag = false;
				if (pointerEvent.pointerType === 'mouse') {
					this.realElement.focus();
				}
			},
			onSelectAreaPress : function(e) {
				// skip click if drop inside fake element or real select is disabled
				var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
				if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
					return;
				}

				// toggle dropdown visibility
				this.toggleDropdown();

				// misc handlers
				if (!this.focusedFlag) {
					if (e.pointerType === 'mouse') {
						this.realElement.focus();
					} else {
						this.onFocus(e);
					}
				}
				this.pressedFlag = true;
				this.fakeElement.addClass(this.options.pressedClass);
				this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
			},
			onSelectAreaRelease : function(e) {
				if (this.focusedFlag && e.pointerType === 'mouse') {
					this.realElement.focus();
				}
				this.pressedFlag = false;
				this.fakeElement.removeClass(this.options.pressedClass);
				this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
			},
			onOutsideClick : function(e) {
				var target = $(e.target), clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

				if (!clickedInsideSelect) {
					this.hideDropdown();
				}
			},
			onSelect : function() {
				this.hideDropdown();
				this.refresh();
				this.realElement.trigger('change');
				this.realElement.attr('selected', true);
			},
			toggleListMode : function(state) {
				if (!this.options.wrapNative) {
					if (state) {
						// temporary change select to list to avoid appearing of native dropdown
						this.realElement.attr({
							size : 4,
							'jcf-size' : ''
						});
					} else {
						// restore select from list mode to dropdown select
						if (!this.options.wrapNative) {
							this.realElement.removeAttr('size jcf-size');
						}
					}
				}
			},
			createDropdown : function() {
				// destroy previous dropdown if needed
				if (this.dropdown) {
					this.list.destroy();
					this.dropdown.remove();
				}

				// create new drop container
				this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
				this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
				makeUnselectable(this.dropdown);

				// create new select list instance
				this.list = new SelectList({
					useHoverClass : true,
					handleResize : false,
					alwaysPreventMouseWheel : true,
					maxVisibleItems : this.options.maxVisibleItems,
					useCustomScroll : this.options.useCustomScroll,
					holder : this.dropdown.find(this.options.dropContentSelector),
					element : this.realElement
				});
				$(this.list).on({
					select : this.onSelect,
					press : this.onSelectDropPress,
					release : this.onSelectDropRelease
				});
			},
			repositionDropdown : function() {
				var selectOffset = this.fakeElement.offset(), selectWidth = this.fakeElement.outerWidth(), selectHeight = this.fakeElement.outerHeight(), dropHeight = this.dropdown.outerHeight(), winScrollTop = this.win.scrollTop(), winHeight = this.win.height(), calcTop, calcLeft, bodyOffset, needFlipDrop = false;

				// check flip drop position
				if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
					needFlipDrop = true;
				}

				if (this.options.fakeDropInBody) {
					bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
					if (this.options.flipDropToFit && needFlipDrop) {
						// calculate flipped dropdown position
						calcLeft = selectOffset.left;
						calcTop = selectOffset.top - dropHeight - bodyOffset;
					} else {
						// calculate default drop position
						calcLeft = selectOffset.left;
						calcTop = selectOffset.top + selectHeight - bodyOffset;
					}

					// update drop styles
					this.dropdown.css({
						position : 'absolute',
						width : selectWidth,
						left : calcLeft,
						top : calcTop
					});
				}

				// refresh flipped class
				this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
			},
			showDropdown : function() {
				// create options list if not created
				if (!this.dropdown) {
					this.createDropdown();
				}

				// show dropdown
				this.dropActive = true;
				this.dropdown.appendTo(this.fakeDropTarget);
				this.fakeElement.addClass(this.options.dropActiveClass);
				this.refreshSelectedText();
				this.repositionDropdown();
				this.list.setScrollTop(this.savedScrollTop);
				this.list.refresh();

				// add temporary event handlers
				this.win.on('resize', this.onResize);
				this.doc.on('jcf-pointerdown', this.onOutsideClick);
			},
			hideDropdown : function() {
				if (this.dropdown) {
					this.savedScrollTop = this.list.getScrollTop();
					this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
					this.dropdown.removeClass(this.options.flipDropClass).detach();
					this.doc.off('jcf-pointerdown', this.onOutsideClick);
					this.win.off('resize', this.onResize);
					this.dropActive = false;
				}
			},
			toggleDropdown : function() {
				if (this.dropActive) {
					this.hideDropdown();
				} else {
					this.showDropdown();
				}
			},
			refreshSelectedText : function() {
				// redraw selected area
				var selectedIndex = this.realElement.prop('selectedIndex'), selectedOption = this.realElement.prop('options')[selectedIndex], selectedOptionImage = selectedOption.getAttribute('data-image'), selectedOptionClasses, selectedFakeElement;

				if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
					selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
					this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

					if (selectedOptionImage) {
						if (!this.selectImage) {
							this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
						}
						this.selectImage.attr('src', selectedOptionImage).show();
					} else if (this.selectImage) {
						this.selectImage.hide();
					}

					this.currentSelectedText = selectedOption.innerHTML;
					this.currentSelectedImage = selectedOptionImage;
				}
			},
			refresh : function() {
				// refresh selected text
				this.refreshSelectedText();

				// handle disabled state
				this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
			},
			destroy : function() {
				// restore structure
				if (this.options.wrapNative) {
					this.realElement.insertBefore(this.fakeElement).css({
						position : '',
						height : '',
						width : ''
					}).removeClass(this.options.resetAppearanceClass);
				} else {
					this.realElement.removeClass(this.options.hiddenClass);
					if (this.realElement.is('[jcf-size]')) {
						this.realElement.removeAttr('size jcf-size');
					}
				}

				// removing element will also remove its event handlers
				this.fakeElement.remove();

				// remove other event handlers
				this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
				this.realElement.off({
					focus : this.onFocus
				});
			}
		});

		// listbox module
		function ListBox(options) {
			this.options = $.extend({
				wrapNative : true,
				useCustomScroll : true,
				fakeStructure : '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
				selectClassPrefix : 'jcf-select-',
				listHolder : '.jcf-list-wrapper'
			}, options);
			this.init();
		}


		$.extend(ListBox.prototype, {
			init : function(options) {
				this.bindHandlers();
				this.initStructure();
				this.attachEvents();
			},
			initStructure : function() {
				var self = this;
				this.realElement = $(this.options.element);
				this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
				this.listHolder = this.fakeElement.find(this.options.listHolder);
				makeUnselectable(this.fakeElement);

				// copy classes from original select
				this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
				this.realElement.addClass(this.options.hiddenClass);

				this.list = new SelectList({
					useCustomScroll : this.options.useCustomScroll,
					holder : this.listHolder,
					selectOnClick : false,
					element : this.realElement
				});
			},
			attachEvents : function() {
				// delayed refresh handler
				var self = this;
				this.delayedRefresh = function() {
					clearTimeout(self.refreshTimer);
					self.refreshTimer = setTimeout(function() {
						self.refresh();
					}, 1);
				};

				// other event handlers
				this.realElement.on({
					focus : this.onFocus,
					click : this.delayedRefresh,
					keydown : this.delayedRefresh
				});

				// select list event handlers
				$(this.list).on({
					select : this.onSelect,
					press : this.onFakeOptionsPress,
					release : this.onFakeOptionsRelease
				});
			},
			onFakeOptionsPress : function(e, pointerEvent) {
				this.pressedFlag = true;
				if (pointerEvent.pointerType === 'mouse') {
					this.realElement.focus();
				}
			},
			onFakeOptionsRelease : function(e, pointerEvent) {
				this.pressedFlag = false;
				if (pointerEvent.pointerType === 'mouse') {
					this.realElement.focus();
				}
			},
			onSelect : function() {
				this.realElement.trigger('change');
			},
			onFocus : function() {
				if (!this.pressedFlag || !this.focusedFlag) {
					this.fakeElement.addClass(this.options.focusClass);
					this.realElement.on('blur', this.onBlur);
					this.focusedFlag = true;
				}
			},
			onBlur : function() {
				if (!this.pressedFlag) {
					this.fakeElement.removeClass(this.options.focusClass);
					this.realElement.off('blur', this.onBlur);
					this.focusedFlag = false;
				}
			},
			refresh : function() {
				this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
				this.list.refresh();
			},
			destroy : function() {
				this.list.destroy();
				this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
				this.fakeElement.remove();
			}
		});

		// options list module
		function SelectList(options) {
			this.options = $.extend({
				holder : null,
				maxVisibleItems : 10,
				selectOnClick : true,
				useHoverClass : false,
				useCustomScroll : false,
				handleResize : true,
				alwaysPreventMouseWheel : false,
				indexAttribute : 'data-index',
				cloneClassPrefix : 'jcf-option-',
				containerStructure : '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
				containerSelector : '.jcf-list-content',
				captionClass : 'jcf-optgroup-caption',
				disabledClass : 'jcf-disabled',
				optionClass : 'jcf-option',
				groupClass : 'jcf-optgroup',
				hoverClass : 'jcf-hover',
				selectedClass : 'jcf-selected',
				scrollClass : 'jcf-scroll-active'
			}, options);
			this.init();
		}


		$.extend(SelectList.prototype, {
			init : function() {
				this.initStructure();
				this.refreshSelectedClass();
				this.attachEvents();
			},
			initStructure : function() {
				this.element = $(this.options.element);
				this.indexSelector = '[' + this.options.indexAttribute + ']';
				this.container = $(this.options.containerStructure).appendTo(this.options.holder);
				this.listHolder = this.container.find(this.options.containerSelector);
				this.lastClickedIndex = this.element.prop('selectedIndex');
				this.rebuildList();
			},
			attachEvents : function() {
				this.bindHandlers();
				this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
				this.listHolder.on('jcf-pointerdown', this.onPress);

				if (this.options.useHoverClass) {
					this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
				}
			},
			onPress : function(e) {
				$(this).trigger('press', e);
				this.listHolder.on('jcf-pointerup', this.onRelease);
			},
			onRelease : function(e) {
				$(this).trigger('release', e);
				this.listHolder.off('jcf-pointerup', this.onRelease);
			},
			onHoverItem : function(e) {
				var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
				this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
			},
			onItemPress : function(e) {
				if (e.pointerType === 'touch' || this.options.selectOnClick) {
					// select option after "click"
					this.tmpListOffsetTop = this.list.offset().top;
					this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
				} else {
					// select option immediately
					this.onSelectItem(e);
				}
			},
			onItemRelease : function(e) {
				// remove event handlers and temporary data
				this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);

				// simulate item selection
				if (this.tmpListOffsetTop === this.list.offset().top) {
					this.onSelectItem(e);
				}
				delete this.tmpListOffsetTop;
			},
			onSelectItem : function(e) {
				var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)), range;

				// ignore clicks on disabled options
				if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
					this.realOptions[clickedIndex].attr("selected", true);
					return;
				}

				if (this.element.prop('multiple')) {
					if (e.metaKey || e.ctrlKey || e.pointerType === 'touch') {
						// if CTRL/CMD pressed or touch devices - toggle selected option
						this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
					} else if (e.shiftKey) {
						// if SHIFT pressed - update selection
						range = [this.lastClickedIndex, clickedIndex].sort(function(a, b) {
							return a - b;
						});
						this.realOptions.each(function(index, option) {
							option.selected = (index >= range[0] && index <= range[1]);
						});
					} else {
						// set single selected index
						this.element.prop('selectedIndex', clickedIndex);
					}
				} else {
					this.element.prop('selectedIndex', clickedIndex);
				}

				// save last clicked option
				if (!e.shiftKey) {
					this.lastClickedIndex = clickedIndex;
				}

				// refresh classes
				this.refreshSelectedClass();

				// scroll to active item in desktop browsers
				if (e.pointerType === 'mouse') {
					this.scrollToActiveOption();
				}

				// make callback when item selected
				$(this).trigger('select');
			},
			rebuildList : function() {
				// rebuild options
				var self = this, rootElement = this.element[0];

				// recursively create fake options
				this.storedSelectHTML = rootElement.innerHTML;
				this.optionIndex = 0;
				this.list = $(this.createOptionsList(rootElement));
				this.listHolder.empty().append(this.list);
				this.realOptions = this.element.find('option');
				this.fakeOptions = this.list.find(this.indexSelector);
				this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
				delete this.optionIndex;

				// detect max visible items
				var maxCount = this.options.maxVisibleItems, sizeValue = this.element.prop('size');
				if (sizeValue > 1) {
					maxCount = sizeValue;
				}

				// handle scrollbar
				var needScrollBar = this.fakeOptions.length > maxCount;
				this.container.toggleClass(this.options.scrollClass, needScrollBar);
				if (needScrollBar) {
					// change max-height
					this.listHolder.css({
						maxHeight : this.getOverflowHeight(maxCount),
						overflow : 'auto'
					});

					if (this.options.useCustomScroll && jcf.modules.Scrollable) {
						// add custom scrollbar if specified in options
						jcf.replace(this.listHolder, 'Scrollable', {
							handleResize : this.options.handleResize,
							alwaysPreventMouseWheel : this.options.alwaysPreventMouseWheel
						});
						return;
					}
				}

				// disable edge wheel scrolling
				if (this.options.alwaysPreventMouseWheel) {
					this.preventWheelHandler = function(e) {
						var currentScrollTop = self.listHolder.scrollTop(), maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight(), maxScrollLeft = self.listHolder.prop('scrollWidth') - self.listHolder.innerWidth();

						// check edge cases
						if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
							e.preventDefault();
						}
					};
					this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
				}
			},
			refreshSelectedClass : function() {
				var self = this, selectedItem, isMultiple = this.element.prop('multiple'), selectedIndex = this.element.prop('selectedIndex');

				if (isMultiple) {
					this.realOptions.each(function(index, option) {
						self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
					});
				} else {
					this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
					selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
					if (this.options.useHoverClass) {
						selectedItem.addClass(this.options.hoverClass);
					}
				}
			},
			scrollToActiveOption : function() {
				// scroll to target option
				var targetOffset = this.getActiveOptionOffset();
				this.listHolder.prop('scrollTop', targetOffset);
			},
			getSelectedIndexRange : function() {
				var firstSelected = -1, lastSelected = -1;
				this.realOptions.each(function(index, option) {
					if (option.selected) {
						if (firstSelected < 0) {
							firstSelected = index;
						}
						lastSelected = index;
					}
				});
				return [firstSelected, lastSelected];
			},
			getChangedSelectedIndex : function() {
				var selectedIndex = this.element.prop('selectedIndex'), targetIndex;

				if (this.element.prop('multiple')) {
					// multiple selects handling
					if (!this.previousRange) {
						this.previousRange = [selectedIndex, selectedIndex];
					}
					this.currentRange = this.getSelectedIndexRange();
					targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
					this.previousRange = this.currentRange;
					return targetIndex;
				} else {
					// single choice selects handling
					return selectedIndex;
				}
			},
			getActiveOptionOffset : function() {
				// calc values
				var dropHeight = this.listHolder.height(), dropScrollTop = this.listHolder.prop('scrollTop'), currentIndex = this.getChangedSelectedIndex(), fakeOption = this.fakeOptions.eq(currentIndex), fakeOptionOffset = fakeOption.offset().top - this.list.offset().top, fakeOptionHeight = fakeOption.innerHeight();

				// scroll list
				if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
					// scroll down (always scroll to option)
					return fakeOptionOffset - dropHeight + fakeOptionHeight;
				} else if (fakeOptionOffset < dropScrollTop) {
					// scroll up to option
					return fakeOptionOffset;
				}
			},
			getOverflowHeight : function(sizeValue) {
				var item = this.fakeListItems.eq(sizeValue - 1), listOffset = this.list.offset().top, itemOffset = item.offset().top, itemHeight = item.innerHeight();
				return itemOffset + itemHeight - listOffset;
			},
			getScrollTop : function() {
				return this.listHolder.scrollTop();
			},
			setScrollTop : function(value) {
				this.listHolder.scrollTop(value);
			},
			createOption : function(option) {
				var newOption = document.createElement('span');
				newOption.className = this.options.optionClass;
				newOption.innerHTML = option.innerHTML;
				newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

				var optionImage, optionImageSrc = option.getAttribute('data-image');
				if (optionImageSrc) {
					optionImage = document.createElement('img');
					optionImage.src = optionImageSrc;
					newOption.insertBefore(optionImage, newOption.childNodes[0]);
				}
				if (option.disabled) {
					newOption.className += ' ' + this.options.disabledClass;
				}
				if (option.className) {
					newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
				}
				return newOption;
			},
			createOptGroup : function(optgroup) {
				var optGroupContainer = document.createElement('span'), optGroupName = optgroup.getAttribute('label'), optGroupCaption, optGroupList;

				// create caption
				optGroupCaption = document.createElement('span');
				optGroupCaption.className = this.options.captionClass;
				optGroupCaption.innerHTML = optGroupName;
				optGroupContainer.appendChild(optGroupCaption);

				// create list of options
				if (optgroup.children.length) {
					optGroupList = this.createOptionsList(optgroup);
					optGroupContainer.appendChild(optGroupList);
				}

				optGroupContainer.className = this.options.groupClass;
				return optGroupContainer;
			},
			createOptionContainer : function() {
				var optionContainer = document.createElement('li');
				return optionContainer;
			},
			createOptionsList : function(container) {
				var self = this, list = document.createElement('ul');

				$.each(container.children, function(index, currentNode) {
					var item = self.createOptionContainer(currentNode), newNode;

					switch(currentNode.tagName.toLowerCase()) {
					case 'option':
						newNode = self.createOption(currentNode);
						break;
					case 'optgroup':
						newNode = self.createOptGroup(currentNode);
						break;
					}
					list.appendChild(item).appendChild(newNode);
				});
				return list;
			},
			refresh : function() {
				// check for select innerHTML changes
				if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
					this.rebuildList();
				}

				// refresh custom scrollbar
				var scrollInstance = jcf.getInstance(this.listHolder);
				if (scrollInstance) {
					scrollInstance.refresh();
				}

				// scroll active option into view
				this.scrollToActiveOption();

				// refresh selectes classes
				this.refreshSelectedClass();
			},
			destroy : function() {
				this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
				this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
				this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
				this.listHolder.off('jcf-pointerdown', this.onPress);
			}
		});

		// helper functions
		var getPrefixedClasses = function(className, prefixToAdd) {
			return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
		};
		var makeUnselectable = ( function() {
				var unselectableClass = jcf.getOptions().unselectableClass;
				function preventHandler(e) {
					e.preventDefault();
				}

				return function(node) {
					node.addClass(unselectableClass).on('selectstart', preventHandler);
				};
			}());

	}(jQuery, this));

/*!
 * JCF - JavaScript Custom Forms - Radio module
 */
;( function($, window) {
		'use strict';

		jcf.addModule({
			name : 'Radio',
			selector : 'input[type="radio"]',
			options : {
				wrapNative : true,
				checkedClass : 'jcf-checked',
				uncheckedClass : 'jcf-unchecked',
				labelActiveClass : 'jcf-label-active',
				fakeStructure : '<span class="jcf-radio"><span></span></span>'
			},
			matchElement : function(element) {
				return element.is(':radio');
			},
			init : function(options) {
				this.initStructure();
				this.attachEvents();
				this.refresh();
			},
			initStructure : function() {
				// prepare structure
				this.doc = $(document);
				this.realElement = $(this.options.element);
				this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
				this.labelElement = this.getLabelFor();

				if (this.options.wrapNative) {
					// wrap native radio inside fake block
					this.realElement.prependTo(this.fakeElement).css({
						position : 'absolute',
						opacity : 0
					});
				} else {
					// just hide native radio
					this.realElement.addClass(this.options.hiddenClass);
				}
			},
			attachEvents : function() {
				// add event handlers
				this.realElement.on({
					focus : this.onFocus,
					click : this.onRealClick
				});
				this.fakeElement.on('click', this.onFakeClick);
				this.fakeElement.on('jcf-pointerdown', this.onPress);
			},
			onRealClick : function() {
				// redraw current radio and its group
				this.refreshRadioGroup();
			},
			onFakeClick : function(e) {
				// skip event if clicked on real element inside wrapper
				if (this.options.wrapNative && this.realElement.is(e.target)) {
					return;
				}

				// toggle checked class
				if (!this.realElement.is(':disabled')) {
					this.realElement.prop('checked', true);
					this.refreshRadioGroup();
					this.realElement.trigger('change');
				}
			},
			onFocus : function() {
				if (!this.pressedFlag || !this.focusedFlag) {
					this.focusedFlag = true;
					this.fakeElement.addClass(this.options.focusClass);
					this.realElement.on('blur', this.onBlur);
				}
			},
			onBlur : function() {
				if (!this.pressedFlag) {
					this.focusedFlag = false;
					this.fakeElement.removeClass(this.options.focusClass);
					this.realElement.off('blur', this.onBlur);
				}
			},
			onPress : function() {
				if (!this.focusedFlag) {
					this.realElement.focus();
				}
				this.pressedFlag = true;
				this.fakeElement.addClass(this.options.pressedClass);
				this.doc.on('jcf-pointerup', this.onRelease);
			},
			onRelease : function() {
				if (this.focusedFlag) {
					this.realElement.focus();
				}
				this.pressedFlag = false;
				this.fakeElement.removeClass(this.options.pressedClass);
				this.doc.off('jcf-pointerup', this.onRelease);
			},
			getRadioGroup : function(radio) {
				// find radio group for specified radio button
				var name = radio.attr('name'), parentForm = radio.parents('form');

				if (name) {
					if (parentForm.length) {
						return parentForm.find('input[name="' + name + '"]');
					} else {
						return $('input[name="' + name + '"]:not(form input)');
					}
				} else {
					return radio;
				}
			},
			getLabelFor : function() {
				var parentLabel = this.realElement.closest('label'), elementId = this.realElement.prop('id');

				if (!parentLabel.length && elementId) {
					parentLabel = $('label[for="' + elementId + '"]');
				}
				return parentLabel.length ? parentLabel : null;
			},
			refreshRadioGroup : function() {
				// redraw current radio and its group
				this.getRadioGroup(this.realElement).each(function() {
					jcf.refresh(this);
				});
			},
			refresh : function() {
				// redraw current radio button
				var isChecked = this.realElement.is(':checked'), isDisabled = this.realElement.is(':disabled');

				this.fakeElement.toggleClass(this.options.checkedClass, isChecked).toggleClass(this.options.uncheckedClass, !isChecked).toggleClass(this.options.disabledClass, isDisabled);

				if (this.labelElement) {
					this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
				}
			},
			destroy : function() {
				// restore structure
				if (this.options.wrapNative) {
					this.realElement.insertBefore(this.fakeElement).css({
						position : '',
						width : '',
						height : '',
						opacity : '',
						margin : ''
					});
				} else {
					this.realElement.removeClass(this.options.hiddenClass);
				}

				// removing element will also remove its event handlers
				this.fakeElement.off('jcf-pointerdown', this.onPress);
				this.fakeElement.remove();

				// remove other event handlers
				this.doc.off('jcf-pointerup', this.onRelease);
				this.realElement.off({
					blur : this.onBlur,
					focus : this.onFocus,
					click : this.onRealClick
				});
			}
		});

	}(jQuery, this));

/*!
 * JCF - JavaScript Custom Forms - Checkbox Module
 */
;( function($, window) {
		'use strict';

		jcf.addModule({
			name : 'Checkbox',
			selector : 'input[type="checkbox"]',
			options : {
				wrapNative : true,
				checkedClass : 'jcf-checked',
				uncheckedClass : 'jcf-unchecked',
				labelActiveClass : 'jcf-label-active',
				fakeStructure : '<span class="jcf-checkbox"><span></span></span>'
			},
			matchElement : function(element) {
				return element.is(':checkbox');
			},
			init : function(options) {
				this.initStructure();
				this.attachEvents();
				this.refresh();
			},
			initStructure : function() {
				// prepare structure
				this.doc = $(document);
				this.realElement = $(this.options.element);
				this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
				this.labelElement = this.getLabelFor();

				if (this.options.wrapNative) {
					// wrap native checkbox inside fake block
					this.realElement.appendTo(this.fakeElement).css({
						position : 'absolute',
						height : '100%',
						width : '100%',
						opacity : 0,
						margin : 0
					});
				} else {
					// just hide native checkbox
					this.realElement.addClass(this.options.hiddenClass);
				}
			},
			attachEvents : function() {
				// add event handlers
				this.realElement.on({
					focus : this.onFocus,
					click : this.onRealClick
				});
				this.fakeElement.on('click', this.onFakeClick);
				this.fakeElement.on('jcf-pointerdown', this.onPress);
			},
			onRealClick : function() {
				// just redraw fake element
				this.refresh();
			},
			onFakeClick : function(e) {
				// skip event if clicked on real element inside wrapper
				if (this.options.wrapNative && this.realElement.is(e.target)) {
					return;
				}

				// toggle checked class
				if (!this.realElement.is(':disabled')) {
					this.realElement.prop('checked', !this.realElement.prop('checked'));
					this.refresh();
					this.realElement.trigger('change');
				}
			},
			onFocus : function() {
				if (!this.pressedFlag || !this.focusedFlag) {
					this.fakeElement.addClass(this.options.focusClass);

					this.focusedFlag = true;
					this.realElement.on('blur', this.onBlur);
				}
			},
			onBlur : function() {
				if (!this.pressedFlag) {
					this.fakeElement.removeClass(this.options.focusClass);

					this.focusedFlag = false;
					this.realElement.off('blur', this.onBlur);
				}
			},
			onPress : function() {
				if (!this.focusedFlag) {
					this.realElement.focus();
				}
				this.pressedFlag = true;
				this.fakeElement.addClass(this.options.pressedClass);
				this.doc.on('jcf-pointerup', this.onRelease);
			},
			onRelease : function() {
				if (this.focusedFlag) {
					this.realElement.focus();
				}
				this.pressedFlag = false;
				this.fakeElement.removeClass(this.options.pressedClass);
				this.doc.off('jcf-pointerup', this.onRelease);
			},
			getLabelFor : function() {
				var parentLabel = this.realElement.closest('label'), elementId = this.realElement.prop('id');

				if (!parentLabel.length && elementId) {
					parentLabel = $('label[for="' + elementId + '"]');
				}
				return parentLabel.length ? parentLabel : null;
			},
			refresh : function() {
				// redraw custom checkbox
				var isChecked = this.realElement.is(':checked'), isDisabled = this.realElement.is(':disabled');

				this.fakeElement.toggleClass(this.options.checkedClass, isChecked).toggleClass(this.options.uncheckedClass, !isChecked).toggleClass(this.options.disabledClass, isDisabled);

				if (this.labelElement) {
					this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
				}
			},
			destroy : function() {
				// restore structure
				if (this.options.wrapNative) {
					this.realElement.insertBefore(this.fakeElement).css({
						position : '',
						width : '',
						height : '',
						opacity : '',
						margin : ''
					});
				} else {
					this.realElement.removeClass(this.options.hiddenClass);
				}

				// removing element will also remove its event handlers
				this.fakeElement.off('jcf-pointerdown', this.onPress);
				this.fakeElement.remove();

				// remove other event handlers
				this.doc.off('jcf-pointerup', this.onRelease);
				this.realElement.off({
					focus : this.onFocus,
					click : this.onRealClick
				});
			}
		});

	}(jQuery, this));

/*!
 * JCF - JavaScript Custom Forms - Scrollbars Module
 */
;( function($, window) {
		'use strict';

		jcf.addModule({
			name : 'Scrollable',
			selector : '.jcf-scrollable',
			plugins : {
				ScrollBar : ScrollBar
			},
			options : {
				mouseWheelStep : 150,
				handleResize : true,
				alwaysShowScrollbars : false,
				alwaysPreventMouseWheel : false,
				scrollAreaStructure : '<div class="jcf-scrollable-wrapper"></div>'
			},
			matchElement : function(element) {
				return element.is('.jcf-scrollable');
			},
			init : function(options) {
				this.initStructure();
				this.attachEvents();
				this.rebuildScrollbars();
			},
			initStructure : function() {
				// prepare structure
				this.doc = $(document);
				this.win = $(window);
				this.realElement = $(this.options.element);
				this.scrollWrapper = $(this.options.scrollAreaStructure).insertAfter(this.realElement);

				// set initial styles
				this.scrollWrapper.css('position', 'relative');
				this.realElement.css('overflow', 'hidden');
				this.vBarEdge = 0;
			},
			attachEvents : function() {
				// create scrollbars
				var self = this;
				this.vBar = new ScrollBar({
					holder : this.scrollWrapper,
					vertical : true,
					onScroll : function(scrollTop) {
						self.realElement.scrollTop(scrollTop);
					}
				});
				this.hBar = new ScrollBar({
					holder : this.scrollWrapper,
					vertical : false,
					onScroll : function(scrollLeft) {
						self.realElement.scrollLeft(scrollLeft);
					}
				});

				// add event handlers
				this.realElement.on('scroll', this.onScroll);
				if (this.options.handleResize) {
					this.win.on('resize orientationchange load', this.onResize);
				}

				// add pointer/wheel event handlers
				this.realElement.on('jcf-mousewheel', this.onMouseWheel);
				this.realElement.on('jcf-pointerdown', this.onTouchBody);
			},
			onScroll : function() {
				this.redrawScrollbars();
			},
			onResize : function() {
				this.rebuildScrollbars();
			},
			onTouchBody : function(e) {
				if (e.pointerType === 'touch') {
					this.touchData = {
						scrollTop : this.realElement.scrollTop(),
						scrollLeft : this.realElement.scrollLeft(),
						left : e.pageX,
						top : e.pageY
					};
					this.doc.on({
						'jcf-pointermove' : this.onMoveBody,
						'jcf-pointerup' : this.onReleaseBody
					});
				}
			},
			onMoveBody : function(e) {
				if (e.pointerType === 'touch') {
					e.preventDefault();
					this.realElement.scrollLeft(this.touchData.scrollLeft - e.pageX + this.touchData.left);
					this.realElement.scrollTop(this.touchData.scrollTop - e.pageY + this.touchData.top);
				}
			},
			onReleaseBody : function(e) {
				if (e.pointerType === 'touch') {
					delete this.touchData;
					this.doc.off({
						'jcf-pointermove' : this.onMoveBody,
						'jcf-pointerup' : this.onReleaseBody
					});
				}
			},
			onMouseWheel : function(e) {
				var currentScrollTop = this.realElement.scrollTop(), currentScrollLeft = this.realElement.scrollLeft(), maxScrollTop = this.realElement.prop('scrollHeight') - this.embeddedDimensions.innerHeight, maxScrollLeft = this.realElement.prop('scrollWidth') - this.embeddedDimensions.innerWidth, extraLeft, extraTop;

				// check edge cases
				if (!this.options.alwaysPreventMouseWheel) {
					if (this.verticalScrollActive) {
						if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
							return;
						}
					}
					if (this.horizontalScrollActive) {
						if ((currentScrollLeft <= 0 && e.deltaX < 0) || (currentScrollLeft >= maxScrollLeft && e.deltaX > 0)) {
							return;
						}
					}
				}

				// prevent default action and scroll item
				e.preventDefault();

				extraLeft = e.deltaX / 100 * this.options.mouseWheelStep;
				extraTop = e.deltaY / 100 * this.options.mouseWheelStep;

				this.realElement.scrollTop(currentScrollTop + extraTop);
				this.realElement.scrollLeft(currentScrollLeft + extraLeft);
			},
			setScrollBarEdge : function(edgeSize) {
				this.vBarEdge = edgeSize || 0;
				this.redrawScrollbars();
			},
			saveElementDimensions : function() {
				this.savedDimensions = {
					top : this.realElement.width(),
					left : this.realElement.height()
				};
				return this;
			},
			restoreElementDimensions : function() {
				if (this.savedDimensions) {
					this.realElement.css({
						width : this.savedDimensions.width,
						height : this.savedDimensions.height
					});
				}
				return this;
			},
			saveScrollOffsets : function() {
				this.savedOffsets = {
					top : this.realElement.scrollTop(),
					left : this.realElement.scrollLeft()
				};
				return this;
			},
			restoreScrollOffsets : function() {
				if (this.savedOffsets) {
					this.realElement.scrollTop(this.savedOffsets.top);
					this.realElement.scrollLeft(this.savedOffsets.left);
				}
				return this;
			},
			getContainerDimensions : function() {
				// save current styles
				var desiredDimensions, currentStyles, currentHeight, currentWidth;
				//console.log("getContainerDimensions: this.realElement.innerWidth()", this.realElement.innerWidth());
				//console.log("getContainerDimensions: this.realElement.innerHeight()", this.realElement.innerHeight());
				if (this.isModifiedStyles) {
					//console.log("isModifiedStyles");
					//console.log("this.realElement.innerHeight()",this.realElement.innerHeight());
					//console.log("this.hBar.getThickness()",this.hBar.getThickness());
					desiredDimensions = {
						width : this.realElement.innerWidth() + this.vBar.getThickness(),
						height : this.realElement.innerHeight() + this.hBar.getThickness()
					};
				} else {
					//console.log("unwrap real element");
					// unwrap real element and measure it according to CSS
					this.saveElementDimensions().saveScrollOffsets();
					this.realElement.insertAfter(this.scrollWrapper);
					this.scrollWrapper.detach();

					// measure element
					currentStyles = this.realElement.prop('style'), currentWidth = parseFloat(currentStyles.width), currentHeight = parseFloat(currentStyles.height);

					// reset styles if needed
					if (this.embeddedDimensions && currentWidth && currentHeight) {
						//console.log("reset styles");
						this.isModifiedStyles |= (currentWidth !== this.embeddedDimensions.width || currentHeight !== this.embeddedDimensions.height);
						this.realElement.css({
							overflow : '',
							width : '',
							height : ''
						});
					}
					//console.log("reset styles");
					//console.log("this.realElement.outerHeight()",this.realElement.outerHeight());

					// calculate desired dimensions for real element
					desiredDimensions = {
						width : this.realElement.outerWidth(),
						height : this.realElement.outerHeight()
					};

					// restore structure and original scroll offsets
					this.scrollWrapper.insertAfter(this.realElement);
					this.realElement.css('overflow', 'hidden').prependTo(this.scrollWrapper);
					this.restoreElementDimensions().restoreScrollOffsets();
				}

				return desiredDimensions;
			},
			getEmbeddedDimensions : function(dimensions) {
				// handle scrollbars cropping
				var fakeBarWidth = this.vBar.getThickness(), fakeBarHeight = this.hBar.getThickness(), paddingWidth = this.realElement.outerWidth() - this.realElement.width(), paddingHeight = this.realElement.outerHeight() - this.realElement.height(), resultDimensions;

				if (this.options.alwaysShowScrollbars) {
					// simply return dimensions without custom scrollbars
					this.verticalScrollActive = true;
					this.horizontalScrollActive = true;
					resultDimensions = {
						innerWidth : dimensions.width - fakeBarWidth,
						innerHeight : dimensions.height - fakeBarHeight
					};
				} else {
					// detect when to display each scrollbar
					this.saveElementDimensions();
					this.verticalScrollActive = false;
					this.horizontalScrollActive = false;

					// fill container with full size
					this.realElement.css({
						width : dimensions.width - paddingWidth,
						height : dimensions.height - paddingHeight
					});

					this.horizontalScrollActive = this.realElement.prop('scrollWidth') > this.containerDimensions.width;
					this.verticalScrollActive = this.realElement.prop('scrollHeight') > this.containerDimensions.height;

					this.restoreElementDimensions();
					resultDimensions = {
						innerWidth : dimensions.width - (this.verticalScrollActive ? fakeBarWidth : 0),
						innerHeight : dimensions.height - (this.horizontalScrollActive ? fakeBarHeight : 0)
					};
				}
				$.extend(resultDimensions, {
					width : resultDimensions.innerWidth - paddingWidth,
					height : resultDimensions.innerHeight - paddingHeight
				});
				return resultDimensions;
			},
			rebuildScrollbars : function() {
				// resize wrapper according to real element styles
				this.containerDimensions = this.getContainerDimensions();
				this.embeddedDimensions = this.getEmbeddedDimensions(this.containerDimensions);

				// resize wrapper to desired dimensions
				this.scrollWrapper.css({
					width : this.containerDimensions.width,
					height : this.containerDimensions.height
				});
				//console.log("rebuildScrollbars: this.containerDimensions.height",this.containerDimensions.height);
				//console.log("rebuildScrollbars: this.embeddedDimensions.height",this.embeddedDimensions.height);
				// resize element inside wrapper excluding scrollbar size
				this.realElement.css({
					overflow : 'hidden',
					width : this.embeddedDimensions.width,
					height : this.embeddedDimensions.height
				});

				// redraw scrollbar offset
				this.redrawScrollbars();
			},
			redrawScrollbars : function() {
				var viewSize, maxScrollValue;

				// redraw vertical scrollbar
				if (this.verticalScrollActive) {
					viewSize = this.vBarEdge ? this.containerDimensions.height - this.vBarEdge : this.embeddedDimensions.innerHeight;
					maxScrollValue = this.realElement.prop('scrollHeight') - this.vBarEdge;

					this.vBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
					this.vBar.setValue(this.realElement.scrollTop());
				} else {
					this.vBar.hide();
				}

				// redraw horizontal scrollbar
				if (this.horizontalScrollActive) {
					viewSize = this.embeddedDimensions.innerWidth;
					maxScrollValue = this.realElement.prop('scrollWidth');

					if (maxScrollValue === viewSize) {
						this.horizontalScrollActive = false;
					}
					this.hBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
					this.hBar.setValue(this.realElement.scrollLeft());
				} else {
					this.hBar.hide();
				}

				// set "touch-action" style rule
				var touchAction = '';
				if (this.verticalScrollActive && this.horizontalScrollActive) {
					touchAction = 'none';
				} else if (this.verticalScrollActive) {
					touchAction = 'pan-x';
				} else if (this.horizontalScrollActive) {
					touchAction = 'pan-y';
				}
				this.realElement.css('touchAction', touchAction);
			},
			refresh : function() {
				this.rebuildScrollbars();
			},
			destroy : function() {
				// remove event listeners
				this.win.off('resize orientationchange load', this.onResize);
				this.realElement.off({
					'jcf-mousewheel' : this.onMouseWheel,
					'jcf-pointerdown' : this.onTouchBody
				});
				this.doc.off({
					'jcf-pointermove' : this.onMoveBody,
					'jcf-pointerup' : this.onReleaseBody
				});

				// restore structure
				this.saveScrollOffsets();
				this.vBar.destroy();
				this.hBar.destroy();
				this.realElement.insertAfter(this.scrollWrapper).css({
					touchAction : '',
					overflow : '',
					width : '',
					height : ''
				});
				this.scrollWrapper.remove();
				this.restoreScrollOffsets();
			}
		});

		// custom scrollbar
		function ScrollBar(options) {
			this.options = $.extend({
				holder : null,
				vertical : true,
				inactiveClass : 'jcf-inactive',
				verticalClass : 'jcf-scrollbar-vertical',
				horizontalClass : 'jcf-scrollbar-horizontal',
				scrollbarStructure : '<div class="jcf-scrollbar"><div class="jcf-scrollbar-dec"></div><div class="jcf-scrollbar-slider"><div class="jcf-scrollbar-handle"></div></div><div class="jcf-scrollbar-inc"></div></div>',
				btnDecSelector : '.jcf-scrollbar-dec',
				btnIncSelector : '.jcf-scrollbar-inc',
				sliderSelector : '.jcf-scrollbar-slider',
				handleSelector : '.jcf-scrollbar-handle',
				scrollInterval : 10,
				scrollStep : 5
			}, options);
			this.init();
		}


		$.extend(ScrollBar.prototype, {
			init : function() {
				this.initStructure();
				this.attachEvents();
			},
			initStructure : function() {
				// define proporties
				this.doc = $(document);
				this.isVertical = !!this.options.vertical;
				this.sizeProperty = this.isVertical ? 'height' : 'width';
				this.fullSizeProperty = this.isVertical ? 'outerHeight' : 'outerWidth';
				this.invertedSizeProperty = this.isVertical ? 'width' : 'height';
				this.thicknessMeasureMethod = 'outer' + this.invertedSizeProperty.charAt(0).toUpperCase() + this.invertedSizeProperty.substr(1);
				this.offsetProperty = this.isVertical ? 'top' : 'left';
				this.offsetEventProperty = this.isVertical ? 'pageY' : 'pageX';

				// initialize variables
				this.value = this.options.value || 0;
				this.maxValue = this.options.maxValue || 0;
				this.currentSliderSize = 0;
				this.handleSize = 0;

				// find elements
				this.holder = $(this.options.holder);
				this.scrollbar = $(this.options.scrollbarStructure).appendTo(this.holder);
				this.btnDec = this.scrollbar.find(this.options.btnDecSelector);
				this.btnInc = this.scrollbar.find(this.options.btnIncSelector);
				this.slider = this.scrollbar.find(this.options.sliderSelector);
				this.handle = this.slider.find(this.options.handleSelector);

				// set initial styles
				this.scrollbar.addClass(this.isVertical ? this.options.verticalClass : this.options.horizontalClass).css({
					touchAction : this.isVertical ? 'pan-x' : 'pan-y',
					position : 'absolute'
				});
				this.slider.css({
					position : 'relative'
				});
				this.handle.css({
					touchAction : 'none',
					position : 'absolute'
				});
			},
			attachEvents : function() {
				var self = this;
				this.bindHandlers();
				this.handle.on('jcf-pointerdown', this.onHandlePress);
				this.btnDec.add(this.btnInc).on('jcf-pointerdown', this.onButtonPress);
			},
			onHandlePress : function(e) {
				if (e.pointerType === 'mouse' && e.button > 1) {
					return;
				} else {
					e.preventDefault();
					this.sliderOffset = this.slider.offset()[this.offsetProperty];
					this.innerHandleOffset = e[this.offsetEventProperty] - this.handle.offset()[this.offsetProperty];

					this.doc.on('jcf-pointermove', this.onHandleDrag);
					this.doc.on('jcf-pointerup', this.onHandleRelease);
				}
			},
			onHandleDrag : function(e) {
				e.preventDefault();
				this.calcOffset = e[this.offsetEventProperty] - this.sliderOffset - this.innerHandleOffset;
				this.setValue(this.calcOffset / (this.currentSliderSize - this.handleSize) * this.maxValue);
				this.triggerScrollEvent(this.value);
			},
			onHandleRelease : function() {
				this.doc.off('jcf-pointermove', this.onHandleDrag);
				this.doc.off('jcf-pointerup', this.onHandleRelease);
			},
			onButtonPress : function(e) {
				var direction;
				if (e.pointerType === 'mouse' && e.button > 1) {
					return;
				} else {
					e.preventDefault();
					direction = this.btnDec.is(e.currentTarget) ? -1 : 1;
					this.startButtonScrolling(direction);
					this.doc.on('jcf-pointerup', this.onButtonRelease);
				}
			},
			onButtonRelease : function() {
				this.stopButtonScrolling();
				this.doc.off('jcf-pointerup', this.onButtonRelease);
			},
			startButtonScrolling : function(direction) {
				var self = this;
				this.stopButtonScrolling();
				this.scrollTimer = setInterval(function() {
					if (direction > 0) {
						self.value += self.options.scrollStep;
					} else {
						self.value -= self.options.scrollStep;
					}
					self.setValue(self.value);
					self.triggerScrollEvent(self.value);
				}, this.options.scrollInterval);
			},
			stopButtonScrolling : function() {
				clearInterval(this.scrollTimer);
			},
			triggerScrollEvent : function(scrollValue) {
				if (this.options.onScroll) {
					this.options.onScroll(scrollValue);
				}
			},
			getThickness : function() {
				return this.scrollbar[this.thicknessMeasureMethod]();
			},
			setSize : function(size) {
				// resize scrollbar
				var btnDecSize = this.btnDec[this.fullSizeProperty](), btnIncSize = this.btnInc[this.fullSizeProperty]();

				// resize slider
				this.currentSize = size;
				this.currentSliderSize = size - btnDecSize - btnIncSize;
				this.scrollbar.css(this.sizeProperty, size);
				this.slider.css(this.sizeProperty, this.currentSliderSize);
				this.currentSliderSize = this.slider[this.sizeProperty]();

				// resize handle
				this.handleSize = Math.round(this.currentSliderSize * this.ratio);
				this.handle.css(this.sizeProperty, this.handleSize);
				this.handleSize = this.handle[this.fullSizeProperty]();

				return this;
			},
			setRatio : function(ratio) {
				this.ratio = ratio;
				return this;
			},
			setMaxValue : function(maxValue) {
				this.maxValue = maxValue;
				this.setValue(Math.min(this.value, this.maxValue));
				return this;
			},
			setValue : function(value) {
				this.value = value;
				if (this.value < 0) {
					this.value = 0;
				} else if (this.value > this.maxValue) {
					this.value = this.maxValue;
				}
				this.refresh();
			},
			setPosition : function(styles) {
				this.scrollbar.css(styles);
				return this;
			},
			hide : function() {
				this.scrollbar.detach();
				return this;
			},
			show : function() {
				this.scrollbar.appendTo(this.holder);
				return this;
			},
			refresh : function() {
				// recalculate handle position
				if (this.value === 0 || this.maxValue === 0) {
					this.calcOffset = 0;
				} else {
					this.calcOffset = (this.value / this.maxValue) * (this.currentSliderSize - this.handleSize);
				}
				this.handle.css(this.offsetProperty, this.calcOffset);

				// toggle inactive classes
				this.btnDec.toggleClass(this.options.inactiveClass, this.value === 0);
				this.btnInc.toggleClass(this.options.inactiveClass, this.value === this.maxValue);
				this.scrollbar.toggleClass(this.options.inactiveClass, this.maxValue === 0);
			},
			destroy : function() {
				//remove event handlers and scrollbar block itself
				this.btnDec.add(this.btnInc).off('jcf-pointerdown', this.onButtonPress);
				this.handle.off('jcf-pointerdown', this.onHandlePress);
				this.doc.off('jcf-pointermove', this.onHandleDrag);
				this.doc.off('jcf-pointerup', this.onHandleRelease);
				this.doc.off('jcf-pointerup', this.onButtonRelease);
				clearInterval(this.scrollTimer);
				this.scrollbar.remove();
			}
		});

	}(jQuery, this));
/*
/*!
* JCF - JavaScript Custom Forms - File Input Module
*/
/*
;( function($, window) {
'use strict';

jcf.addModule({
name : 'File',
selector : 'input[type="file"]',
options : {
fakeStructure : '<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',
buttonText : 'Choose file',
placeholderText : 'No file chosen',
realElementClass : 'jcf-real-element',
extensionPrefixClass : 'jcf-extension-',
selectedFileBlock : '.jcf-fake-input',
buttonTextBlock : '.jcf-button-content'
},
matchElement : function(element) {
return element.is('input[type="file"]');
},
init : function(options) {
this.initStructure();
this.attachEvents();
this.refresh();
},
initStructure : function() {
this.doc = $(document);
this.realElement = $(this.options.element).addClass(this.options.realElementClass);
this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement);
this.fileNameBlock = this.fakeElement.find(this.options.selectedFileBlock);
this.buttonTextBlock = this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText);

this.realElement.appendTo(this.fakeElement).css({
position : 'absolute',
opacity : 0
});
},
attachEvents : function() {
this.realElement.on({
'jcf-pointerdown' : this.onPress,
'change' : this.onChange,
'focus' : this.onFocus
});
},
onChange : function() {
this.refresh();
},
onFocus : function() {
this.fakeElement.addClass(this.options.focusClass);
this.realElement.on('blur', this.onBlur);
},
onBlur : function() {
this.fakeElement.removeClass(this.options.focusClass);
this.realElement.off('blur', this.onBlur);
},
onPress : function() {
this.fakeElement.addClass(this.options.pressedClass);
this.doc.on('jcf-pointerup', this.onRelease);
},
onRelease : function() {
this.fakeElement.removeClass(this.options.pressedClass);
this.doc.off('jcf-pointerup', this.onRelease);
},
getFileName : function() {
return this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, '$1');
},
getFileExtension : function() {
var fileName = this.realElement.val();
return fileName.lastIndexOf('.') < 0 ? '' : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

},
updateExtensionClass : function() {
var currentExtension = this.getFileExtension(), currentClassList = this.fakeElement.prop('className'), cleanedClassList = currentClassList.replace(new RegExp('(\\s|^)' + this.options.extensionPrefixClass + '[^ ]+', 'gi'), '');

this.fakeElement.prop('className', cleanedClassList);
if (currentExtension) {
this.fakeElement.addClass(this.options.extensionPrefixClass + currentExtension);
}
},
refresh : function() {
var selectedFileName = this.getFileName() || this.options.placeholderText;
//console.log("this.getFileName() = ", this.getFileName());
//console.log("selectedFileName = ", selectedFileName);
this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
this.fileNameBlock.text(selectedFileName);
this.updateExtensionClass();
},
destroy : function() {
// reset styles and restore element position
this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({
position : '',
opacity : ''
});
this.fakeElement.remove();

// remove event handlers
this.realElement.off({
'jcf-pointerdown' : this.onPress,
'change' : this.onChange,
'focus' : this.onFocus,
'blur' : this.onBlur
});
this.doc.off('jcf-pointerup', this.onRelease);
}
});

}(jQuery, this));

/*
* jQuery upload files plugin
*/
// ;( function($) {
// function CustomUploadFiles(options) {
// this.options = $.extend({
// input : 'input[type=file]',
// uploadList : '.img-list',
// closeBtnClass : 'remove icon-cross',
// closeBtn : '.remove',
// url : window.location.hostname === 'blueimp.github.io' ? '//jquery-file-upload.appspot.com/' : 'server/php/',
// dropArea : '.drop-area',
// progressHolderStructure : ' <div id="progress" class="progress">',
// progressBarStructure : '<div class="progress-bar progress-bar-success">',
// progressCountStructure : '<span class="num"></span>',
// editStructure : '<a href="#" class="edit">Edit</a> <input type="checkbox">'
// }, options);
// this.init();
// }
//
//
// CustomUploadFiles.prototype = {
// init : function() {
// if (this.options.form) {
// this.findElements();
// this.attachEvents();
// }
// },
// findElements : function() {
// this.form = $(this.options.form);
// this.input = this.form.find(this.options.input);
// this.dropArea = this.form.find(this.options.dropArea);
// this.uploadList = jQuery(this.options.uploadList);
// },
// attachEvents : function() {
// var self = this;
//
// if ($.fn.fileupload) {
// this.input.fileupload({
// url : this.options.url,
// dataType : 'json',
// autoUpload : false,
// acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i,
// //maxFileSize : 5000000, // 5 MB
// // Enable image resizing, except for Android and Opera,
// // which actually support image resizing, but fail to
// // send Blob objects via XHR requests:
// disableImageResize : /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
// previewMaxWidth : 220,
// previewMaxHeight : 220,
// previewCrop : true,
// done : function(e, data) {
// if (data.files.length > 1) {
// return false;
// }
// $('.upload-form input[type=submit]').off('click').addClass('btn btn-primary').prop('disabled', true).on('click', function(event) {
// event.preventDefault();
// var $this = $(this), data = $this.data();
// $this.off('click').val('Abort').on('click', function() {
// $this.remove();
// data.abort();
// });
// data.submit();
// });
// //var lastCell = self.uploadList.find('>div:last');
// //lastCell.addClass('done');
// //jQuery(self.options.editStructure).appendTo(lastCell);
// },
// fail : function(e, t) {
// //console.log("fail");
// //alert('error');
// $('.upload-form #progress .progress-bar').css('width', '100%');
// $('.upload-form #progress .progress-bar').css('background-color', '#d9534f');
// $(".upload-form #progress .progress-bar").html("error");
//
// $('.upload-form input[type=submit]').off('click').addClass('btn btn-primary').prop('disabled', true).on('click', function(event) {
// event.preventDefault();
// var $this = $(this), data = $this.data();
// $this.off('click').val('Abort').on('click', function() {
// $this.remove();
// data.abort();
// });
// data.submit();
// });
// },
// progress : function(e, data) {
// //console.log("progress");
// if (data.files.length > 1) {
// return false;
// }
// var progress = parseInt(data.loaded / data.total * 100, 10);
// //console.log("data.loaded = ", data.loaded );
// //console.log(data.total)
// /*self.uploadList.find('.progress').css({
// width : progress + '%'
// });*/
// self.uploadList.find('.num').text((progress - 50) + '%\n');
// $('.upload-form #progress .progress-bar').css('width', (progress - 50) + '%');
// }
// }).on('fileuploadadd', function(e, data) {
// //console.log("self.uploadList.html() =", self.uploadList.html());
// if (self.uploadList.html() != "") {
// self.uploadList.empty();
// }
// if (data.files.length > 1) {
// alert('load only one file');
// return false;
// }
//
// data.context = $('<div/>').appendTo(self.uploadList);
// var cells = $('<div class="upload-area2 image-col"></div><div class="progress-col"></div>');
// var infoCell = cells.eq(cells.length - 1);
//
// cells.appendTo(data.context);
// //console.log("files = ", data.files);
// displayPreview(data.files);
// //console.log("timestamp :", getDate(e.timeStamp));
// console.log("timestamp to UTC - \ntimeStamp = "+e.timeStamp + "\nUTC = "+ (new Date(e.timeStamp)).toUTCString());
// $("#date").val(getDate(e.timeStamp));
// $.each(data.files, function(index, file) {
// $(".upload-form #size").val(bytesToSize(file.size, 2));
//
// if (!index) {
// var progressHolder = $(self.options.progressHolderStructure).appendTo(infoCell);
// var progressBar = $(self.options.progressBarStructure).appendTo(progressHolder);
// var progressCount = $(self.options.progressCountStructure).appendTo(progressBar);
// //node.append(uploadButton.clone(true).data(data));
// $($('<span class="fileName"><span/>').text(file.name)).appendTo('.progress-bar');
// //self.uploadList.find('.num').text(file.name);
// $('.upload-form input[type=submit]').data(data);
// }
// });
// var lastCell = self.uploadList.find('>div:last');
// lastCell.addClass('uploaded').siblings().removeClass('uploaded');
// }).on('fileuploadprocessalways', function(e, data) {
// //console.log("fileuploadprocessalways");
// var index = data.index, file = data.files[index], node = $(data.context.children()[index]);
// //console.log("file = ", file);
// //console.log("data.index = ", index);
// if (file.preview) {
// node.prepend(file.preview);
// }
// if (file.error) {
// node.append($('<span class="text-danger"/>').text(file.error));
// }
// if (index + 1 === data.files.length) {
// $('.upload-form input[type=submit]').val('Upload').prop('disabled', !!data.files.error);
// }
// }).on('fileuploaddone', function(e, data) {
// //console.log("data = ", data);
// //console.log("fileuploaddone");
// $.each(data.result.files, function(index, file) {
// if (file.url) {
// var link = $('<a>').attr('target', '_blank').prop('href', file.url);
// //console.log('data.context.children() = ', data.context.children());
// self.uploadList.find('.fileName').wrap(link);
// //if(self.uploadList==".files"){
// postImage(file);
// self.uploadList.find('.num').text('100%\n');
// $('.upload-form #progress .progress-bar').css('width', '100%');
// //}else if(self.uploadList==".upload-area"){
// // postCampaign(file);
// //}
//
// } else if (file.error) {
// var error = $('<span class="text-danger"/>').text(file.error);
// //$(data.context.children()[index]).append(error);
// //self.uploadList.find('.num').text('100%\n');
// $('.upload-form #progress .progress-bar').css('width', '100%');
// $('.upload-form #progress .progress-bar').css('background-color', '#d9534f');
// $(".upload-form #progress .progress-bar").html(error);
// }
// });
// }).on('fileuploadfail', function(e, data) {
// //console.log("fileuploadfail");
// $.each(data.files, function(index) {
// var error = $('<span class="text-danger"/>').text('File upload failed.');
// $()
// $(data.context.children()[index]).append(error);
// });
// }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
// }
// },
// makeCallback : function(name) {
// if ( typeof this.options[name] === 'function') {
// var args = Array.prototype.slice.call(arguments);
// args.shift();
// this.options[name].apply(this, args);
// }
// }
// };
//
// $.fn.customUploadFiles = function(opt) {
// return this.each(function() {
// $(this).data('CustomUploadFiles', new CustomUploadFiles($.extend({
// form : this
// }, opt)));
// });
// };
// }(jQuery));

// add class on click

// add class on click module
function AddClass(opt) {
	this.options = lib.extend({
		item : null,
		classAdd : 'add-class',
		addToParent : false,
		event : 'click'
	}, opt);
	if (this.options.item) {
		this.item = this.options.item;
		this.classItem = this.item;
		if (this.options.addToParent) {
			if ( typeof this.options.addToParent === 'boolean') {
				this.classItem = this.item.parentNode;
			} else {
				while (this.classItem.parentNode) {
					if (lib.hasClass(this.classItem.parentNode, this.options.addToParent)) {
						this.classItem = this.classItem.parentNode;
						break;
					}
					this.classItem = this.classItem.parentNode;
				}
			}
		}
		this.attachEvents();
	}
}

AddClass.prototype = {
	attachEvents : function() {
		var self = this;
		lib.event.add(this.item, this.options.event, function(e) {
			self.toggleClass();
			e.preventDefault();
		});
	},
	toggleClass : function() {
		if (lib.hasClass(this.classItem, this.options.classAdd)) {
			lib.removeClass(this.classItem, this.options.classAdd);
		} else {
			lib.addClass(this.classItem, this.options.classAdd);
		}
		var selectedImage = $(".thumbnail-block").find("li.selected");
		console.log("selectedImage.length = ", selectedImage.length);
		if (selectedImage.length == 1) {
			queue.campaignImage.clear();
			console.log("This element  = ", $(selectedImage).attr("value"));
			is_containImage($(selectedImage).attr("value"));
			clickCheckbox();
		} else if (selectedImage.length == 0) {
			upclickAllCheckbox();
			queue.campaignImage.clear();
		} else {
			upclickAllCheckbox();
			disableCheckbox();
		}
	}
};

/*
 * Utility module
 */
lib = {
	hasClass : function(el, cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : false;
	},
	addClass : function(el, cls) {
		if (el && !this.hasClass(el, cls)) {
			el.className += " " + cls;
		}
	},
	removeClass : function(el, cls) {
		if (el && this.hasClass(el, cls)) {
			el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
		}
	},
	extend : function(obj) {
		for (var i = 1; i < arguments.length; i++) {
			for (var p in arguments[i]) {
				if (arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	each : function(obj, callback) {
		var property, len;
		if ( typeof obj.length === 'number') {
			for ( property = 0, len = obj.length; property < len; property++) {
				if (callback.call(obj[property], property, obj[property]) === false) {
					break;
				}
			}
		} else {
			for (property in obj) {
				if (obj.hasOwnProperty(property)) {
					if (callback.call(obj[property], property, obj[property]) === false) {
						break;
					}
				}
			}
		}
	},
	event : ( function() {
			var fixEvent = function(e) {
				e = e || window.event;
				if (e.isFixed)
					return e;
				else
					e.isFixed = true;
				if (!e.target)
					e.target = e.srcElement;
				e.preventDefault = e.preventDefault ||
				function() {
					this.returnValue = false;
				};
				e.stopPropagation = e.stopPropagation ||
				function() {
					this.cancelBubble = true;
				};
				return e;
			};
			return {
				add : function(elem, event, handler) {
					if (!elem.events) {
						elem.events = {};
						elem.handle = function(e) {
							var ret, handlers = elem.events[e.type];
							e = fixEvent(e);
							for (var i = 0, len = handlers.length; i < len; i++) {
								if (handlers[i]) {
									ret = handlers[i].call(elem, e);
									if (ret === false) {
										e.preventDefault();
										e.stopPropagation();
									}
								}
							}
						};
					}
					if (!elem.events[event]) {
						elem.events[event] = [];
						if (elem.addEventListener)
							elem.addEventListener(event, elem.handle, false);
						else if (elem.attachEvent)
							elem.attachEvent('on' + event, elem.handle);
					}
					elem.events[event].push(handler);
				},
				remove : function(elem, event, handler) {
					var handlers = elem.events[event];
					for (var i = handlers.length - 1; i >= 0; i--) {
						if (handlers[i] === handler) {
							handlers.splice(i, 1);
						}
					}
					if (!handlers.length) {
						delete elem.events[event];
						if (elem.removeEventListener)
							elem.removeEventListener(event, elem.handle, false);
						else if (elem.detachEvent)
							elem.detachEvent('on' + event, elem.handle);
					}
				}
			};
		}()),
	queryElementsBySelector : function(selector, scope) {
		scope = scope || document;
		if (!selector)
			return [];
		if (selector === '>*')
			return scope.children;
		if ( typeof document.querySelectorAll === 'function') {
			return scope.querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for (var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/, '').replace(/\s+$/, '').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (element && tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = element ? [element] : [];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if (attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
					case '=':
						checkFunction = function(e) {
							return (e.getAttribute(attrName) == attrValue);
						};
						break;
					case '~':
						checkFunction = function(e) {
							return (e.getAttribute(attrName).match(new RegExp('(\\s|^)' + attrValue + '(\\s|$)')));
						};
						break;
					case '|':
						checkFunction = function(e) {
							return (e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?')));
						};
						break;
					case '^':
						checkFunction = function(e) {
							return (e.getAttribute(attrName).indexOf(attrValue) == 0);
						};
						break;
					case '$':
						checkFunction = function(e) {
							return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length);
						};
						break;
					case '*':
						checkFunction = function(e) {
							return (e.getAttribute(attrName).indexOf(attrValue) > -1);
						};
						break;
					default :
						checkFunction = function(e) {
							return e.getAttribute(attrName);
						};
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList, currentContext);
		}
		return resultList;
	},
	trim : function(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	bind : function(f, scope, forceArgs) {
		return function() {
			return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);
		};
	}
};

// DOM ready handler
function bindReady(handler) {
	var called = false;
	var ready = function() {
		if (called)
			return;
		called = true;
		handler();
	};
	if (document.addEventListener) {
		console.log("document.addEventListener");
		document.addEventListener('DOMContentLoaded', ready, false);
	} else if (document.attachEvent) {
		console.log("document.attachEvent");
		if (document.documentElement.doScroll && window == window.top) {
			console.log("document.documentElement.doScroll && window == window.top");
			var tryScroll = function() {
				if (called)
					return;
				if (!document.body)
					return;
				try {
					document.documentElement.doScroll('left');
					ready();
				} catch(e) {
					setTimeout(tryScroll, 0);
				}
			};
			tryScroll();
		}
		document.attachEvent('onreadystatechange', function() {
			console.log("document.attachEvent('onreadystatechange");
			if (document.readyState === 'complete') {
				ready();

			}
		});
	}
	if (window.addEventListener) {
		console.log("window.addEventListener");
		window.addEventListener('load', ready, false);
	} else if (window.attachEvent) {
		console.log("window.attachEvent");
		window.attachEvent('onload', ready);
	}
}

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function(B) {
	var L, T, Q, M, d, m, J, A, O, z, C = 0, H = {}, j = [], e = 0, G = {}, y = [], f = null, o = new Image(), i = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, k = /[^\.]\.(swf)\s*$/i, p, N = 1, h = 0, t = "", b, c, P = false, s = B.extend(B("<div/>")[0], {
		prop : 0
	}), S = /MSIE 6/.test(navigator.userAgent) && B.browser.version < 7 && !window.XMLHttpRequest, r = function() {
		T.hide();
		o.onerror = o.onload = null;
		if (f) {
			f.abort()
		}
		L.empty()
	}, x = function() {
		if (false === H.onError(j, C, H)) {
			T.hide();
			P = false;
			return
		}
		H.titleShow = false;
		H.width = "auto";
		H.height = "auto";
		L.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
		n()
	}, w = function() {
		var Z = j[C], W, Y, ab, aa, V, X;
		r();
		H = B.extend({}, B.fn.fancybox.defaults, ( typeof B(Z).data("fancybox") == "undefined" ? H : B(Z).data("fancybox")));
		X = H.onStart(j, C, H);
		if (X === false) {
			P = false;
			return
		} else {
			if ( typeof X == "object") {
				H = B.extend(H, X)
			}
		}
		ab = H.title || (Z.nodeName ? B(Z).attr("title") : Z.title) || "";
		if (Z.nodeName && !H.orig) {
			H.orig = B(Z).children("img:first").length ? B(Z).children("img:first") : B(Z)
		}
		if (ab === "" && H.orig && H.titleFromAlt) {
			ab = H.orig.attr("alt")
		}
		W = H.href || (Z.nodeName ? B(Z).attr("href") : Z.href) || null;
		if ((/^(?:javascript)/i).test(W) || W == "#") {
			W = null
		}
		if (H.type) {
			Y = H.type;
			if (!W) {
				W = H.content
			}
		} else {
			if (H.content) {
				Y = "html"
			} else {
				if (W) {
					if (W.match(i)) {
						Y = "image"
					} else {
						if (W.match(k)) {
							Y = "swf"
						} else {
							if (B(Z).hasClass("iframe")) {
								Y = "iframe"
							} else {
								if (W.indexOf("#") === 0) {
									Y = "inline"
								} else {
									Y = "ajax"
								}
							}
						}
					}
				}
			}
		}
		if (!Y) {
			x();
			return
		}
		if (Y == "inline") {
			Z = W.substr(W.indexOf("#"));
			Y = B(Z).length > 0 ? "inline" : "ajax"
		}
		H.type = Y;
		H.href = W;
		H.title = ab;
		if (H.autoDimensions) {
			if (H.type == "html" || H.type == "inline" || H.type == "ajax") {
				H.width = "auto";
				H.height = "auto"
			} else {
				H.autoDimensions = false
			}
		}
		if (H.modal) {
			H.overlayShow = true;
			H.hideOnOverlayClick = false;
			H.hideOnContentClick = false;
			H.enableEscapeButton = false;
			H.showCloseButton = false
		}
		H.padding = parseInt(H.padding, 10);
		H.margin = parseInt(H.margin, 10);
		L.css("padding", (H.padding + H.margin));
		B(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
			B(this).replaceWith(m.children())
		});
		switch(Y) {
		case"html":
			L.html(H.content);
			n();
			break;
		case"inline":
			if (B(Z).parent().is("#fancybox-content") === true) {
				P = false;
				return
			}
			B('<div class="fancybox-inline-tmp" />').hide().insertBefore(B(Z)).bind("fancybox-cleanup", function() {
				B(this).replaceWith(m.children())
			}).bind("fancybox-cancel", function() {
				B(this).replaceWith(L.children())
			});
			B(Z).appendTo(L);
			n();
			break;
		case"image":
			P = false;
			B.fancybox.showActivity();
			o = new Image();
			o.onerror = function() {
				x()
			};
			o.onload = function() {
				P = true;
				o.onerror = o.onload = null;
				F()
			};
			o.src = W;
			break;
		case"swf":
			H.scrolling = "no";
			aa = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + H.width + '" height="' + H.height + '"><param name="movie" value="' + W + '"></param>';
			V = "";
			B.each(H.swf, function(ac, ad) {
				aa += '<param name="' + ac + '" value="' + ad + '"></param>';
				V += " " + ac + '="' + ad + '"'
			});
			aa += '<embed src="' + W + '" type="application/x-shockwave-flash" width="' + H.width + '" height="' + H.height + '"' + V + "></embed></object>";
			L.html(aa);
			n();
			break;
		case"ajax":
			P = false;
			B.fancybox.showActivity();
			H.ajax.win = H.ajax.success;
			f = B.ajax(B.extend({}, H.ajax, {
				url : W,
				data : H.ajax.data || {},
				dataType : "text",
				error : function(ac, ae, ad) {
					if (ac.status > 0) {
						x()
					}
				},
				success : function(ad, af, ac) {
					var ae = typeof ac == "object" ? ac : f;
					if (ae.status == 200 || ae.status === 0) {
						if ( typeof H.ajax.win == "function") {
							X = H.ajax.win(W, ad, af, ac);
							if (X === false) {
								T.hide();
								return
							} else {
								if ( typeof X == "string" || typeof X == "object") {
									ad = X
								}
							}
						}
						L.html(ad);
						n()
					}
				}
			}));
			break;
		case"iframe":
			E();
			break
		}
	}, n = function() {
		var V = H.width, W = H.height;
		if (V.toString().indexOf("%") > -1) {
			V = parseInt((B(window).width() - (H.margin * 2)) * parseFloat(V) / 100, 10) + "px"
		} else {
			V = V == "auto" ? "auto" : V + "px"
		}
		if (W.toString().indexOf("%") > -1) {
			W = parseInt((B(window).height() - (H.margin * 2)) * parseFloat(W) / 100, 10) + "px"
		} else {
			W = W == "auto" ? "auto" : W + "px"
		}
		L.wrapInner('<div style="width:' + V + ";height:" + W + ";overflow: " + (H.scrolling == "auto" ? "auto" : (H.scrolling == "yes" ? "scroll" : "hidden")) + ';position:relative;"></div>');
		H.width = L.width();
		H.height = L.height();
		E()
	}, F = function() {
		H.width = o.width;
		H.height = o.height;
		B("<img />").attr({
			id : "fancybox-img",
			src : o.src,
			alt : H.title
		}).appendTo(L);
		E()
	}, E = function() {
		var W, V;
		T.hide();
		if (M.is(":visible") && false === G.onCleanup(y, e, G)) {
			B('.fancybox-inline-tmp').trigger('fancybox-cancel');
			P = false;
			return
		}
		P = true;
		B(m.add(Q)).unbind();
		B(window).unbind("resize.fb scroll.fb");
		B(document).unbind("keydown.fb");
		if (M.is(":visible") && G.titlePosition !== "outside") {
			M.css("height", M.height())
		}
		y = j;
		e = C;
		G = H;
		if (G.overlayShow) {
			Q.css({
				"background-color" : G.overlayColor,
				opacity : G.overlayOpacity,
				cursor : G.hideOnOverlayClick ? "pointer" : "auto",
				height : B(document).height()
			});
			if (!Q.is(":visible")) {
				if (S) {
					B("select:not(#fancybox-tmp select)").filter(function() {
						return this.style.visibility !== "hidden"
					}).css({
						visibility : "hidden"
					}).one("fancybox-cleanup", function() {
						this.style.visibility = "inherit"
					})
				}
				Q.show()
			}
		} else {
			Q.hide()
		}
		c = R();
		l();
		if (M.is(":visible")) {
			B(J.add(O).add(z)).hide();
			W = M.position(), b = {
				top : W.top,
				left : W.left,
				width : M.width(),
				height : M.height()
			};
			V = (b.width == c.width && b.height == c.height);
			m.fadeTo(G.changeFade, 0.3, function() {
				var X = function() {
					m.html(L.contents()).fadeTo(G.changeFade, 1, v)
				};
				B('.fancybox-inline-tmp').trigger('fancybox-change');
				m.empty().removeAttr("filter").css({
					"border-width" : G.padding,
					width : c.width - G.padding * 2,
					height : H.autoDimensions ? "auto" : c.height - h - G.padding * 2
				});
				if (V) {
					X()
				} else {
					s.prop = 0;
					B(s).animate({
						prop : 1
					}, {
						duration : G.changeSpeed,
						easing : G.easingChange,
						step : U,
						complete : X
					})
				}
			});
			return
		}
		M.removeAttr("style");
		m.css("border-width", G.padding);
		if (G.transitionIn == "elastic") {
			b = I();
			m.html(L.contents());
			M.show();
			if (G.opacity) {
				c.opacity = 0
			}
			s.prop = 0;
			B(s).animate({
				prop : 1
			}, {
				duration : G.speedIn,
				easing : G.easingIn,
				step : U,
				complete : v
			});
			return
		}
		if (G.titlePosition == "inside" && h > 0) {
			A.show()
		}
		m.css({
			width : c.width - G.padding * 2,
			height : H.autoDimensions ? "auto" : c.height - h - G.padding * 2
		}).html(L.contents());
		M.css(c).fadeIn(G.transitionIn == "none" ? 0 : G.speedIn, v)
	}, D = function(V) {
		if (V && V.length) {
			if (G.titlePosition == "float") {
				return '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + V + '</td><td id="fancybox-title-float-right"></td></tr></table>'
			}
			return '<div id="fancybox-title-' + G.titlePosition + '">' + V + "</div>"
		}
		return false
	}, l = function() {
		t = G.title || "";
		h = 0;
		A.empty().removeAttr("style").removeClass();
		if (G.titleShow === false) {
			A.hide();
			return
		}
		t = B.isFunction(G.titleFormat) ? G.titleFormat(t, y, e, G) : D(t);
		if (!t || t === "") {
			A.hide();
			return
		}
		A.addClass("fancybox-title-" + G.titlePosition).html(t).appendTo("body").show();
		switch(G.titlePosition) {
		case"inside":
			A.css({
				width : c.width - (G.padding * 2),
				marginLeft : G.padding,
				marginRight : G.padding
			});
			h = A.outerHeight(true);
			A.appendTo(d);
			c.height += h;
			break;
		case"over":
			A.css({
				marginLeft : G.padding,
				width : c.width - (G.padding * 2),
				bottom : G.padding
			}).appendTo(d);
			break;
		case"float":
			A.css("left", parseInt((A.width() - c.width - 40) / 2, 10) * -1).appendTo(M);
			break;
		default:
			A.css({
				width : c.width - (G.padding * 2),
				paddingLeft : G.padding,
				paddingRight : G.padding
			}).appendTo(M);
			break
		}
		A.hide()
	}, g = function() {
		if (G.enableEscapeButton || G.enableKeyboardNav) {
			B(document).bind("keydown.fb", function(V) {
				if (V.keyCode == 27 && G.enableEscapeButton) {
					V.preventDefault();
					B.fancybox.close()
				} else {
					if ((V.keyCode == 37 || V.keyCode == 39) && G.enableKeyboardNav && V.target.tagName !== "INPUT" && V.target.tagName !== "TEXTAREA" && V.target.tagName !== "SELECT") {
						V.preventDefault();
						B.fancybox[V.keyCode==37?"prev":"next"]()
					}
				}
			})
		}
		if (!G.showNavArrows) {
			O.hide();
			z.hide();
			return
		}
		if ((G.cyclic && y.length > 1) || e !== 0) {
			O.show()
		}
		if ((G.cyclic && y.length > 1) || e != (y.length - 1)) {
			z.show()
		}
	}, v = function() {
		if (B.support.opacity === false) {
			m.get(0).style.removeAttribute("filter");
			M.get(0).style.removeAttribute("filter")
		}
		if (H.autoDimensions) {
			m.css("height", "auto")
		}
		M.css("height", "auto");
		if (t && t.length) {
			A.show()
		}
		if (G.showCloseButton) {
			J.show()
		}
		g();
		if (G.hideOnContentClick) {
			m.bind("click", B.fancybox.close)
		}
		if (G.hideOnOverlayClick) {
			Q.bind("click", B.fancybox.close)
		}
		B(window).bind("resize.fb", B.fancybox.resize);
		if (G.centerOnScroll) {
			B(window).bind("scroll.fb", B.fancybox.center)
		}
		if (G.type == "iframe") {
			B('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' + (window.attachEvent ? 'allowtransparency="true""' : "") + ' scrolling="' + H.scrolling + '" src="' + G.href + '"></iframe>').appendTo(m)
		}
		M.show();
		P = false;
		B.fancybox.center();
		G.onComplete(y, e, G);
		K()
	}, K = function() {
		var V, W;
		if ((y.length - 1) > e) {
			V = y[e + 1].href;
			if ( typeof V !== "undefined" && V.match(i)) {
				W = new Image();
				W.src = V
			}
		}
		if (e > 0) {
			V = y[e - 1].href;
			if ( typeof V !== "undefined" && V.match(i)) {
				W = new Image();
				W.src = V
			}
		}
	}, U = function(W) {
		var V = {
			width : parseInt(b.width + (c.width - b.width) * W, 10),
			height : parseInt(b.height + (c.height - b.height) * W, 10),
			top : parseInt(b.top + (c.top - b.top) * W, 10),
			left : parseInt(b.left + (c.left - b.left) * W, 10)
		};
		if ( typeof c.opacity !== "undefined") {
			V.opacity = W < 0.5 ? 0.5 : W
		}
		M.css(V);
		m.css({
			width : V.width - G.padding * 2,
			height : V.height - (h * W) - G.padding * 2
		})
	}, u = function() {
		return [B(window).width() - (G.margin * 2), B(window).height() - (G.margin * 2), B(document).scrollLeft() + G.margin, B(document).scrollTop() + G.margin]
	}, R = function() {
		var V = u(), Z = {}, W = G.autoScale, X = G.padding * 2, Y;
		if (G.width.toString().indexOf("%") > -1) {
			Z.width = parseInt((V[0] * parseFloat(G.width)) / 100, 10)
		} else {
			Z.width = G.width + X
		}
		if (G.height.toString().indexOf("%") > -1) {
			Z.height = parseInt((V[1] * parseFloat(G.height)) / 100, 10)
		} else {
			Z.height = G.height + X
		}
		if (W && (Z.width > V[0] || Z.height > V[1])) {
			if (H.type == "image" || H.type == "swf") {
				Y = (G.width) / (G.height);
				if ((Z.width) > V[0]) {
					Z.width = V[0];
					Z.height = parseInt(((Z.width - X) / Y) + X, 10)
				}
				if ((Z.height) > V[1]) {
					Z.height = V[1];
					Z.width = parseInt(((Z.height - X) * Y) + X, 10)
				}
			} else {
				Z.width = Math.min(Z.width, V[0]);
				Z.height = Math.min(Z.height, V[1])
			}
		}
		Z.top = parseInt(Math.max(V[3] - 20, V[3] + ((V[1] - Z.height - 40) * 0.5)), 10);
		Z.left = parseInt(Math.max(V[2] - 20, V[2] + ((V[0] - Z.width - 40) * 0.5)), 10);
		return Z
	}, q = function(V) {
		var W = V.offset();
		W.top += parseInt(V.css("paddingTop"), 10) || 0;
		W.left += parseInt(V.css("paddingLeft"), 10) || 0;
		W.top += parseInt(V.css("border-top-width"), 10) || 0;
		W.left += parseInt(V.css("border-left-width"), 10) || 0;
		W.width = V.width();
		W.height = V.height();
		return W
	}, I = function() {
		var Y = H.orig ? B(H.orig) : false, X = {}, W, V;
		if (Y && Y.length) {
			W = q(Y);
			X = {
				width : W.width + (G.padding * 2),
				height : W.height + (G.padding * 2),
				top : W.top - G.padding - 20,
				left : W.left - G.padding - 20
			}
		} else {
			V = u();
			X = {
				width : G.padding * 2,
				height : G.padding * 2,
				top : parseInt(V[3] + V[1] * 0.5, 10),
				left : parseInt(V[2] + V[0] * 0.5, 10)
			}
		}
		return X
	}, a = function() {
		if (!T.is(":visible")) {
			clearInterval(p);
			return
		}
		B("div", T).css("top", (N * -40) + "px");
		N = (N + 1) % 12
	};
	B.fn.fancybox = function(V) {
		if (!B(this).length) {
			return this
		}
		B(this).data("fancybox", B.extend({}, V, (B.metadata ? B(this).metadata() : {}))).unbind("click.fb").bind("click.fb", function(X) {
			X.preventDefault();
			if (P) {
				return
			}
			P = true;
			B(this).blur();
			j = [];
			C = 0;
			var W = B(this).attr("rel") || "";
			if (!W || W == "" || W === "nofollow") {
				j.push(this)
			} else {
				j = B('a[rel="' + W + '"], area[rel="' + W + '"]');
				C = j.index(this)
			}
			w();
			return
		});
		return this
	};
	B.fancybox = function(Y) {
		var X;
		if (P) {
			return
		}
		P = true;
		X = typeof arguments[1] !== "undefined" ? arguments[1] : {};
		j = [];
		C = parseInt(X.index, 10) || 0;
		if (B.isArray(Y)) {
			for (var W = 0, V = Y.length; W < V; W++) {
				if ( typeof Y[W] == "object") {
					B(Y[W]).data("fancybox", B.extend({}, X, Y[W]))
				} else {
					Y[W] = B({}).data("fancybox", B.extend({
						content : Y[W]
					}, X))
				}
			}
			j = jQuery.merge(j, Y)
		} else {
			if ( typeof Y == "object") {
				B(Y).data("fancybox", B.extend({}, X, Y))
			} else {
				Y = B({}).data("fancybox", B.extend({
					content : Y
				}, X))
			}
			j.push(Y)
		}
		if (C > j.length || C < 0) {
			C = 0
		}
		w()
	};
	B.fancybox.showActivity = function() {
		clearInterval(p);
		T.show();
		p = setInterval(a, 66)
	};
	B.fancybox.hideActivity = function() {
		T.hide()
	};
	B.fancybox.next = function() {
		return B.fancybox.pos(e + 1)
	};
	B.fancybox.prev = function() {
		return B.fancybox.pos(e - 1)
	};
	B.fancybox.pos = function(V) {
		if (P) {
			return
		}
		V = parseInt(V);
		j = y;
		if (V > -1 && V < y.length) {
			C = V;
			w()
		} else {
			if (G.cyclic && y.length > 1) {
				C = V >= y.length ? 0 : y.length - 1;
				w()
			}
		}
		return
	};
	B.fancybox.cancel = function() {
		if (P) {
			return
		}
		P = true;
		B('.fancybox-inline-tmp').trigger('fancybox-cancel');
		r();
		H.onCancel(j, C, H);
		P = false
	};
	B.fancybox.close = function() {
		if (P || M.is(":hidden")) {
			return
		}
		P = true;
		if (G && false === G.onCleanup(y, e, G)) {
			P = false;
			return
		}
		r();
		B(J.add(O).add(z)).hide();
		B(m.add(Q)).unbind();
		B(window).unbind("resize.fb scroll.fb");
		B(document).unbind("keydown.fb");
		if (G.type === "iframe") {
			m.find("iframe").attr("src", S && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank")
		}
		if (G.titlePosition !== "inside") {
			A.empty()
		}
		M.stop();
		function V() {
			Q.fadeOut("fast");
			A.empty().hide();
			M.hide();
			B('.fancybox-inline-tmp').trigger('fancybox-cleanup');
			m.empty();
			G.onClosed(y, e, G);
			y = H = [];
			e = C = 0;
			G = H = {};
			P = false
		}

		if (G.transitionOut == "elastic") {
			b = I();
			var W = M.position();
			c = {
				top : W.top,
				left : W.left,
				width : M.width(),
				height : M.height()
			};
			if (G.opacity) {
				c.opacity = 1
			}
			A.empty().hide();
			s.prop = 1;
			B(s).animate({
				prop : 0
			}, {
				duration : G.speedOut,
				easing : G.easingOut,
				step : U,
				complete : V
			})
		} else {
			M.fadeOut(G.transitionOut == "none" ? 0 : G.speedOut, V)
		}
	};
	B.fancybox.resize = function() {
		if (Q.is(":visible")) {
			Q.css("height", B(document).height())
		}
		B.fancybox.center(true)
	};
	B.fancybox.center = function() {
		var V, W;
		if (P) {
			return
		}
		W = arguments[0] === true ? 1 : 0;
		V = u();
		if (!W && (M.width() > V[0] || M.height() > V[1])) {
			return
		}
		M.stop().animate({
			top : parseInt(Math.max(V[3] - 20, V[3] + ((V[1] - m.height() - 40) * 0.5) - G.padding)),
			left : parseInt(Math.max(V[2] - 20, V[2] + ((V[0] - m.width() - 40) * 0.5) - G.padding))
		}, typeof arguments[0] == "number" ? arguments[0] : 200)
	};
	B.fancybox.init = function() {
		if (B("#fancybox-wrap").length) {
			return
		}
		B("body").append( L = B('<div id="fancybox-tmp"></div>'), T = B('<div id="fancybox-loading"><div></div></div>'), Q = B('<div id="fancybox-overlay"></div>'), M = B('<div id="fancybox-wrap"></div>'));
		d = B('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(M);
		d.append( m = B('<div id="fancybox-content"></div>'), J = B('<a id="fancybox-close"></a>'), A = B('<div id="fancybox-title"></div>'), O = B('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), z = B('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
		J.click(B.fancybox.close);
		T.click(B.fancybox.cancel);
		O.click(function(V) {
			V.preventDefault();
			B.fancybox.prev()
		});
		z.click(function(V) {
			V.preventDefault();
			B.fancybox.next()
		});
		if (B.fn.mousewheel) {
			M.bind("mousewheel.fb", function(V, W) {
				if (P) {
					V.preventDefault()
				} else {
					if (B(V.target).get(0).clientHeight == 0 || B(V.target).get(0).scrollHeight === B(V.target).get(0).clientHeight) {
						V.preventDefault();
						B.fancybox[W>0?"prev":"next"]()
					}
				}
			})
		}
		if (B.support.opacity === false) {
			M.addClass("fancybox-ie")
		}
		if (S) {
			T.addClass("fancybox-ie6");
			M.addClass("fancybox-ie6");
			B('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(d)
		}
	};
	B.fn.fancybox.defaults = {
		padding : 10,
		margin : 40,
		opacity : false,
		modal : false,
		cyclic : false,
		scrolling : "auto",
		width : 560,
		height : 340,
		autoScale : true,
		autoDimensions : true,
		centerOnScroll : false,
		ajax : {},
		swf : {
			wmode : "transparent"
		},
		hideOnOverlayClick : true,
		hideOnContentClick : false,
		overlayShow : true,
		overlayOpacity : 0.7,
		overlayColor : "#777",
		titleShow : true,
		titlePosition : "float",
		titleFormat : null,
		titleFromAlt : false,
		transitionIn : "fade",
		transitionOut : "fade",
		speedIn : 300,
		speedOut : 300,
		changeSpeed : 300,
		changeFade : "fast",
		easingIn : "swing",
		easingOut : "swing",
		showCloseButton : true,
		showNavArrows : true,
		enableEscapeButton : true,
		enableKeyboardNav : true,
		onStart : function() {
		},
		onCancel : function() {
		},
		onComplete : function() {
		},
		onCleanup : function() {
		},
		onClosed : function() {
		},
		onError : function() {
		}
	};
	B(document).ready(function() {
		B.fancybox.init()
	})
})(jQuery);