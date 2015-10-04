Contacts = new Mongo.Collection("contacts");
Configs = new Mongo.Collection("configs");

Meteor.subscribe('contacts');
Meteor.subscribe('configs');

Template.body.helpers({
	contacts: function () {
		return Contacts.find({});
	}
});

Template.messageForm.helpers({
	messageBody: function() {
		var config = Configs.findOne();
		var messageBody = 'Message body here';

		if (!!config) {
			messageBody = config.messageBody
		}

		return messageBody;
	},
	messageSubject: function() {
		var config = Configs.findOne();
		var messageSubject = 'Message subject here';

		if (!!config) {
			messageSubject = config.messageSubject
		}

		return messageSubject;
	}
});

var sendMail = function() {
	var contacts = Contacts.find({});

	var config = Configs.findOne();

	console.log('config.messageSubject: ', config.messageSubject);
	console.log('config.messageBody: ', config.messageBody);

	contacts.forEach(function(contact) {
		if (contact.contactEnabled) {
			if (contact.email && contact.sendToEmail) {
				Meteor.call('sendEmail', contact.email, 'helpbuttondemo@gmail.com', config.messageSubject, config.messageBody);
			}

			if (contact.phone && contact.sendToText) {
				var phoneAddress = Utils.createPhoneEmail(contact.phone, contact.provider);

				Meteor.call('sendEmail', phoneAddress, 'helpbuttondemo@gmail.com', config.messageSubject, config.messageBody);
			}
		}
	});
};

var counter;
var timeout;

var holdButtonClick = function(event) {
	timeout = setTimeout(sendMail, 3000);

	var i = 3;

	$('#theButton').text(i);

	counter = setInterval(function() {
		i -= 1;

		if (i === 0) {
				i = 'Sent';

				clearTimeout(counter);
		}

		$('#theButton').text(i);
	}, 1000);

	$(event.currentTarget).addClass('holding');
};

Template.button.events({
	'mousedown button': holdButtonClick,
	'touchstart button': holdButtonClick
});

var cancelButtonClick = function(event) {
	clearTimeout(timeout);
	clearTimeout(counter);

	$('#theButton').text('Help!');

	$(event.currentTarget).removeClass('holding');
};

Template.button.events({
	'mouseup button': cancelButtonClick,
	'mouseout button': cancelButtonClick,
	'touchend button': cancelButtonClick
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
	},
	'submit #messageSettings form': function(event) {
		event.preventDefault();

		var form = event.target;
		var messageSubject = form.messageSubject.value;
		var messageBody = form.messageBody.value;

		Meteor.call('updateUserMessageConfig', messageSubject, messageBody);
	}
});