
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Game Master for Gulle</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="jquery-2.1.3.min.js"></script>
        <script src="moment.js"></script>
		<script src="bootstrap-3.3.2/js/bootstrap.min.js"></script>
		<link rel="stylesheet" type="text/css" href="bootstrap-3.3.2/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
	<?php if (!isset($_GET['s'])): ?>
	
    <div class="container text-center">

        <br>

        <div id="mainJumbo" class="jumbotron">
            <h2>Gulle's Revenge: Gamemaster setup</h2>
        </div>

        <div class="row top-buffer">           
            <div class="col-lg-12">
                <input id="nick2" type="text" class="form-control" placeholder="Enter your nick here!(characters a-z and 0-9)">
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <h4>Please write your nick here before attacking a game</h4>
                </div>
            </div>
        </div>

        <br>

        <div class="row top-buffer">
            <div class="col-lg-6 text-center">
                <h4>Pick one of the latest attack ID:s</h4>
                <ul class="list-unstyled" id="sessionlist"></ul>  
            </div>

            <div id="manualAttackId" class="col-lg-6 text-center">
                <h4>Or enter attack ID manually:</h4>
                <input id="manualId" type="text" class="form-control" placeholder="Attack ID">
                <button id="attackButton" type="button" class="btn btn-default btn-lg">Attack!</span></button>
            </div>

        </div>

        <div class="footer top-buffer">
            <h5>List of latest games is refreshed every 30 seconds</h5> 
            <button id="refresh" type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-refresh" aria-hidden="false"></span> Refresh now</button>
        </div>

        
    	
    	
		        <!--pop-up -->
        <div id="popUp" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h3 class="modal-title text-center"> </h3>
                    </div>
                    <div class="modal-body">
                        <h4> </h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
		
		<script src="landingPage.js"></script>
    </div><!-- end container -->
	<?php endif;
	if (isset($_GET['s']) && isset($_GET['nick'])): ?>
	Your name: <div id="nick"><?php echo $_GET['nick']; ?></div>
	<p>Select spawn point and press the enemy type you want to spawn to the game</p>
	<div id="container">
    <div class="btn-group">
    <button type="button" id="roominput" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
        1 <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li><a href="#">7</a></li>
        <li><a href="#">8</a></li>
        <li><a href="#">9</a></li>
        <li><a href="#">10</a></li>
    </ul>
    </div>
	<button type="button" value="1" id="monster1" class="monster btn btn-xs"><img src="spawn_melee_green.png"/></button>
	<button type="button" value="2" id="monster2" class="monster btn btn-xs"><img src="spawn_ranged_green.png"/></button>
	</div>
	<div id="error"></div>
    <canvas id="hpcanvas" width="800" height="100"></canvas>
	<canvas id="levelmap" width="800" height="600"></canvas>
	<script src="game.js"></script>
	<?php endif; ?>
	</body>
</html>
