if (Meteor.isServer) {
	Meteor.methods({
		sendEmail: function(to, from, subject, message) {
			check([to, from, subject, message], [String]);

			this.unblock();

			Email.send({
				to: to,
				from: from,
				subject: subject,
				text: message
			});
		}
	});
}