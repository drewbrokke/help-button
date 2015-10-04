if (Meteor.isServer) {
	Meteor.methods({
		sendEmail: function(to, from, subject, message) {
			var time = new Date();
			var config = Configs.findOne({userId: Meteor.userId()});

			var lastClickDate = config.lastClickDate;

			//  30 Minutes delay ms * sec * min
			var timeDelay = 1000 * 60 * 5;

			if (!lastClickDate || ((time - lastClickDate) > timeDelay)) {
				check([to, from, subject, message], [String]);

				this.unblock();

				Email.send({
					to: to,
					from: from,
					subject: subject,
					text: message
				});

				Meteor.call('updateUserTimestamp', time);
			}
		}
	});
}