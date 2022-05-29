$(document).ready(function () {
    $.getJSON("https://jsonip.com/?callback=?", function (data) {
        let ip = data.ip;
        getipInformation(ip); 
    });
});

$('.submit').on('click', function () {
    const ip = $('input').val();

    getipInformation(ip);   

});

function getipInformation(ip){
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: {apiKey: api_key, ipAddress: ip},
        success: function(data){
            let city = data['location']['city'];
            let region = data['location']['region'];
            let postCode = data['location']['postalCode'];
            let country = data['location']['country'];
            let utc = data['location']['timezone'];
            let isp = data['isp'];

            let ipElement = $('.ip-result');
            ipElement.text(ip);

            let locationElement = $('.location-result');
            locationElement.text(`${city}, ${region} ${postCode}`);

            let timeElement = $('.timezone-result');
            timeElement.text(`UTC ${utc}`);

            let ispElement = $('.isp-result');
            ispElement.text(isp)

            let lng = data['location']['lng'];
            let lat = data['location']['lat'];

            generateMap(lat, lng)

        }
    });
}

function generateMap(lat, lng){
    //if (map != undefined) map.remove();
    const map = L.map('map').setView([lat, lng], 13);

    let myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [38, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lng], {icon: myIcon}).addTo(map)
}
