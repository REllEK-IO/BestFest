$(document).ready(function() {
    console.log(window.location.host + "/api/authors");

    $("#select-user").change(function(data) {
        var str = "";
        $("select option:selected").each(function() {
            str += $(this).text();
        });
        if (str.trim() !== "" || str.trim() !== " " || str !== undefined) {
            localStorage.setItem("userName", str);
            console.log("User Name set to " + str);
        }

        // 	$.ajax({
        // 		type: "POST",
        // 		url: "http://" + window.location.host + "/api/user",
        // 		data: "stuff",
        // 		success: function(data) { console.log(data) },
        // 		dataType: JSON
        // });
    });
})


// $(option).text(2017).attr("val", 2017)