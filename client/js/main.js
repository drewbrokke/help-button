Meteor.subscribe('contacts');
Contacts = new Mongo.Collection("contacts");


if (Meteor.isClient) {
	Template.body.helpers({
		contacts: function () {
			return Contacts.find({});
		}
	});

	Template.button.events({
		'click button': function () {
			Meteor.call('sendEmail');
		}
	});
}