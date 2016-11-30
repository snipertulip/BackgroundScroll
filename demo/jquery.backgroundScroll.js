(function($) {
	$.fn.backgroundScroll = function(options) {
		//Defaults
		var defaults = {
			wrapBoxSelector: 'body',
			imagesPath: 'images/background.jpg'
		};

		//Plugin Name
		var _pluginName = 'backgroundScroll';
		var _version = '1.0.0';

		var options = $.extend({}, defaults, options);

		//Auto select the parent wrap of this div.
		if ($(this).parent()[0].tagName.toLowerCase() !== 'body') {
			options.wrapBoxSelector = '#' + $(this).parent()[0].id;
		}

		//Can't find the target
		if ($(this).length < 1) {
			console.log('Warning：Can\'t find the' + options.wrapBoxSelector + '！');
			return;
		}

		var _wrap = $(options.wrapBoxSelector);
		var _box = $(this);

		var _view_finder, __view_finderScroller;

		if (options.wrapBoxSelector === 'body') {
			_view_finder = window;
			_view_finderScroller = document;
		} else {
			_view_finder = _view_finderScroller = _wrap;
		}

		var _loadImage = function(url, callback) {
			var img = new Image();
			img.onload =
				function() {
					img.onload = null;
					callback(img);
				}

			img.src = url;
		};

		if (options.wrapBoxSelector === 'body') {
			_wrap.css('background-attachment', 'fixed');
		} else {
			_wrap.css('background-attachment', 'scroll');
		}
		_wrap.css('background-repeat', 'no-repeat');

		var _bgHeight;
		_loadImage(options.imagesPath, function(img) {
			_bgHeight = img.height;
			_wrap.css('background-image', 'url("' + options.imagesPath + '")');
		});

		var scrollingEvent = function(e) {
			var _boxHeight = _box.height();
			var _scrollerLength = (options.wrapBoxSelector === 'body') ? 0 : $.scrollbarWidth();
			var _view_finderHeight = $(_view_finder).height();
			var scrollTop = $(options.wrapBoxSelector).scrollTop();
			//IE compatibility
			if (options.wrapBoxSelector === 'body') scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

			if (_boxHeight > _bgHeight) {
				_wrap.css('background-position', '0px -' + scrollTop * (_bgHeight - _view_finderHeight + _scrollerLength) / (_boxHeight - _view_finderHeight + _scrollerLength) + 'px');

			} else if (_boxHeight < _bgHeight) {
				if (_boxHeight > _view_finderHeight) {
					_wrap.css('background-position', '0px -' + scrollTop * (_bgHeight - _view_finderHeight + _scrollerLength) / (_boxHeight - _view_finderHeight + _scrollerLength) + 'px');
				}
			}
		};

		if (options.wrapBoxSelector === 'body') {
			$(window).on("load resize scroll", scrollingEvent);
			//IE [9 , 7] compatibility is window scroll
			//$(document).on("scroll", scrollingEvent);

		} else {
			$(_view_finder).on("load resize", scrollingEvent);
			$(_view_finderScroller).on("scroll", scrollingEvent);
		}
		return this;
		//return this.each(function(index, element) {});
	}

})(window.jQuery)
