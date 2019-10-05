$(document).ready(function() {
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
        }).done(function(response) {
            window.location.replace("http://localhost:3000/clip/5");
            // $("#server-results").html(response);
        });
    });
});
