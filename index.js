function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  var myLatlng = new google.maps.LatLng(10.8600507079183, 106.7593487595593);
  var schLatlng = new google.maps.LatLng(10.845854060340471,106.79454802852483);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myLatlng,
  });
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);


  //Hiển thị thông tin
  const infowindow1 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>Tran Le Thanh Tinh</b> - 21yrs <br> ID: 5951071108 <br> Phone number: 0984427078 <br> Mail: thanhtinhtranle@gmail.com</div>',
    position: myLatlng,
  });

  //Hiển thị thông tin
  const infowindow2 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>University of Transport and Communication</b> <br> 450-451 Le Van Viet, Tang Nhon Phu A Ward, Thu Duc City</div>',
    position: schLatlng,
  });

  // Marker
  const marker = new google.maps.Marker({
    position: myLatlng,
    title: "My house",
    map: map,
    icon: "./img/mypic.jpg",
  });

  const marker1 = new google.maps.Marker({
    position: schLatlng,
    title: "Đại học GTVT Phân hiệu Tp.HCM",
    map: map,
    icon: "./img/utc2-resize.jpg",
  });

  //   document.getElementById("myhouse") = marker;
  //   document.getElementById("utc2") = marker1;

  // Khi click vào Marker thì hiển thị
  google.maps.event.addListener(marker, "click", function () {
    infowindow1.open(map, marker);
  });
  google.maps.event.addListener(marker1, "click", function () {
    infowindow2.open(map, marker1);
  });
}

google.maps.event.addDomListener(window, "load", initMap);
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
