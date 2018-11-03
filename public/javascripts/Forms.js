$(document).ready(function () {
    var form = $('#Editor-form');
    form.submit((event) => {
        var url = "/plattforms/edit/";

        $.ajax({
            type: "POST",
            url: url,
            data: $("#Editor-form").serialize(),
            success: function (response) {
                //Create alert
                $('#resp').html(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">Sucessfully updated
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button></div>`);

                AdminRetrieve()
            },
            error: function (err) {
                $('#resp').html(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">An error ocurred
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button></div>`);

            }
        });

        event.preventDefault();
    })
});
$(document).ready(function () {
    var form = $('#Create-form');
    form.submit((event) => {
        var url = "/plattforms/Create/";

        $.ajax({
            type: "POST",
            url: url,
            data: $("#Create-form").serialize(),
            success: function (response) {
                //Create alert
                $('#resp').html(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">Sucessfully updated
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button></div>`);

                AdminRetrieve()
            },
            error: function (err) {
                $('#resp').html(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">An error ocurred
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button></div>`);

            }
        });

        event.preventDefault();
    })
});

$(document).ready(function () {
    var form = $('#AddMember-form');
    form.submit((event) => {
        var url = "/plattforms/Member/";
        $.ajax({
            type: "POST",
            url: url,
            data: $("#AddMember-form").serialize(),
            success: function (response) {
                //Create alert
                $('#resp').html(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">Sucessfully Added
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button></div>`);
                retrieveMembers()
            },
            error: function (err) {
                console.log(err)
                $('#resp').html(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">An error ocurred
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button></div>`);

            }
        });

        event.preventDefault();
    })
});