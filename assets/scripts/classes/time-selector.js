
var TimeSelector = function ($el, objOptions) {

	this.el = $el;
	this.options = $.extend({
		selectorHour: '.hour',
		selectorMinute: '.minute',
		selectorAmpm: '.ampm',
		date: null
	}, objOptions || {});

	this.elHour = this.el.find(this.options.selectorHour);
	this.elMinute = this.el.find(this.options.selectorMinute);
	this.elAmpm = this.el.find(this.options.selectorAmpm);

	this.date = this.options.date || new Date();

	this._bindEvents();

	this.setTime();

};

TimeSelector.prototype = {
	_bindEvents: function () {
		var self = this;

		this.el.on('change', 'select', function (e) {
			self.__onSelectChange(e);
		});

	},

	__onSelectChange: function (e) {
		this.getTime();
	},


/**
*	Public Methods
**/

	getTime: function () {
		var ampm = this.elAmpm.val();
		var hour = this.elHour.val() *1;
		var minute = this.elMinute.val() *1;
		if (ampm === 'AM' && hour === 12) {
			hour = 0;
		}
		if (ampm === 'PM' && hour !== 12) {
			hour = hour +12;
		}

		this.date.setHours(hour);
		this.date.setMinutes(minute);

		$.event.trigger('TimeSelector:gotTime', [this.date]);

	},

	setTime: function () {
		var ampm = 'AM';
		var hour = this.date.getHours();
		var minute = this.date.getMinutes();
		minute = Math.floor(minute / 5) * 5;
		if (hour === 12) {
			ampm = 'PM';
		}
		if (hour > 12) {
			hour = hour -12;
			ampm = 'PM';
		}
		if (hour === 0) {
			hour = 12;
		}

		this.elHour.val(hour);
		this.elMinute.val(minute);
		this.elAmpm.val(ampm);

		this.date.setSeconds(1);
		this.date.setMinutes(minute);

	}

};
