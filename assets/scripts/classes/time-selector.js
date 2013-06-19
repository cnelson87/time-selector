
var TimeSelector = Backbone.View.extend({
	el: '#time-selector',
	//tagName: 'fieldset',
	//className: 'time-selector',
	template: $('#tmpTimeSelector').html(),
	events: {
		'change select': 'onSelectChange'
	},

	initialize: function(){
		console.log(this.el);
		console.log(this.$el);
		this.template = $('#tmpTimeSelector').html();
		this.render();
		this.$elHour = this.$el.find('.hour');
		this.$elMinute = this.$el.find('.minute');
		this.$elAmpm = this.$el.find('.ampm');
		//console.log(this.$elHour, this.$elMinute, this.$elAmpm);
	},

	onSelectChange: function(e){
		this.getTime();
	},

	getTime: function(){
		var hour = this.$elHour.val();
		var minute = this.$elMinute.val();
		var ampm = this.$elAmpm.val();
		var time = hour + ':' + minute + ' ' + ampm;
		console.log(time);
	},

	setTime: function(time){
		console.log('setTime');
	},

	render: function(){
		var html = Mustache.to_html(this.template);
		//console.log(html);
		//console.log(this.template);
		this.$el.html(html);
		return this;
	}

});