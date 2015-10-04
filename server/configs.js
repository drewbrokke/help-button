Meteor.methods({
	updateUserMessageConfig: function(messageSubject, messageBody) {
		Configs.update(
			this.userId,
			{
				$set: {
					userId: this.userId,
					messageSubject: messageSubject,
					messageBody: messageBody
				}
			},
			{ upsert: true }
		);
	},
	updateUserTimestamp: function(timestamp) {
		Configs.update(
			this.userId,
			{
				$set: {
					timestamp: timestamp
				}
			},
			{ upsert: true }
		);
	}
});