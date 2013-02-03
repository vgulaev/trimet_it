function creategoogletable(issues, table_id) {
	var data2 = new google.visualization.DataTable();
	data2.addColumn('string', i18n.title_task());
	data2.addColumn('string', 'Назначена');
	data2.addColumn('date', 'Дата создания');
	data2.addColumn('date', 'Дата закрытия');
	data2.addColumn('string', 'Состояние');

	for ( var i in issues.data) {
		if (issues.data[i].closed_at == null) {
			closed_at = {
				v : new Date(),
				f : '---'
			};
		} else {
			closed_at = new Date(Date.parse(issues.data[i].closed_at));
		}
		if (issues.data[i].assignee == null) {
			assignee_login = "неназначена";
		} else {
			assignee_login = issues.data[i].assignee.login;
		}
		data2.addRow([ issues.data[i].title, assignee_login,
				new Date(Date.parse(issues.data[i].created_at)), closed_at,
				issues.data[i].state ]);
	}

	var table = new google.visualization.Table(document
			.getElementById(table_id));
	table.draw(data2, {
		showRowNumber : true
	});
	// }
}

function createtable() {
	apiParams = {
		url : 'https://api.github.com/repos/vgulaev/trimet_it/issues',
		dataType : 'jsonp',
		success : function(issues) {
			creategoogletable(issues, "table_div_opened_task");
		}
	};
	$.ajax(apiParams);
	//creategoogletable(answer());
}

function createtable_closed_task() {
	apiParams = {
		url : 'https://api.github.com/repos/vgulaev/trimet_it/issues?state=closed',
		dataType : 'jsonp',
		success : function(issues) {
			creategoogletable(issues, "table_div_closed_task");
		}
	};
	$.ajax(apiParams);
	//creategoogletable(answer());
}

function creategoogletable_commits(commits) {

	for ( var i in commits.data) {
		d = new Date(Date.parse(commits.data[i].commit.author.date));
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		d.setMilliseconds(0);
		//data2.addRow([ d, commits.data[i].commit.author.name ]);
		data2.push({
		date: d,
		commiter: commits.data[i].commit.author.name
		})
	}

	if (commits.meta.hasOwnProperty("Link")) {
		if (commits.meta.Link[0][1].rel == "next") {
			//alert("next");
			makepagingajax(commits.meta.Link[0][0]);
			var table = new google.visualization.Table(document
					.getElementById('table_div'));
			table.draw(data2, {
				showRowNumber : true
			});
		}
	}
}

function makepagingajax(_loc) {
	if (_loc == undefined) {
		_loc = 'https://api.github.com/repos/vgulaev/sitenewwave/commits';
		// _loc = 'https://api.github.com/repos/vgulaev/trimet_it/issues';
	}
	apiParams = {
		url : _loc,
		dataType : 'jsonp',
		success : function(commits) {
			creategoogletable_commits(commits);
		}
	};
	$.ajax(apiParams);
}

function table_with_working_day() {
	/*data2 = new google.visualization.DataTable();
	data2.addColumn('date', 'День работы');
	data2.addColumn('string', 'Работник');*/
	data2 = new Array();

	makepagingajax();

}