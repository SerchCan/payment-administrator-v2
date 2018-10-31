$(document).ready(function () {
    var form = $('#login-form');
    form.submit((event) => {
        var url = "/login";
        $.ajax({
            type: "POST",
            url: url,
            data: $("#login-form").serialize(),
            success: function (response) {
                window.location.replace("/dashboard");
            },
            error: function (response) {
                $('#resp').removeClass("alert-success").addClass("alert-danger")
                $('#resp').html(response.responseJSON.Data);
            }
        });
        event.preventDefault();
    })
});
//# sourceURL=pen.js
$(document).ready(function () {
    var form = $('#signup-form');
    form.submit((event) => {
        var url = "/signup";
        $.ajax({
            type: "POST",
            url: url,
            data: $("#signup-form").serialize(),
            success: function (response) {
                $('#resp').removeClass("alert-danger").addClass("alert-success")
                $('#resp').html(response.Data);
            },
            error: function (response) {
                $('#resp').removeClass("alert-success").addClass("alert-danger")
                $('#resp').html(response.Data);
            }
        });
        event.preventDefault();
    })
});