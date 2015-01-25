
$(document).ready(function() {
        var d = new Date();
        var timethen = d.getTime();
        var url = window.location.href;
        var sessionidstart = url.lastIndexOf("=");
        var sessionid = url.substr(sessionidstart + 1);
        var canvas = document.getElementById('levelmap');
        var context = canvas.getContext('2d');
        var playertable = $("#players");
        var player1Image = loadImage("red_ui_head_64.png"); 
        var player2Image = loadImage("blue_ui_head_64.png");
        var player1hp = loadImage("red_ui_hp.png"); 
        var player2hp = loadImage("blue_ui_hp.png");
        function loadImage(src) {
                var image = new Image();
                image.src = src;
                return image;
        }
        function updatePlayerStatus() {	
                $.ajax({
                        url: "http://galezki.cloudapp.net/backend/api.php?action=getplayerstatus",
                        type: 'POST',
                        data: "sessionId=" + sessionid,
                        success: function(data){
                                if (data != "") {
                                    var obj = $.parseJSON(data);
                                    updateCanvas(obj);
                                }
                                
                        }
                });

        }
        function updateCanvas(playerdata) {
                var i = 0;
                context.clearRect(0, 0, 800, 600);
                for (var player in playerdata) {
                    if (player == "player1") {
                        var pos_x = playerdata[player].x;
                        var pos_y = playerdata[player].y;

                        context.drawImage(player1hp, 250, 2, playerdata[player].hp, 24);
                        context.drawImage(player1Image,((pos_x / 6400) * 800) - 32,((pos_y / 4800) * 600) - 32);
                    }
                    else{
                        context.drawImage(player2hp, 370, 2, playerdata[player].hp, 24);
                    }
                }
                context.drawImage(player1Image,225,12,24,24);
                context.drawImage(player2Image,350,12,24,24);
        }
        $( ".monster" ).on( "click", function() {
                d = new Date();
                var timenow = d.getTime();
                var nick = $("#nick").text();
                var roominput = $("#roominput option:selected").text();
                var enemytype = $(this).val();
                if (timenow - timethen > 3000) {
                        $("#error").html(" ");
                        $.ajax({
                                url: "http://galezki.cloudapp.net/backend/api.php?action=insertenemy",
                                type: 'POST',
                                data: "sessionId=" + sessionid + "&room=" + roominput + "&type=" + enemytype + "&nick=" + nick,
                                success: function(data){
                                    console.log("insert successful");
                                }
                        });
                        d = new Date();
                        timethen = d.getTime();
                } else {
                        $("#error").html("You have to wait " + Math.ceil((3000 - (timenow - timethen)) / 1000) + " seconds.");
                }
                
        });

        setInterval(updatePlayerStatus, 5000);

});
