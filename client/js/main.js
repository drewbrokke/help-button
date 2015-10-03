Contacts = new Mongo.Collection("contacts");
Meteor.subscribe('contacts');

Template.body.helpers({
	contacts: function () {
		return Contacts.find({});
	}
});

Template.button.events({
	'click button': function () {
		var contacts = Contacts.find({});

		contacts.forEach(function(contact) {
			if (contact.contactEnabled) {
				if (contact.email && contact.sendToEmail) {
					Meteor.call('sendEmail', contact.email, 'helpbuttondemo@gmail.com', 'help please', 'This is the new stuff');
				}

				if (contact.phone && contact.sendToText) {
					var phoneAddress = Utils.createPhoneEmail(contact.phone, contact.provider);

					Meteor.call('sendEmail', phoneAddress, 'helpbuttondemo@gmail.com', 'help please', 'This is the new stuff');
				}
			}
		});
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
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


Template.body.events({
	'click #nav-toggle': function(event) {
		$(event.currentTarget).toggleClass('active');

		$('#settings').toggleClass('open');
	}
});