
$(document).ready(function() {
  $("#search-input").on("click", function() {
    $(this).val("");
    $("#error-message").text("");
  });

  $("#search-button").on("click", function() {
    searchAnime();
  });

  $("#search-input").on("keyup", function(event) {
    if (event.keyCode === 13) {
      searchAnime();
    }
  });

  $("#search-input").on("focus", function() {
    $(this).val("");
    $("#error-message").text("");
  });

  $("#anime-details").on("dblclick", ".anime-title", function() {
    var animeId = $(this).data("anime-id");
    console.log("Double clicked anime with ID: " + animeId);
  });

  $("#clear-button").on("click", function() {
    clearSearch();
  });

  function searchAnime() {
    var searchTerm = $("#search-input").val().trim();

    if (searchTerm === "") {
      $("#search-input").addClass("invalid");
      $("#error-message").text("Please enter a valid anime title.");
      return;
    }

    $("#error-message").text("Searching anime...");

    $.ajax({
      url: "https://api.jikan.moe/v4/anime?q=" + encodeURIComponent(searchTerm),
      method: "GET",
      success: function(response) {
        var animeResults = response.data;

        $("#anime-details").empty();

        if (animeResults.length === 0) {
          $("#error-message").text("No anime found for: " + searchTerm);
        } else {
          $("#error-message").text("Showing results for: " + searchTerm);

          for (var i = 0; i < animeResults.length; i++) {
            var animeData = animeResults[i];
            var animeDetailsElement = $("<div></div>");
            animeDetailsElement.append("<h2 class='anime-title' data-anime-id='" + animeData.id + "'>" + animeData.title + "</h2>");
            animeDetailsElement.append("<p>Synopsis: " + animeData.synopsis + "</p>");
            animeDetailsElement.append("<p>Episodes: " + animeData.episodes + "</p>");
            animeDetailsElement.append("<p>Status: " + animeData.status + "</p>");
            animeDetailsElement.append("<img src='" + animeData.image_url + "' alt='" + animeData.title + "'>");

            $("#anime-details").append(animeDetailsElement);
          }
        }
      },
      error: function(xhr, status, error) {
        $("#error-message").text("Error: " + error);
      }
    });
  }

  function clearSearch() {
    $("#search-input").val("");
    $("#error-message").text("Search cleared.");
    $("#anime-details").empty();
  }
});