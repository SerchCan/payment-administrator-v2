function DoPayment(url) {
    $.ajax({
        type: "POST",
        url: url,
        success: (response) => {
            $('#resp').html(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">Payment added
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button></div>`);
            retrieveMembers();
        },
        error: (response) => {

            $('#resp').html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">Error Ocurred
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button></div>`);
        }
    });
}

function retrieveMembers() {
    $("#Members").html("")
    url = "/users/members"
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            response.forEach((element, i) => {
                // Generate Row


                url = element.ID_S + "/" + element.ID_U
                $.get("/payment/NextDate/" + url, (response) => {
                    url = element.ID_S + "/" + element.ID_U
                    html = `
                        <tr>
                            <td scope="row" id=payments-` + element.ID_SERVICE + `>` + (i + 1) + `</td>
                            <td>` + element.NAME + " " + element.LASTNAME + `</td>
                            <td>` + element.PLATTFORM + `</td>
                            <td> ` + element.PRICE + `</td>
                            <td> ` + response.date + `</td>
                            <td> <button onClick="javascript:DoPayment('/payment/` + url + `')" class="btn btn-success">Pago</button></td>
                        </tr>`;
                    $("#Members").append(html)

                });

            });
        },
        error: function (response) {
            console.log("error", response.Data)
        }
    });

}
$(document).ready(retrieveMembers());