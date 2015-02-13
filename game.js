
$(document).ready(function() {
        var d = new Date();
        var timethen = d.getTime();
        var url = window.location.href;
        var sessionidstart = url.lastIndexOf("=");
        var sessionid = url.substr(sessionidstart + 1, 5);
        var canvas = document.getElementById('levelmap');
        var context = canvas.getContext('2d');
        var hpcanvas = document.getElementById('hpcanvas');
        var hpcontext = hpcanvas.getContext('2d');
        var player1Image = loadImage("red_ui_head_64.png"); 
        var player2Image = loadImage("blue_ui_head_64.png");
        var player3Image = loadImage("green_ui_head_64.png"); 
        var player4Image = loadImage("pink_ui_head_64.png");
        var player1hp = loadImage("red_ui_hp.png"); 
        var player2hp = loadImage("blue_ui_hp.png");
        var player3hp = loadImage("green_ui_hp.png"); 
        var player4hp = loadImage("pink_ui_hp.png");
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

                        hpcontext.drawImage(player1hp, 45, 80, playerdata[player].hp, 5);
                        context.drawImage(player1Image,((pos_x / 6400) * 800) - 32,((pos_y / 4800) * 600) - 32);
                    }
                    else if (player == "player2") {
                        hpcontext.drawImage(player2hp, 245, 80, playerdata[player].hp, 5);
                    } 
                    else if (player == "player3") {
                        hpcontext.drawImage(player3hp, 445, 80, playerdata[player].hp, 5);
                    } 
                    else if (player == "player4") {
                        hpcontext.drawImage(player4hp, 645, 80, playerdata[player].hp, 5);
                    }
                }
                hpcontext.drawImage(player1Image,60,12);
                hpcontext.drawImage(player2Image,260,12);
                hpcontext.drawImage(player3Image,460,12);
                hpcontext.drawImage(player4Image,660,12);


        }
        $(".dropdown-menu li a").click(function(){

            $(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');
            $(".btn:first-child").val($(this).text());

        });

        $( ".monster" ).on( "click", function() {
                d = new Date();
                var timenow = d.getTime();
                var nick = $("#nick").text();
                var roominput = $("#roominput").text().trim();
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
