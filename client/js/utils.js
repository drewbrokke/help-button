var REGEX_EMAIL = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var REGEX_PHONE = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i;

var CSS_WARNING = 'warning';

var CARRIERS = [
	"txt.att.net", // att
	"messaging.sprintpcs.com", // sprint
	"tmomail.net", // tMobile
	"vtext.com.nextel.com" // verizon
]

var utilityFns = {
	createPhoneEmail: function(phoneNumber, provider) {
		return phoneNumber + '@' + CARRIERS[provider];
	},

	getFormdata: function(formTarget) {
		var instance = this;

		var name = instance.validateName(formTarget.name);
		var email = instance.validateEmail(formTarget.email);
		var phone = instance.validatePhone(formTarget.phone);

		return {
			data: {
				contactInfoId: formTarget.contactId.value,
				email: formTarget.email.value,
				name: name,
				phone: formTarget.phone.value,
				provider: formTarget.provider.value
			},
			validation: name && email && phone
		};
	},

	validateEmail: function(input) {
		var email = input.value;

		var retVal = false;

		if (email.length && !REGEX_EMAIL.test(email)) {
			$(input).addClass(CSS_WARNING);
		}
		else {
			$(input).removeClass(CSS_WARNING);

			retVal =  email || true;
		}

		return retVal;
	},

	validateName: function(input) {
		var name = input.value;

		var retVal = false;

		if (!name.length) {
			$(input).addClass(CSS_WARNING);
		}
		else {
			$(input).removeClass(CSS_WARNING);

			retVal = name;
		}

		return retVal;
	},

	validatePhone: function(input) {
		var phone = input.value;

		var retVal = false;

		if (phone.length && !REGEX_PHONE.test(phone)) {
			$(input).addClass(CSS_WARNING);
		}
		else {
			$(input).removeClass(CSS_WARNING);

			retVal = phone || true;
		}

		return retVal;
	}
};

Utils = utilityFns;