Meteor.methods({
	updateUserMessageConfig: function(messageSubject, messageBody) {
		console.log('Configs.find().count(): ', Configs.find().count());
		Configs.update(
			{userId: this.userId},
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
			{userId: this.userId},
			{
				$set: {
					lastClickDate: lastClickDate
				}
			},
			{ upsert: true }
		);
	}
});