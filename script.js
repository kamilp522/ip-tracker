let place = {
  //
  // LOCATION API THANKS TO: https://geo.ipify.org/
  //

  api_key: "at_MI3enRM1fe9SBt6KgGERvXHzVOynl",

  fetchPlace: function (ip) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${this.api_key}${ip}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.showOnMap(data);
        this.showInformation(data);
      })
      .catch((error) => console.log(error));
  },

  showOnMap: function (data) {
    //
    // MAP THANKS TO: https://leafletjs.com/
    //

    const container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }

    const lat = data.location.lat;
    const lng = data.location.lng;
    const map = L.map("map", { zoomControl: false }).setView([lat, lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 14,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  },

  showInformation: function (data) {
    document.querySelector(".ip-address .info").innerText = data.ip;
    document.querySelector(".location .info").innerText = data.location.city;
    document.querySelector(".timezone .info").innerText =
      data.location.timezone;
    document.querySelector(".isp .info").innerText = data.isp;
  },

  validateIp: function (ipAddress) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipAddress
      )
    ) {
      return true;
    }
    return false;
  },

  searchPlace: function (e) {
    e.preventDefault();

    let search_box_input = document.querySelector(".search-box").value;

    if (place.validateIp(search_box_input)) {
      place.fetchPlace(`&ipAddress=${search_box_input}`);
    } else {
      alert("Incorrect ip address format!");
    }
  },
};

place.fetchPlace("");

document
  .querySelector(".search-btn")
  .addEventListener("click", place.searchPlace);
