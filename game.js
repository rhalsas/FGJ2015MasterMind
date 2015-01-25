
$(document).ready(function() {
        var d = new Date();
        var timethen = d.getTime();
        var url = window.location.href;
        var sessionidstart = url.lastIndexOf("=");
        var sessionid = url.substr(sessionidstart + 1);
        var canvas = document.getElementById('levelmap');
        var context = canvas.getContext('2d');
        var playertable = $("#players");
        function updatePlayerStatus() {	
                $.ajax({
                        url: "http://galezki.cloudapp.net/backend/api.php?action=getplayerstatus",
                        type: 'POST',
                        data: "sessionId=" + sessionid,
                        success: function(data){
                                $("#players").empty();
                                $("#players").append("<tr><th>Player</th><th>HP</th><th>X</th><th>Y</th></tr>");
                                if (data != "") {
                                        var obj = $.parseJSON(data);
                                   for (var player in obj) {
                                        $("#players").append("<tr><td>" +player+ "</td><td>" +obj[player].hp+ "</td><td>"+obj[player].x+ "</td><td>"+obj[player].y+ "</td></tr>");
                                }
                                updateCanvas(obj);     
                                }
                                
                        }
                });

        }
        function updateCanvas(playerdata) {
                var i = 0;
                context.clearRect(0, 0, 720, 548);
                for (var player in playerdata) {
                        if (player == "player1") var room = playerdata[player].room;
                        context.fillStyle = "#FFF";
                        context.fillText(player, i*75+10, 10);
                        context.fillText(playerdata[player].hp, i*75+60, 10);
                        i++;
                }
                console.log("Updating canvas to show that players are in the " + room);

        }
        $( ".monster" ).on( "click", function() {
                d = new Date();
                var timenow = d.getTime();
                var nick = $("#gamemaster").val();
                var roominput = $("#roominput").val();
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
