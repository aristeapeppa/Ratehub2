$(document).ready(function() {

    var token = localStorage.getItem('token');
    var url = window.location.href;

    var splits = window.location.href.split("/");

    if (url.includes("/clip/") && token) {
        $.ajax({
            type: "GET",
            url: "/rating/" + splits[splits.length - 1],
            contentType: "application/json",
            headers: { "auth": localStorage.getItem('token') }
        }).done(function(res) {
            console.log("&&&&&", res);
            $('.starrr').starrr({
                rating: res.stars,
                change: function(e, value) {
                    if (value) {
                        $('.your-choice-was').show();
                        $('.choice').text(value);
                    } else {
                        $('.your-choice-was').hide();
                    }
                }
            });
        });


    }


    $("#register").submit(function(event) {
        event.preventDefault();
        var formData = {
            'username': $('input[name=username]').val(),
            'password': $('input[name=password]').val(),
            'role': $('input[name=role]').val()
        };
        // var form_data = $(this).serialize(); //Encode form elements for submission
        $.ajax({
            type: "POST",
            url: "/user/register",
            contentType: "application/json",
            data: JSON.stringify(formData)
        }).done(function(response) {
            // $("#server-results").html(response);
        });
    });


    $("#login").submit(function(event) {
        event.preventDefault();
        var formData = {
            'username': $('input[name=username]').val(),
            'password': $('input[name=password]').val()
        };
        // var form_data = $(this).serialize(); //Encode form elements for submission
        $.ajax({
            type: "POST",
            url: "/user/login",
            contentType: "application/json",
            data: JSON.stringify(formData)
        }).done(function(res) {
            localStorage.setItem("token", res.token);
            window.location.replace("http://localhost:3000");

        });
    });


    $("#search").submit(function(event) {
        event.preventDefault();
        var formData = {
            'wanted': $('input[name=wanted]').val()
        };
        // var form_data = $(this).serialize(); //Encode form elements for submission
        window.location.replace("http://localhost:3000/clip/search/" + formData.wanted);
    });

});
