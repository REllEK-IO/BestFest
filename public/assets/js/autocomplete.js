$(document).ready(function () {
	console.log("Hello");

	$("#k").autocomplete({
		source: function (req, res) {
			var arr = [];
			console.log("term " + req.term);
			$.get("http://" + window.location.host + "/api/festival/all/" + req.term, function (data) {
				var responseArr = [];
				for (var i = 0; i < data.length; i++) {
					responseArr.push(data[i].name);
				}
				res(responseArr);
			});
		}
	});
	$("#s").on("click", function () {
		window.location.href = "/search/" + $("#k").val();
	})
});