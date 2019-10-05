$(document).ready(function() {

    console.log(localStorage.getItem('token'));

    $.ajax({
        type: "GET",
        url: "/rating/4",
        contentType: "application/json",
        headers: {"auth": localStorage.getItem('token')}
    }).done(function(response) {
        console.log("&&&&&", response);
    });

    $('.starrr').starrr({
        rating: 0,
        change: function(e, value) {
            if (value) {
                $('.your-choice-was').show();
                $('.choice').text(value);
            } else {
                $('.your-choice-was').hide();
            }
        }
    });

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
        console.log(formData.wanted)
        window.location.replace("http://localhost:3000/clip/search/" + formData.wanted);
    });

});
