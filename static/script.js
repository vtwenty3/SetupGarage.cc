function uploadMode() {
	
    var popUp = document.getElementById("popupUpload");
    var y = document.getElementById("uploadBtn");
    var z = document.getElementById("downloadTable");
    var u = document.getElementById("setupsHeader");
    var a = document.getElementById("columnSetup-Upload");
    u.innerHTML = "Upload a Setup";
    z.style.display = "none";
    a.style.display = "flex";

    if (popUp.style.display === "none") {
      popUp.style.display = "block";
      m.style.display = "block";

    }
    else{
        y.disabled = true;
        popUp.style.display = "block";
        z.style.display = "none";
        m.style.display = "block";

    }

  }
  
  var close = document.getElementsByClassName("closebtn");
  var i;
  var selection = 0;
  

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
      var div = this.parentElement;
      div.style.opacity = "0";
    }
  }

  function getName(str) {
    var Name;
    Name = str.split('\\').pop().split('/').pop();
    return ( Name.split('.').slice(0, -1).join('.'))
  }

  function carSelect(img) {
    var ChangeIt = document.getElementById("testCar")
    var rof = document.getElementById("carInp")
    var name = img.src;
    var carLoad = document.getElementById("carLoad")
    ChangeIt.src = name;
    rof.value = getName(name);
    carLoad.value = rof.value;
     selection ++;
     
  }

  function trackSelect(img) {
    var ChangeIt = document.getElementById("testTrack")
    var rof = document.getElementById("trackInp")
    var trackLoad = document.getElementById("trackLoad")
    var name = img.src;
    ChangeIt.src = name;
    rof.value = getName(name);
    trackLoad.value = rof.value;
     selection ++;

  }


function uploadsetups() {
	var ChangeIt = document.getElementById("uplBool")
	ChangeIt.value = "yes"
}






function undoF(){
  var track = document.getElementById("testTrack");
  var car = document.getElementById("testCar");
  track.src = "img/tracks/selectTrack.png";
  car.src = "img/cars/selectCar.png";
}


function loadValid(){
	if (selection != 2){
		alert("Car or Track Not Selected!");
	    return false;
	}
}

function validate() {
  // Get the value of the input field with id="numb"
  let username = document.getElementById("username").value;
  let tracktemp = document.getElementById("tracktemp").value;
  let notes = document.getElementById("setupNotesInp").value;
  var car = document.getElementById("testCar");
  var track = document.getElementById("testTrack");
  var mnlen = 5;
  var maxlen = 160;
  // If x is Not a Number or less than one or greater than 10

if (selection != 2){
	alert("Car or Track Not Selected!");
    return false;
}



  if (username == "") {
    alert("Username must be filled out");
    return false;
}
if (isNaN(tracktemp) || tracktemp < 1 || tracktemp > 55) {
  alert("Tracktemp must be valid number. Do not include \"c\".");
  return false;
}

if(notes.length < mnlen)
{ 
alert("Note too short! Try including best lap time and possible improvements. ");
return false;
}
else if (notes.length > maxlen)
{ 
alert("Note too long! Maximum chars allowed: " +maxlen+ ". Your input:" +notes.length);
return false;
}
}



function redirectF() {
	timeout = setTimeout(redirectFF, 4000);
	}



function redirectFF() {
		window.location.href = '/';
		}

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 90,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#f7c6c6"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#a20000",
      "opacity": 0.6,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);;
