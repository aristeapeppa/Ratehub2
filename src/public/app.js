console.log('test')

$(document).ready(function() {
    console.log("eksw")
    $("#register").submit(function(event) {
        console.log("mesa")
        event.preventDefault();
        // var post_url = $(this).attr("action"); //get form action url
        // var request_method = $(this).attr("method"); //get form GET/POST method
        var formData = {
            'username': $('input[name=username]').val(),
            'password': $('input[name=password]').val(),
            'role': $('input[name=role]').val()
        };
        console.log(formData);
        var form_data = $(this).serialize(); //Encode form elements for submission
        console.log(form_data);

        $.ajax({
            type: "POST",
            url: "/user/register",
            contentType: "application/json",
            data: JSON.stringify(formData)
        }).done(function(response) {
            $("#server-results").html(response);
        });
    });
});
