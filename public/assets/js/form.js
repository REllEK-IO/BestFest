$(document).ready(function(){
    $("#submit").click(function(){
        $.post("http://" + window.location.host +"/api/review",
        {
            user: localStorage.getItem("userName"),
            festival : $("#select-name").val().trim(),
            year : $("#year-select").val().trim(),
            overall : $("input[type=radio][name=rating]:checked").val().trim(),
            cost : $("input[type=radio][name=cost]:checked").val().trim(),
            security : $("input[type=radio][name=security]:checked").val().trim(),
            sound: $("input[type=radio][name=sound]:checked").val().trim(),
            title : $("#title").val().trim(),
            text_body : $("#text-review").val().trim()
        },
        function(data, status){
            console.log("Data: " + data.title + "\nStatus: " + status);
        });
    });
});

