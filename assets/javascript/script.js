
$(document).ready(function () {
    // Define array with topics
    var topics = [
        "gingerbread",
        "honey",
        "ice cream",
        "jellybean",
        "cookie",
        "donut",
        "oreo",
        "lollipop",
        "marshmallow",
        "pie"
    ];

    for (i = 0; i < topics.length; i++) {
        const element = array[i];

        $("#treatButtons").append("<button>")
        $(this).addClass("btn btn-primary")
    }




    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})