
// Await page load
$(document).ready(function () {

    // Define and log array with topics
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
    console.log("topics: " + topics)

    // Define a function to generate buttons from topics array (to be called both at page load and after adding buttons through form. 
    function generateButtons() {
        $("#treatButtons").empty();
        for (i = 0; i < topics.length; i++) {
            $("<button>").appendTo("#treatButtons").addClass("btn btn-primary").attr("id", "button" + i).text(topics[i]);
        };
    }; /* End definition of generateButtons function */

    // Calling generateButtons function on page load
    generateButtons()

    $("button").on("click", function () {

        // Clears the #treats div before populating it with new gifs
        $("#treats").empty();

        // Defines and logs the url for the query from the Giphy API
        var queryURL = "https://api.giphy.comv/v1/gifs/search?api_key=+Bk0gJvP8J1hf0LAggvKMSd7E86pBG6PB&limit=20&q=" + topic
        console.log("queryURL: " + queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (gif) {
            console.log("gif: " + gif)
            for (var i = 0; i < gif.length; i++) {

                // Stores url of still gif
                var gifImageStill = response.data[i].images.original_still.url;

                // Stores url of animated gif
                var gifImageAnimate = response.data[i].images.original.url;

                // Stores gif rating
                var gifImageRating = response.data[i].rating;


                var gifImage = $('<img class="gif img-thumbnail">').attr("src", gifImageStill).attr("data-animate", gifImageAnimate).attr("data-still", gifImage_Still).attr("data-state", "still");
                var gifRating = $('<p class="gifParagraph"<span>>').text('Gif Rating: ' + rating);
                var gifDiv = $('<div class="gifDiv">').append(gif, gifRating);
                var colDiv = $('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>').append(gifDiv);
                $('.row').prepend(colDiv);
            }

        });
    }); /* End defining what happens on clicking topics */

    // Defines the form button pushing new topic to button list
    $("#addTreat").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var treat = $("#treat-input").val().trim();
        topics.push(treat);

        // Calls generateButtons function
        generateButtons();
    });

    // Starts and stops gif animations on clicks
    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }); /* End of start and stop animations */

}) /* End of document ready function */