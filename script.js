let cityDataArray = {};
let done = 0;

function newCity() {
  document.getElementById("circle").style.zIndex = "1";
  done = 0;
  fetch("./city_data.json")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      index = Math.floor(Math.random() * data.length);
      cityDataArray = data[index];
      city = data[index].City;
      country = data[index].Country
      document.getElementById('task').innerHTML = "Locate: " + city + ", " + country;
      document.getElementById('distanceOff').innerHTML = "";
      document.getElementById('score').innerHTML = "Map Type:";

      //clear canvas
      canvas = document.getElementById('circle')
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    });

};


document.getElementById("maptype").addEventListener("change", function() {
  d = document.getElementById("maptype").value;
  if (d == "Black Marble") {
    document.getElementById("map").src = "night_map.jpeg";
    document.getElementById("map").style.opacity = "100%";
    document.getElementById("map").style.filter = "brightness(100%)";
  };
  if (d == "Blue Marble") {
    document.getElementById("map").src = "Blue_Marble.png";
    document.getElementById("map").style.opacity = "100%";
    document.getElementById("map").style.filter = "brightness(100%)";
  };
  if (d == "Classic") {
    document.getElementById("map").src = "type2.png";
    document.getElementById("map").style.opacity = "70%";
    document.getElementById("map").style.filter = "brightness(500%)";
  };
});


document.addEventListener("DOMContentLoaded", function() {
  newCity();
});

document.getElementById('retry').addEventListener("click", function() {
  newCity();
});

document.getElementById('map').addEventListener('click', function(e) {
  //find x and y at click relative to canvas and picture
  var rect = e.target.getBoundingClientRect();
  var inputX = e.clientX - rect.left;
  var inputY = e.clientY - rect.top;
  console.log("Left: " + inputX + "; Top: " + inputY + ".");

  //draw circle
  if (done < 1) {
    done++;
    var c = document.getElementById("circle");
    c.style.zIndex = "5";
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(inputX, inputY, 1.0, 0, 2 * Math.PI);
    ctx.globalAlpha = 2.0
    ctx.shadowBlur = 10;
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.shadowColor = "black";
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    //calculate distance away
    var distance = Math.floor(((inputX*62.6171875-cityDataArray.PixelX*62.6171875)**2 + (inputY*62.5125-cityDataArray.PixelY*62.5125)**2)**0.5)
    var randomm = Math.floor(Math.random() * 600);

    if (distance<100) {
      document.getElementById('distanceOff').innerHTML = "Bullseye! You were within " + distance +  " kilometers of the target!";
      var scoree = 100000 - (distance*40) + 6*randomm;
      document.getElementById('score').innerHTML = "Score: " + scoree;
    }
    else if (distance<300) {
      document.getElementById('distanceOff').innerHTML = "Impressive! You were within " + distance +  " kilometers of the target!";
      var scoree = 42000 - distance + randomm
      document.getElementById('score').innerHTML = "Score: " + scoree;
    }
    else if (distance<650) {
      document.getElementById('distanceOff').innerHTML = "Impressive! You were within " + distance +  " kilometers of the target!";
      var scoree = 27000 - distance + randomm
      document.getElementById('score').innerHTML = "Score: " + scoree;
    }
    else if (distance<1400) {
      document.getElementById('distanceOff').innerHTML = "You were off by " + distance + " kilometers. Thats good, but you can do better!";
      var scoreee = 4500 - Math.floor(distance/10) + randomm
      document.getElementById('score').innerHTML = "Score: " + scoreee;
    }
    else if (distance<10000){
      document.getElementById('distanceOff').innerHTML = "You were off by " + distance + " kilometers!";
      var scoreeee = 1300 - Math.floor(distance/30) + randomm
      document.getElementById('score').innerHTML = "Score: " + scoreeee;
    }
    else {
      document.getElementById('distanceOff').innerHTML = "You were off by " + distance + " kilometers!";
      document.getElementById('score').innerHTML = "Score: 0";
    }

    //time to show correct coordinates
    //draw circle
      setTimeout(() => {
        if (cityDataArray.PixelX > 440) {
          ctx.beginPath();
          ctx.arc(cityDataArray.PixelX, cityDataArray.PixelY, 1.0, 0, 2 * Math.PI);
          ctx.globalAlpha = 5.0;
          ctx.shadowBlur = 5;
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.shadowColor = "black";
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#FFFFFF';
          ctx.stroke();
          ctx.font = "italic 10.5px Arial";
          ctx.fillText(cityDataArray.City + ", " + cityDataArray.Country,cityDataArray.PixelX - 60,cityDataArray.PixelY + 10);
        }
        else {
          ctx.beginPath();
          ctx.arc(cityDataArray.PixelX, cityDataArray.PixelY, 1.0, 0, 2 * Math.PI);
          ctx.globalAlpha = 5.0;
          ctx.shadowBlur = 5;
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.shadowColor = "black";
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#FFFFFF';
          ctx.stroke();
          ctx.font = "italic 10.5px Arial";
          ctx.fillText(cityDataArray.City + ", " + cityDataArray.Country,cityDataArray.PixelX + 3.5,cityDataArray.PixelY + 2.5);
        }
      }, 800);

      setTimeout(() => {
        ctx.strokeStyle = 'red';
        ctx.fillStyle = "red";
        ctx.lineWidth = 1.5;
    
        // draw a red line
        ctx.beginPath();
        ctx.moveTo(inputX, inputY);
        ctx.lineTo(cityDataArray.PixelX, cityDataArray.PixelY);
        ctx.stroke();
      }, 800);
    
  };

});