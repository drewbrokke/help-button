Contacts = new Mongo.Collection("contacts");
Configs = new Mongo.Collection("configs");

Meteor.startup(function () {
	smtp = {
		username: 'helpbuttondemo',   // eg: server@gentlenode.com
		password: 'helpbuttondemocftk',   // eg: 3eeP1gtizk5eziohfervU
		server:   'smtp.gmail.com',  // eg: mail.gandi.net
		port: 465
	};

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.onCreateUser(function(options, user) {
	Configs.insert({
		userId: user._id,
		messageSubject: 'Message subject here',
		messageBody: 'Message body here',
		lastClickDate: 0
	});

	return user;
});

Meteor.publish("contacts", function () {
	return Contacts.find({userId: this.userId});
});

Meteor.publish("configs", function () {
	return Configs.find({userId: this.userId});
});