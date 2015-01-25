
<?php
/* Connect to an ODBC database using driver invocation */
$dsn = 'mysql:dbname=SupraDB;host=localhost';
$user = 'root';
$password = 'k01r4';
$db = new PDO($dsn, $user, $password, array(PDO::ATTR_PERSISTENT => true));

$session = isset($_GET['s']) ? $_GET['s'] : "";

if (!isset($_GET['s'])) {
		try {
			$stmt = $db->prepare('SELECT session_id FROM fgj_existing_games ORDER BY created_at DESC');
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		$stmt->execute();

		$resultarray = array();
		while ($row = $stmt->fetch()) {
			$sessionid = array('session_id' => $row['session_id']);
			$sessionarray[] = $sessionid;

		}

}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Game Master for dogegamu</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="jquery-2.1.3.min.js"></script>
	</head>
	<body>
	<?php if (!isset($_GET['s'])): ?>
	<div id="nickerror"></div>
	<p>
	Please write your nick here before entering session (characters a-z and 0-9):
	</p>
	Nick: <input type=text id="nick2" value="doge"/><br/>
	Last game sessions:
		<ul>
			<?php
				// Show available game sessions
				foreach ($sessionarray as $session)
				{
					?><li><button class="sid"><?php echo $session["session_id"];?></button></li><?php
				}
			?>
		</ul>
		<script>
			$( ".sid" ).on( "click", function() {
				var nicktest = $('#nick2').val();
				if (nicktest == nicktest.replace(/[^a-z0-9]/gi,'')) {
					window.location.assign("?nick=" + nicktest + "&s=" + $(this).text());
				} else {
					$("#nickerror").html("Pls check your nick, characters must be between a-z and 0-9");
				}
			});
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
