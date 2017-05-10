$(document).ready(function() {
    console.log(window.location.host + "/api/authors");

    try{
        var currentUser = globalStorage.getItem("userName");
        if(currentUser = null)
        {
            console.log("Please select a user.");
        }
        else{
            console.log("Currently logged in as: " + currentUser);
        }
    }
    catch(err){
        console.error(err + " Not login info, please select a user in the temp bar");
    }

    $("#select-user").change(function(data) {
        var str = "";
        $("select option:selected").each(function() {
            str += $(this).text();
        });
        if (str.trim() !== "" || str.trim() !== " " || str !== undefined) {
            globalStorage.setItem("userName", str);
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