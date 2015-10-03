Meteor.startup(function () {
	smtp = {
		username: 'helpbuttondemo',   // eg: server@gentlenode.com
		password: 'helpbuttondemocftk',   // eg: 3eeP1gtizk5eziohfervU
		server:   'smtp.gmail.com',  // eg: mail.gandi.net
		port: 465
	}

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});