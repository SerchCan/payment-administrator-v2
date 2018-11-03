function AdminRetrieve() {
    $("#Admin-plats").html("")
    $("#select-plattform").html("")
    url = "/plattforms/Admin_Plattforms"
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            response.forEach((element, i) => {
                selects = `<option  value="` + element.ID_SERVICE + `">` + element.NAME + `</option>`;
                html = `
                <tr>
                    <td scope="row" id=` + element.ID_SERVICE + `>` + (i + 1) + `</td>
                    <td>` + element.NAME + `</td>
                    <td>` + element.PRICE + `</td>
                    <td> <button class="btn btn-warning" data-toggle="modal" data-target="#Edit">&#x270E;</button></td>
                    <td> <a href="/plattforms/delete/` + element.ID_SERVICE + `" class="btn btn-danger">&#128465;</a></td>
                </tr>`;
                $("#Admin-plats").append(html)
                $("#select-plattform").append(selects)
            });
            $('button').click(function () {
                var id = $(this).closest("tr").find("td:nth-child(1)").attr('id');
                var name = $(this).closest("tr").find("td:nth-child(2)").html();
                var price = $(this).closest("tr").find("td:nth-child(3)").html();
                $('#Name').val(name);
                $('#Price').val(price);
                $('#Id').val(id);
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
                        <td scope="row" >` + (i + 1) + `</td>
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