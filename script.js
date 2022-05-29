/*let ip = "8.8.8.8";

const data = {
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "California",
        "city": "Mountain View",
        "lat": 37.38605,
        "lng": -122.08385,
        "postalCode": "94035",
        "timezone": "-07:00",
        "geonameId": 5375480
    },
    "domains": [
        "000000-1v1v1v1v1v1v118888888.sdqpwlbock-gkynimr.tokyo",
        "000000-1v1v1v1v1v1v118888888.vqgnghfanh-qwkjxdkw.tokyo",
        "000000000-00000000-00000x00x00.avtjjdduxprylg.tokyo",
        "000000000-00000000-00000x00x00.besnwgjsyl-opygosu.top",
        "000000000-00000000-00000x00x00.cpbsvcmdybtazu.top"
    ],
    "as": {
        "asn": 15169,
        "name": "GOOGLE",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC",
    "proxy": {
        "proxy": false,
        "vpn": false,
        "tor": false
    }
}*/

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
