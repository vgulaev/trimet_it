function creategoogletable(issues) {
      /*google.load('visualization', '1', {packages:['table',]});
      google.setOnLoadCallback(drawTable);*/
      //function drawTable() {
        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', 'Название задачи');
		data2.addColumn('string', 'Назначена');
        data2.addColumn('date', 'Дата создания');
        data2.addColumn('date', 'Дата закрытия');
		data2.addColumn('string', 'Состояние');
        
		for (var i in issues.data) {
			if (issues.data[i].closed_at == null)
				{
				closed_at = {v:new Date(), f:'---'};
				}
			else
			{
			closed_at = new Date(Date.parse(issues.data[i].closed_at));
			}
			if (issues.data[i].assignee == null)
			{
			assignee_login = "неназначена";
			}
			else
			{
			assignee_login = issues.data[i].assignee.login;
			}
			data2.addRow([issues.data[i].title, assignee_login,  new Date(Date.parse(issues.data[i].created_at)), closed_at, issues.data[i].state]);
		}
		
		/*data2.addRows([
          ['Mike',  {v: 10000, f: '$10,000'}, true],
          ['Jim',   {v:8000,   f: '$8,000'},  false],
          ['Alice', {v: 12500, f: '$12,500'}, true],
          ['Bob',   {v: 7000,  f: '$7,000'},  true]
        ]);*/
		
        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data2, {showRowNumber: true});
      //}
}

function createtable()
{
		apiParams = { 
		url : 'https://api.github.com/repos/vgulaev/trimet_it/issues',
		dataType : 'jsonp',
		success: function (issues) {
			creategoogletable(issues);
		}
		};
		$.ajax(apiParams); 
}