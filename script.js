
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
    console.log("topics: " + topics);

    // Define a function to generate buttons from topics array (to be called both at page load and after adding buttons through form. 
    function generateButtons() {
        $("#treatButtons").empty();
        for (i = 0; i < topics.length; i++) {
            $("<button>").appendTo("#treatButtons").addClass("btn btn-primary m-1").attr("id", "button" + i).text(topics[i]);
        };
    }; /* End definition of generateButtons function */

    // Calling generateButtons function on page load
    generateButtons();

    // Event is clicking the topic. It puts content into 
    $(document).on("click", "button", function () {

        // Clears the #treats div before populating it with new gifs
        $("#treats").empty();

        // topic becomes assigned to the text of the button
        var topic = $(this).text();

        // Defines and logs the url for the query from the Giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Bk0gJvP8J1hf0LAggvKMSd7E86pBG6PB&limit=10&q=" + topic
        console.log("queryURL: " + queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log("response.data.length: " + response.data.length);

            // Loops through results to generate page
            for (var i = 0; i < response.data.length; i++) {

                // Stores and logs url of still gif
                var gifImageStill = response.data[i].images.original_still.url;
                console.log("gifImageStill URL: " + gifImageStill);

                // Stores url of animated gif
                var gifImageAnimate = response.data[i].images.original.url;
                console.log("gifImageAnimate URL: " + gifImageAnimate);

                // Stores gif rating
                var gifImageRating = response.data[i].rating;
                console.log("gifImageRating: " + gifImageRating);

                $("#p" + i).text(gifImageRating);
                $("#img" + i).attr("src", gifImageStill).attr("data-animate", gifImageAnimate).attr("data-still", gifImageStill).attr("data-state", "still");

                //Declare variable to hold initial div
                var imgContainer = $("<div>");

                var imgTag = $("<img />")
                    .attr("src", gifImageStill)
                    .attr("alt", topic + " image " + i)
                    .attr("data-state", "still")
                    .attr("data-still", gifImageStill)
                    .attr("data-animate", gifImageAnimate)
                    .addClass("img-treat");

                imgContainer.append(imgTag);

                $("#treats").append(imgContainer);

                // Starts and stops gif animations on clicks
                $("#treats").on("click", ".img-treat", function () {
                    console.log("gif clicked");
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                }); /* End of start and stop animations */

            }; /* End gif generation loop */
            
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


}) /* End of document ready function */