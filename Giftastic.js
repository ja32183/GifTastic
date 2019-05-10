
$(document).ready(function() {
    
      // Initial array of bands
      var bands = ["Tool", "Opeth", "Mastodon", "Soundgarden"];

      function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-bands", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".band-button", function() {
    $("#bands").empty();
    $(".band-button").removeClass("active");
    $(this).addClass("active");

        var bands = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bands + "&api_key=6Zms3aFuP2koye8EuLPbp1FBii9WPCSW";


        // Creating an AJAX call for the specific band button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // Creating a div to hold the band
          var results = response.data;

          for (var i = 0; i < results.length; i++) {var bandsDiv = $("<div class=\"bands-item\">");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating" + rating);
            
              var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var bandImage = $("<img>");
          bandImage.attr("src", still);
          bandImage.attr("data-still", still);
          bandImage.attr("data-animate", animated);
          bandImage.attr("data-state", "still");
          bandImage.addClass("band-image");

          bandsDiv.append(p);
          bandsDiv.append(bandImage);

          $("#bands").append(bandsDiv);
        }
      });
  });

  $(document).on("click", ".band-image", function() {

var state = $(this).attr("data-state");

if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
}
else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});

$("#add-band").on("click", function(event) {
event.preventDefault();
var newBand = $("input").eq(0).val();

if (newBand.length > 2) {
  bands.push(newBand);
}

populateButtons(bands, "band-button", "#band-buttons");

});

populateButtons(bands, "band-button", "#band-buttons");
});


      