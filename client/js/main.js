Contacts = new Mongo.Collection("contacts");
Meteor.subscribe('contacts');

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

Template.button.events({
	'click button': function () {
		Meteor.call('sendEmail');
	}
});

Template.deleteContact.events({
	'click button': function () {
		event.preventDefault();

		var dataId = event.target.getAttribute('data-id');

		if (dataId) {
			Meteor.call('deleteContact', dataId);
		}
	}
});

Template.contactForm.helpers({
	providerIs: function(provider) {

		return Number(this.provider) === Number(provider);
	}
});

Template.contactForm.events({
	'submit form': function (event) {
		event.preventDefault();

		var formTarget = event.target;
		var form = Utils.getFormdata(formTarget);

		if (form.validation) {
			var method = 'updateContact';
			var callback = null;

			var newContact = $(formTarget).hasClass('new-contact');

			if (newContact) {
				method = 'addContact';
				callback = function() {
					formTarget.reset();
				};
			}

			Meteor.call(method, form.data, callback);
		}
	}
});