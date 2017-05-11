// jquery
// don't use node, this is a client file
// val.trim

// var host = window.location.host + ""/api/review""

$( "#submit" ).click(function() {
    event.preventDefault();
    var festival = $("#select-name").val().trim();
    console.log(festival);

    var year = $("#year-select").val().trim();
    console.log(year);

    var cost = $(".cost").val().trim();
    console.log(cost);

    var security = $(".security").val().trim();
    console.log(security);

    var sound = $(".sound").val().trim();
    console.log(sound);
});