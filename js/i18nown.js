var i18n = function() {

	this.userLang = ((navigator.language) ? navigator.language
			: navigator.userLanguage).substr(0, 2);

	this.title_task = function() {
		var str = {
			"ru" : 'Название задачи',
			"en" : 'Title'
		}
		return str[this.userLang];
	}
	
	this.assignee = function() {
		var str = {
			"ru" : 'Назначена',
			"en" : 'Assignee'
		}
		return str[this.userLang];
	}
	this.assignee = function() {
		var str = {
			"ru" : 'Дата создания',
			"en" : 'Created date'
		}
		return str[this.userLang];
	}
};