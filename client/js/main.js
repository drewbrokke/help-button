if (Meteor.isClient) {
	Template.button.events({
		'click button': function () {
			Meteor.call('sendEmail');
		}
	});
}