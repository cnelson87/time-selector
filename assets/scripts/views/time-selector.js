
var TimeSelector = Backbone.View.extend({
	tagName: 'fieldset',
	className: 'time-selector',
	template: null,
	date: null,
	events: {
		'change select': '__onSelectChange'
	},

	initialize: function () {

		this.date = this.options.date ? moment(this.options.date).toDate() : new Date();

		// TODO: un-hard-coded template
		this.template = $('#tmpTimeSelector').html();
		this.render();

		this.elHour = this.el.querySelector('.hour');
		this.elMinute = this.el.querySelector('.minute');
		this.elAmpm = this.el.querySelector('.ampm');

		this._initSelectors();

	},

	_initSelectors: function () {
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

		this.elHour.value = hour;
		this.elMinute.value = minute;
		this.elAmpm.value = ampm;

		this.date.setSeconds(1);
		this.date.setMinutes(minute);

	},

	__onSelectChange: function (e) {
		this.getTime();
	},

	getTime: function () {
		var ampm = this.elAmpm.value;
		var hour = this.elHour.value *1;
		var minute = this.elMinute.value *1;
		if (ampm === 'AM' && hour === 12) {
			hour = 0;
		}
		if (ampm === 'PM' && hour !== 12) {
			hour = hour +12;
		}

		this.date.setHours(hour);
		this.date.setMinutes(minute);

		$.event.trigger('TimeSelector:gotTime', [this.date]);
		this.trigger('TimeSelector:gotTime', this.date);

	},

	render: function () {
		var html = Mustache.to_html(this.template);
		this.$el.html(html);
	}

});
