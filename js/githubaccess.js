function createtable()
{
		apiParams = { 
		url : 'https://api.github.com/repos/vgulaev/trimet_it/issues',
		dataType : 'jsonp',
		success: function (html) {
			creategoogletable();
		}
		};
		$.ajax(apiParams); 
}