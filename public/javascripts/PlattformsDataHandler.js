function AdminRetrieve() {
    url = "/plattforms/Admin_Plattforms"
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            response.forEach((element, i) => {
                html = `
                <tr>
                    <td scope="row" id=` + element.ID_SERVICE + `>` + (i + 1) + `</td>
                    <td>` + element.NAME + `</td>
                    <td>` + element.PRICE + `</td>
                    <td> <button class="btn btn-warning">&#x270E;</button></td>
                    <td> <a href="/plattforms/delete/` + element.ID_SERVICE + `" class="btn btn-danger">&#128465;</a></td>
                </tr>`;
                $("#Admin-plats").append(html)

            });

        },
        error: function (response) {
            console.log("error", response.Data)
        }
    });
}

function PartMeRetrieve() {
    url = "/plattforms/User_Plattforms"
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            response.forEach((element, i) => {

                $.get("/payment/NextDate/" + element.ID_SERVICE, (response) => {
                    html = `
                    <tr>
                        <td scope="row">` + (i + 1) + `</td>
                        <td>` + element.NAME + `</td>
                        <td>` + element.PRICE + `</td>
                        <td>` + response.date + `</td>
                    </tr>`;
                    $("#User-plats").append(html)
                })
            });

        },
        error: function (response) {
            console.log("error", response.Data)
        }
    });

}

$(document).ready(AdminRetrieve());
$(document).ready(PartMeRetrieve());