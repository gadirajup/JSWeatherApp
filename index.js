window.addEventListener('load', () => {
    let long;
    let lat;
    let api; 

    let temperatureDiscription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    let temperatureSection = document.querySelector('.temperature')
    let temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            api = `${proxy}https://api.darksky.net/forecast/06cb022dda13a98023e9fb201a6d3634/${lat},${long}`

            console.log(api)
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    temperatureDegree.textContent = temperature
                    temperatureDiscription.textContent = summary
                    locationTimezone.textContent = data.timezone

                    let celcius = (temperature - 32) * (5/9)

                    setIcons(icon, document.querySelector('.icon') )

                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius)
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature
                        }
                    })
                });
        });
    } else {
        console.log("Won't work without location");
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

});