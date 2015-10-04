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
	updateUserTimestamp: function(lastClickDate) {
		Configs.update(
			this.userId,
			{
				$set: {
					lastClickDate: lastClickDate
				}
			},
			{ upsert: true }
		);
	}
});