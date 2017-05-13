$(document).ready(function () {
    $("#year-select").datepicker({});

    $("#enter").click(function () {
        var input = {
                    user: "User",
                    festival: $("#select-name").val().trim(),
                    year: $("#year-select").val().trim(),
                    overall: Number($("input[type=radio][name=rating]:checked").val().trim()),
                    cost: $("input[type=radio][name=cost]:checked").attr("score").trim(),
                    security: $("input[type=radio][name=security]:checked").attr("score").trim(),
                    sound: $("input[type=radio][name=sound]:checked").attr("score").trim(),
                    title: $("#title").val().trim(),
                    text_body: $("#text-review").val().trim()
                };

        if ($("#select-name").val().trim() !== "" && $("#select-name").val().trim() !== undefined) {
            
            
            $.post("http://" + window.location.host + "/api/review", input,
                function (data, status) {
                    console.log("Data: " + data + "\nStatus: " + status);
                });
        } else {
            console.log(input);
            $("#select-name").addClass("red");
            $("#select-name").effect("shake");
        }
    });
});

$("#enter").click(function () {
    window.location.href = "/festival/" + $("#select-name").val();
});