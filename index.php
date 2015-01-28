
<?php
/* Connect to an ODBC database using driver invocation */
$dsn = 'mysql:dbname=SupraDB;host=localhost';
$user = 'root';
$password = 'k01r4';
$db = new PDO($dsn, $user, $password, array(PDO::ATTR_PERSISTENT => true));

$session = isset($_GET['s']) ? $_GET['s'] : "";

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Game Master for dogegamu</title>
		<script src="jquery-2.1.3.min.js"></script>
		<script src="bootstrap-3.3.2/css/bootstrap.min.js"></script>
		<link rel="stylesheet" type="text/css" href="bootstrap-3.3.2/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
	<?php if (!isset($_GET['s'])): ?>
	<div id="nickerror"></div>
	<p>
	Please write your nick here before entering session (characters a-z and 0-9):
	</p>
	Nick: <input type=text id="nick2" value="doge"/><br/>
	<h3>Last game sessions (refreshes every 30 seconds)</h3>
		<button id="refresh" type="button" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-refresh" aria-hidden="false"></span></button>
		<table id="sessionlist"></table>
		<script>
			
			var sessionPoller = setInterval(getSessions, 30000);
			$(document).on( "click", ".sid", function() {
				var nicktest = $('#nick2').val();
				if (nicktest == nicktest.replace(/[^a-z0-9]/gi,'')) {
					clearInterval(sessionPoller);
					window.location.assign("?nick=" + nicktest + "&s=" + $(this).text());
				} else {
					$("#nickerror").html("Pls check your nick, characters must be between a-z and 0-9");
				}
			});

			$(document).on( "click", "#refresh", function() {
				getSessions();
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
								var created_at = obj[session].created_at;

								$("<tr><td><button class='sid btn btn-default'>" + session_id + "</button></td><td>" + created_at + "</td></tr>").appendTo("#sessionlist");
							}
						}
                            
                    }
                });
			}
			getSessions();
		</script>
	<?php endif;
	if (isset($_GET['s']) && isset($_GET['nick'])): ?>
	Your name: <div id="nick"><?php echo $_GET['nick']; ?></div>
	<p>Select spawn point and press the enemy type you want to spawn to the game</p>
	<div id="container">
	<select id="roominput" name="roomselect">
		<option>1</option>
		<option>2</option>
		<option>3</option>
		<option>4</option>
		<option>5</option>
		<option>6</option>
		<option>7</option>
		<option>8</option>
		<option>9</option>
		<option>10</option>
	</select>
	<button value="1" id="monster1" class="monster"></button>
	<button value="2" id="monster2" class="monster"></button>
	</div>
	<div id="error"></div>
	<canvas id="levelmap" width="800" height="600"></canvas>
	<script src="game.js"></script>
	<?php endif; ?>
	</body>
</html>
