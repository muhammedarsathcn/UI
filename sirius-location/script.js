$(document).ready(function () {
  $(".accordion").click(function () {
    $(this).toggleClass("active");
    const icon = $(this).find("i");
    if (icon.length) {
      icon.toggleClass("rotate");
    }
    const panel = $(this).next();
    if (panel.css("display") === "block") {
      panel.css("display", "none");
    } else {
      panel.css("display", "block");
    }
  });
});

const countryCodes = {
  "United States": "US",
  India: "IN",
  Canada: "CA",
  "United Kingdom": "GB",
};
$(document).ready(function () {
  $.getJSON("./data/locations.json", function (locations) {
    let locationHTML = "";
    locations.forEach(function (location) {
      locationHTML = `
        <article class="location-card">
          <span class="country">
            <figure class="flag">
              <img src="https://flagsapi.com/${countryCodes[location.country]}/flat/64.png" alt="${location.country}" />
            </figure>
            <p>${location.state}</p>
          </span>
          <p class="city">${location.city}</p>
          <p class="contact-number">${location.contact}</p>
        </article>
      `;
      $(".section-three").append(locationHTML);
    });
  });
});

$(document).ready(function () {
  $(".tab").click(function () {
    const tabText = $(this).text().trim();
    $(".section-one").hide();
    $(".section-two").hide();
    $(".section-three").hide();
    $(".tab").removeClass("active-tab");

    $(this).addClass("active-tab");

    if (tabText === "ABOUT US") {
      $(".section-one").show();
    } else if (tabText === "SOLUTIONS") {
      $(".section-two").show();
    } else if (tabText === "LOCATIONS") {
      $(".section-three").show();
    }
  });
});
