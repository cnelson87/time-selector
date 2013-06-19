
var TimeSelector = Backbone.View.extend({
	//el: '#app',
	tagName: 'fieldset',
	className: 'time-selector',
	//template: $('#tmpTimeSelector').html(),
	events: {
		'change select': 'onSelectChange'
	},

	initialize: function(){
		//console.log(this.el);
		//console.log(this.$el);
		this.template = $('#tmpTimeSelector').html();
		this.render();
	},

	getTime: function(){

	},

	setTime: function(){

	},

	onSelectChange: function(e){

	},

	render: function(){
		var html = Mustache.to_html(this.template);
		//console.log(html);
		//console.log(this.template);
		this.$el.html(html);
		return this;
	}

});