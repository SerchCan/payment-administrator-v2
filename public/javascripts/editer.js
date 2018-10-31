$('#Admin-plats tr').click(function () {
    var name = $(this).find("td:nth-child(1)").html();
    var email = $(this).find("td:nth-child(2)").html();
    var addr = $(this).find("td:nth-child(3)").html();
    $('#Name').val(name);
    $('#Price').val(email);
});