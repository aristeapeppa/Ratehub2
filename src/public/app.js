
function deleteClip(which) {
    $.ajax({
        type: "POST",
        url: "/clip/" + which + "/delete",
        contentType: "application/json",
        headers: { "auth": localStorage.getItem('token') }
    }).done(function(res) {
        window.location.replace("http://localhost:3000/reports");
    });
};


$(document).ready(function() {

    var token = localStorage.getItem('token');
    var role = localStorage.getItem('role');
    var url = window.location.href;

    var splits = window.location.href.split("/");
    var id = splits[splits.length - 1];

    if (token) {
        $('#loginBtn').hide();
        $('#registerBtn').hide();
        if (role == "VIEWER") {
            $('#uploadBtn').hide();
            $('#reportsBtn').hide();
        } else if (role == "UPLOADER") {
            $('#reportsBtn').hide();
        } else if (role == "ADMIN") {
            $('#uploadBtn').hide();
        }
    } else {
        $('#logoutBtn').hide();
        $('#uploadBtn').hide();
        $('#reportsBtn').hide();
        $('#reportBtn').hide();
    }

    $("#logoutBtn").click(function() {
        localStorage.clear();
        window.location.replace("http://localhost:3000");
    });

    if (url.includes("/upload") && token) {
        $("#upload").submit(function(event) {
            event.preventDefault();
            var formData = {
                'title': $('input[name=title]').val(),
                'description': $('textarea[name=description]').val(),
                'uid': $('input[name=uid]').val(),
            };
            $.ajax({
                type: "POST",
                url: "/upload",
                contentType: "application/json",
                data: JSON.stringify(formData),
                headers: { "auth": localStorage.getItem('token') }
            }).done(function(response) {
                $('#uploadSubBtn').prop('disabled', true);
                $('#uploadSubBtn').html('Uploaded');
            });
        });

    }

    if (url.includes("/clip/") && token) {

        $("#reportBtn").click(function() {
            $.ajax({
                type: "POST",
                url: "/clip/" + id + "/report",
                contentType: "application/json",
                headers: { "auth": localStorage.getItem('token') }
            }).done(function(res) {
                $('#reportBtn').prop('disabled', true);
                $('#reportBtn').html('Reported');
            });
        });

        $.ajax({
            type: "GET",
            url: "/rating/" + id,
            contentType: "application/json",
            headers: { "auth": localStorage.getItem('token') }
        }).done(function(res) {
            $('input[name=title]').val(res.title);
            $('textarea[name=review]').val(res.review);
            if (res.stars > 0) {
                $('#review').show();
                $('.your-choice-was').show();
                $('.choice').text(res.stars);
            }
            $('.starrr').starrr({
                rating: res.stars,
                change: function(e, value) {
                    if (value) {
                        $.ajax({
                            type: "POST",
                            url: "/clip/" + id + "/rate",
                            contentType: "application/json",
                            data: JSON.stringify({ stars: value }),
                            headers: { "auth": localStorage.getItem('token') }
                        }).done(function(res) {
                            $('.your-choice-was').show();
                            $('.choice').text(value);
                            $('#review').show();
                        });
                    } else {
                        $('.your-choice-was').hide();
                    }
                }
            });


            $("#review").submit(function(event) {
                event.preventDefault();
                var formData = {
                    'stars': res.stars,
                    'title': $('input[name=title]').val(),
                    'review': $('textarea[name=review]').val()
                };
                $.ajax({
                    type: "POST",
                    url: "/clip/" + id + "/rate",
                    contentType: "application/json",
                    data: JSON.stringify(formData),
                    headers: { "auth": localStorage.getItem('token') }
                }).done(function(response) {

                    $('#reviewBtn').prop('disabled', true);
                    $('#reviewBtn').html('Submited');
                });
            });


        });



    }


    $("#register").submit(function(event) {
        event.preventDefault();
        let role;
        if ($('input[name=role]').is(":checked")) {
            role = "UPLOADER"
        } else {
            role = "VIEWER"
        }
        var formData = {
            'username': $('input[name=username]').val(),
            'password': $('input[name=password]').val(),
            'role': role
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
            localStorage.setItem("role", res.role);
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
