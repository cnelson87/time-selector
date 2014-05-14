
var TimeSelector = function(el, objOptions) {

	this.el = el;
	this.$el = $(el);
	this.options = $.extend({
		selectorHour: '.hour',
		selectorMinute: '.minute',
		selectorAmpm: '.ampm',
		date: null
	}, objOptions || {});

	this._init();

};

TimeSelector.prototype = {
	_init: function() {

		this.date = this.options.date ? moment(this.options.date).toDate() : new Date();

		this.elSelects = this.$el.find('select');
		this.elHour = this.elSelects.filter(this.options.selectorHour);
		this.elMinute = this.elSelects.filter(this.options.selectorMinute);
		this.elAmpm = this.elSelects.filter(this.options.selectorAmpm);

		this._initSelectors();

		this._bindEvents();

	},

	_initSelectors: function() {
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

	},

	_bindEvents: function() {

		this.elSelects.on('change', function(e) {
			this.__onSelectChange(e);
		}.bind(this));

	},

	__onSelectChange: function(e) {
		this.getTime();
	},


/**
*	Public Methods
**/

	getTime: function() {
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


};
