var i18n = function() {

	var t = ((navigator.language) ? navigator.language : navigator.userLanguage)
			.substr(0, 2);

	if (t == "ru") {
		this.userLang = "ru";
	} else {
		this.userLang = "en";
	}

	this.title_task = function() {
		var str = {
			"ru" : 'Название задачи',
			"en" : 'Title'
		}
		return str[this.userLang];
	}

	this.assignee = function() {
		var str = {
			"ru" : 'Исполнитель',
			"en" : 'Assignee'
		}
		return str[this.userLang];
	}

	this.createddate = function() {
		var str = {
			"ru" : 'Дата создания',
			"en" : 'Created date'
		}
		return str[this.userLang];
	}

	this.opentasks = function() {
		var str = {
			"ru" : 'Открытые задачи',
			"en" : 'Open tasks'
		}
		return str[this.userLang];
	}

	this.closedtasks = function() {
		var str = {
			"ru" : 'Закрытые задачи',
			"en" : 'Closed tasks'
		}
		return str[this.userLang];
	}

	this.translatepage = function(newlang) {
		if ((newlang != this.userLang)||(newlang == undefined)) {
			if (newlang != undefined){
			this.userLang = newlang;
			}
			$('[i18nid]').each(function(index) {
				$(this).html(i18n[$(this).attr("i18nid")]());
			});
		}
	}
};