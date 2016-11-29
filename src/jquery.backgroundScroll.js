(function($) {
	$.fn.extend({
		backgroundScroll: function(options) {
			//Plugin Name
			var _pluginName = 'backgroundScroll';
			var _version = '1.0.0';

			//Defaults
			var defaults = {
				wrapBoxSelector: 'body',
				imagesPath: 'images/background.jpg'
			}

			//Can't find the target
			if (this.length < 1) {
				console.log('警告：找不到' + options.contentBoxSelector + '！');
				return;
			}
			var options = $.extend({}, defaults, options);

			var _wrap = $(options.wrapBoxSelector);
			var _box = this;

			var _view_finder, __view_finderScroller;
			if (defaults.wrapBoxSelector === options.wrapBoxSelector) {
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
			}

			var _bgHeight;
			_loadImage(options.imagesPath, function(img) {
				_bgHeight = img.height;
				_wrap.css('background-image', 'url("' + options.imagesPath + '")');
				if (_view_finder !== _view_finderScroller) {
					_wrap.css('background-attachment', 'fixed');
				}
				_wrap.css('background-repeat', 'no-repeat');

				$(_wrap).on("load resize", scrollingEvent);
				$(_view_finderScroller).on("scroll", scrollingEvent);
				scrollingEvent();
			});

			scrollingEvent = function(e) {
				var _boxHeight = _box.height();
				var _scrollerLength = (_view_finder !== _view_finderScroller) ? 0 : $.scrollbarWidth();
				var _view_finderHeight = $(_view_finder).height();
				var scrollTop = $(_view_finderScroller).scrollTop();

				if (_boxHeight > _bgHeight) {
						_wrap.css('background-position', '0px -' + (scrollTop) * (_bgHeight - _view_finderHeight + _scrollerLength) / (_boxHeight - _view_finderHeight + _scrollerLength) + 'px');

				} else if (_boxHeight < _bgHeight) {
					if (_boxHeight > _view_finderHeight) {
						_wrap.css('background-position', '0px -' + (scrollTop) * (_bgHeight - _view_finderHeight + _scrollerLength) / (_boxHeight - _view_finderHeight + _scrollerLength) + 'px');
					}

				}
			}
			return this;
			//return this.each(function(index, element) {});
		}
	});

})(window.jQuery)
