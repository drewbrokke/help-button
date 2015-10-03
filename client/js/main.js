Meteor.subscribe('contacts');
Contacts = new Mongo.Collection("contacts");


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

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});