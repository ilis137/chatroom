const socket = io();
var nickname;
$(function() {


    $("button").click(function(e) {
        socket.emit("chat message", $("#message").val())
        $("ul").append($("<li class='list-group-item'>").text(nickname + " : " + $("#message").val()))
        $("#message").val("")

    })
    $(".chat-message").keydown(function(e) {
        if (e.which == 13 && $("#message").val() !== "") {
            socket.emit("chat message", $("#message").val())
            $("ul").append($("<li class='list-group-item'>").text(nickname + " : " + $("#message").val()))
            $("#message").val("")
        } else {
            socket.emit("typing", nickname)
        }
    })

    $(".login-page").keydown(function(e) {
        if (e.which == 13 && $(".nickname").val() !== "") {
            $(".login-page").fadeOut()
            $(".chat-message").show()

            nickname = $(".nickname").val()
            $(".login-page").off('click');
            socket.emit("add user", nickname)
        }
    })
    socket.on("typing", function(data) {
        if (nickname) {
            $(".feedback").html("<p><em>" + data.nickname + " is typing</em></p>")
        }
    })

    socket.on("chat message", function(data) {
        if (nickname) {
            $(".feedback").empty()
            $("ul").append($("<li class='list-group-item'>").text(data.username + " : " + data.msg))
        }

    })

    socket.on("user joined", function(data) {
        if (data.numUsers && nickname) {
            $("ul").append($("<li class='list-group-item'>").text(data.username + " joined the room"))
            $("ul").append($("<li class='list-group-item'>").text(data.numUsers + " in the room"))
        }

    })

    socket.on("login", function(data) {
        if (data.numUsers)
            $("ul").append($("<li class='list-group-item'>").text(data.numUsers + " in the room"))
    })



    socket.on("disconnected", function(data) {
        if (nickname) {
            $("ul").append($("<li class='list-group-item'>").text(data.username + " left the room"))
            $("ul").append($("<li class='list-group-item'>").text(data.numUsers + " in the room"))
        }

    })


})