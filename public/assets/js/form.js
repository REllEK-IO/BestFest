$(document).ready(function(){
    $("#submit").click(function(){
        $.post("/api/review",
        {
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


// $("#submit").click(function(){
//     var reviewFestival = $("#select-name").val().trim();
//     console.log(reviewFestival);

//     var reviewYear = $("#year-select").val().trim();
//     console.log(reviewYear);

//     var cost = $("input[type=radio][name=cost]:checked").val().trim();
//     console.log(cost);

//     var security = $("input[type=radio][name=security]:checked").val().trim();
//     console.log(security);

//     var sound = $("input[type=radio][name=sound]:checked").val().trim();
//     console.log(sound);

//     var rating = $("input[type=radio][name=rating]:checked").val().trim();
//     console.log(rating);

//     var reviewTitle = $("#title").val().trim();
//     console.log(reviewTitle);

//     var reviewBody = $("#text-review").val().trim();
//     console.log(reviewBody);
// });


