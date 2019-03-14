$(document).ready(function () {
    // Array of movies
    var movies = ["Pulp Fiction", "Clueless", "Goodfellas", "Matrix", "Jurassic Park", "The Silence of the Lambs"];

    // Function to add buttons to the page 
    function addButton() {
        // Delete movie buttons prior to adding in order to prevent dupes 
        $("#buttons-view").empty();
        
        // Loop through movie array
        for (var i = 0; i < movies.length; i++) {
            // Generate buttons for each movie in the array.
            var movie = $("<button>");
            // Add class
            movie.addClass("movie-button");
            // Add data-attribute with a value of the movie at index i
            movie.attr("data-movie", movies[i]);
            // Providing the button's text with a value of the movie at index i
            movie.text(movies[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(movie);
        }
    }

    addButton();

    // Create on-click event to add movies to array
    $("#add-movie").on("click", function() {   
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movies.push(movie);
        addButton();
        return;
    });
     
    // Getting gifs for the movie from API and push to HTML
    $("button").on("click", function () {
        var movie = $(this).attr("data-movie");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=htf5yldviuI2M12ZM2xFRDfTfCTOZhEJ&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        // Display GIF rating
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var moviesDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var movieImage = $("<img>");

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    movieImage.attr("src", still);
                    movieImage.attr("data-still", still);
                    movieImage.attr("data-animate", animated);
                    movieImage.attr("data-state", "still");
                    movieImage.addClass("movie-image");

                    moviesDiv.append(p);
                    moviesDiv.append(movieImage);
                    $("#movies").append(moviesDiv);
                }
            });
    });

    // Function to change the state of GIF from still to animated 
    $(document).on("click", ".movie-image", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "Still");
        }
    });

});

// Get the added movie-button GIFs to display