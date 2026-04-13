$(document).ready(function () {
  //Accordion mapping
  $("#accordion").accordion({
    collapsible: true,
    heightStyle: "content",
    animate: 200,
    active: true,
    icons: {
      header: "ui-icon-triangle-1-e",
      activeHeader: "ui-icon-triangle-1-s",
    },
  });
  // Country codes mapping
  const countryCodes = {
    "United States": "US",
    "India": "IN",
    "Canada": "CA",
    "United Kingdom": "GB",
  };
  // Fetch locations data
  $.getJSON("./data/locations.json", function (locations) {
    // Create fragment
    const fragment = $(document.createDocumentFragment());
    locations.forEach(function (location) {
      const locationDiv = $("<div>").addClass("location");
      const flagWrapper = $("<span>").addClass("flag-wrapper");
      const figure = $("<figure>").addClass("flag-container");
      const flagImg = $("<img>")
        .attr(
          "src",
          `https://flagsapi.com/${countryCodes[location.country]}/flat/64.png`,
        )
        .attr("alt", location.country);
      const countryText = $("<p>").addClass("country").text(location.state);
      const stateText = $("<p>").addClass("state").text(location.city);
      const phoneText = $("<p>").addClass("phone-no").text(location.contact);
      // Build structure
      figure.append(flagImg);
      flagWrapper.append(figure, countryText);
      locationDiv.append(flagWrapper, stateText, phoneText);
      // Append to fragment instead of DOM
      fragment.append(locationDiv);
    });
    // Append fragment once to DOM
    $("#section-three").append(fragment);
  });

  // jQuery UI tabs
  $("#tabs").tabs();
  // Tab switching logic
  $(".tab").click(function () {
    const target = $(this).data("target");
    $(".section-one, .section-two, .section-three").hide();
    $(".tab").removeClass("active-tab");
    $(this).addClass("active-tab");
    $("." + target).show();
  });
});
