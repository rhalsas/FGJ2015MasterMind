sessionPoller = setInterval(getSessions, 30000);

$( document ).ready(function() {
	getSessions();	
});

$(document).on( "click", ".sid", function() {
	var sessionId = $(this).text().substring(0, 5);
	forwardToGameMaster(sessionId);
});

$(document).on( "click", "#refresh", function() {
	getSessions();
});

$(document).on( "click", "#attackButton", function() {
	var sessionId = $('#manualId').val();
	if (sessionId == sessionId.replace(/[^a-z0-9]/gi,'') && sessionId.length === 5){
		forwardToGameMaster(sessionId);
	}
	else{
		$('#popUp').find('.modal-title').text('Invalid attack Id');
        $('#popUp').find('.modal-body h4').text('Please make sure you entered your attack id correctyly');
        $('#popUp').modal();
	}
	
});



function getSessions() {
	var count = 10;
	$.ajax({
        url: "http://galezki.cloudapp.net/backend/api.php?action=getsessions",
        type: 'POST',
        data: 'count=' + count,
        success: function(data){
			if (data != "") {
				$("#sessionlist").empty();
				var obj = $.parseJSON(data);
				for (var session in obj) {
					var session_id = obj[session].session_id;
					var created_at_date = moment(obj[session].created_at).format('DD.MM.');
                    var created_at_time = moment(obj[session].created_at).format('HH:mm');

					$("<li><a class='sid btn btn-default btn-lg btn-block'>"
                         + session_id + "&nbsp &nbsp" 
                         + "<span class=\"glyphicon glyphicon-calendar\" aria-hidden=\"false\"></span> &nbsp"
                         + created_at_date + "&nbsp &nbsp" 
                         + "<span class=\"glyphicon glyphicon-time\" aria-hidden=\"false\"></span> &nbsp"
                         + created_at_time + "&nbsp &nbsp" 
                         + "</a></li>").appendTo("#sessionlist");
				}
			}
                
        }
    });
}

function forwardToGameMaster(session)
{
    var nicktest = $('#nick2').val();
    if (nicktest === ''){
        $('#popUp').find('.modal-title').text('Please enter nick');
        $('#popUp').find('.modal-body h4').text('Your nick will be shown in the game you attacked. It is shown below the monsters you caused to spawn!');
        $('#popUp').modal();
    }
    else if (nicktest == nicktest.replace(/[^a-z0-9]/gi,'')) {
        clearInterval(sessionPoller);
        window.location.assign("?nick=" + nicktest + "&s=" + session);
    } else {
        $('#popUp').find('.modal-title').text('Please check your nick');
        $('#popUp').find('.modal-body h4').text('Make sure your nick contains only allowed characters(characters a-z and 0-9)');
        $('#popUp').modal();
    }
}