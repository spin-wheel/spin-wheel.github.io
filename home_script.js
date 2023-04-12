let passw = parseInt(window.sessionStorage.getItem("pass"));

if (passw != 1234) {
  window.location.href = "https://spin-wheel.github.io/";
  //window.location.href = "http://127.0.0.1:5500/";
}

/////spin wheel/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//0 for nothing, 1 if submitted result
let stat = 0;
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [{ minDegree: 0, maxDegree: 360, value: 1 }];

const rotationValues5 = [ 
   { minDegree: 0, maxDegree: 18, value: 2 }, 
   { minDegree: 19, maxDegree: 90, value: 1 }, 
   { minDegree: 91, maxDegree: 162, value: 5 }, 
   { minDegree: 163, maxDegree: 234, value: 4 }, 
   { minDegree: 235, maxDegree: 305, value: 3 }, 
   { minDegree: 306, maxDegree: 360, value: 2 }, 
 ];


const rotationValues6 = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];
const rotationValues4 = [
  { minDegree: 0, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 180, value: 4 },
  { minDegree: 181, maxDegree: 270, value: 3 },
  { minDegree: 271, maxDegree: 360, value: 2 },
];

const rotationValues3 = [
  { minDegree: 0, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 210, value: 3 },
  { minDegree: 211, maxDegree: 330, value: 2 },
  { minDegree: 331, maxDegree: 360, value: 1 },
];
const rotationValues2 = [
  { minDegree: 0, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 270, value: 2 },
  { minDegree: 271, maxDegree: 360, value: 1 },
];
//Size of each piece
const data = [1, 1, 1, 1, 1, 1];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

////spin wheel//////////////////////////////////////////////////////////////////////////////////////////////////////////////

////fetching academy name and retreiving teacher names,classes and other related data //////////////////////////////////////////////////////////////////////////////////////////////////////////////

let aca_name;
aca_name = window.localStorage.getItem("sel_aca");

let god_data;
god_data = JSON.parse(window.localStorage.getItem("data"));

let table_data = [];
for (let i = 0; i < god_data.length; i++) {
  if (god_data[i][0] == aca_name) {
    table_data.push(god_data[i]);
  }
}
////fetching academy name and retreiving teacher names,classes and other related data //////////////////////////////////////////////////////////////////////////////////////////////////////////////

////render table using table_data //////////////////////////////////////////////////////////////////////////////////////////////////////////////

function render_table() {
  var x = document.getElementById("table_id");
  x.createCaption().innerText = aca_name;

  let row_sel;
  row_sel = parseInt(window.localStorage.getItem("sel_row"));

  var header = x.createTHead();
  var row = header.insertRow(0);

  var cellA = row.insertCell(0);
  var cellB = row.insertCell(1);
  cellA.innerHTML = "<b>Teacher Name<b>";
  cellB.innerHTML = "<b>Unique Code<b>";
  for (let i = 0; i < table_data.length; i++) {
    var row = x.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = table_data[i][1];
    cell2.innerHTML = table_data[i][2];
  }
  var row = x.insertRow(table_data.length+1 );
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = "<b>------------------------------------<b>";
    cell2.innerHTML = "<b>------------------------------------<b>";

    var row = x.insertRow(table_data.length + 2);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = "<b>Row Selected  :  <b>";
    cell2.innerHTML = row_sel;
}
render_table();
////render table using table_data //////////////////////////////////////////////////////////////////////////////////////////////////////////////

////render chart //////////////////////////////////////////////////////////////////////////////////////////////////////////////
let myChart;
let label_var = [];
for (let i = 0; i < table_data.length; i++) {
  label_var.push(table_data[i][1]);
}
function render_chart() {
  myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
      //Labels(values which are to be displayed on chart)
      labels: label_var,
      //Settings for dataset/pie
      datasets: [
        {
          backgroundColor: pieColors,
          data: new Array(table_data.length).fill(1),
        },
      ],
    },
    options: {
      //Responsive chart
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        //hide tooltip and legend
        tooltip: false,
        legend: {
          display: false,
        },
        //display labels inside pie chart
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) =>
            context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
        },
      },
    },
  });
}
render_chart();
////render chart //////////////////////////////////////////////////////////////////////////////////////////////////////////////

let rotation_value_selector;
if (table_data.length == 2) {
  rotation_value_selector = rotationValues2;
} else if (table_data.length == 3) {
  rotation_value_selector = rotationValues3;
} else if (table_data.length == 4) {
  rotation_value_selector = rotationValues4;
}else if (table_data.length == 5) {
  rotation_value_selector = rotationValues5;
}

 else {
  rotation_value_selector = rotationValues;
}
//display value based on the randomAngle
var audio = new Audio('sound.mp3');
var train= new Audio('train.mp3');

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  audio.play();
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * 360);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
let winner = [];

const valueGenerator = (angleValue) => {
  for (let i of rotation_value_selector) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Winner: ${table_data[i.value - 1][1]}</p>`;
      console.log(table_data[i.value - 1]);
      winner = table_data[i.value - 1];
      window.localStorage.setItem("winner", JSON.stringify(winner));
      audio.pause();
      audio.currentTime=0;
      
      
      setTimeout(function(){
        confetti.start();
      },1000);
      train.play();
      
      setTimeout(function(){
        confetti.stop();
      },8000);
      spinBtn.disabled = false;
      break;
    }
  }
};

function submit() {
  let award_money = document.getElementById("award_money").value;

  let row_sel;
  row_sel = parseInt(window.localStorage.getItem("sel_row"));

  var time = unix_to_time(new Date().getTime());
  var date = unix_to_date(new Date().getTime());
  if ((award_money.length > 0) & (stat == 0)) {
    update_data(winner, time, date, award_money, row_sel);
  }
}

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCofNKXGLmDBwxCSzyfjPQQf0sUtcaMy_0",
  authDomain: "spin-wheelz.firebaseapp.com",
  projectId: "spin-wheelz",
  storageBucket: "spin-wheelz.appspot.com",
  messagingSenderId: "118466041762",
  appId: "1:118466041762:web:9717138830c4112e6f44fb",
});
const db = firebaseApp.firestore();

const update_data = (data, time, date, award_money, row) => {
  db.collection(data[0])
    .add({
      Time: time,
      Date: date,
      Academy_Name: data[0],
      Teacher_Name: data[1],
      Teacher_code: data[2],
      Award_Money: award_money,
      Selected_row: row,
      Student_Name: "",
      Student_id: "",
    })
    .then((docRef) => {
      console.log("Written");
      finalValue.innerHTML = `<p>Submitted</p>`;
      stat = 1;
      window.location.href = "https://spin-wheel.github.io/thank.html";
      //window.location.href = "http://127.0.0.1:5500/thank.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

function unix_to_time(timestamp) {
  var date = new Date(timestamp);
  return date.toLocaleTimeString("default");
}

function unix_to_date(timestamp) {
  var date = new Date(timestamp);
  return date.toLocaleDateString("default");
}

function next_page() {
  let num_of_stu = document.getElementById("numbers").value;
  window.localStorage.setItem("num_of_stu", num_of_stu);

  if ((num_of_stu != 0) & (stat == 0)) {
    window.location.href = "https://spin-wheel.github.io/ran_stu_sel.html";
    //window.location.href = "http://127.0.0.1:5500/ran_stu_sel.html";
  }
}

function render_dropdown() {
  let x = document.getElementById("numbers");
  for (let i = 0; i < 23; i++) {
    let option = document.createElement("option");

    option.text = i;
    x.add(option);
  }
}
render_dropdown();

function render_dropdown2() {
  let x = document.getElementById("award_money");
  for (let i = 1000; i < 2000; i = i + 1000) {
    let option = document.createElement("option");

    option.text = i;
    x.add(option);
  }
}
render_dropdown2();



var confetti = {
	maxCount: 150,		//set max confetti count
	speed: 2,			//set the particle animation speed
	frameInterval: 15,	//the confetti animation frame interval in milliseconds
	alpha: 1.0,			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	gradient: false,	//whether to use gradients for the confetti particles
	start: null,		//call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
	stop: null,			//call to stop adding confetti
	toggle: null,		//call to start or stop the confetti animation depending on whether it's already running
	pause: null,		//call to freeze confetti animation
	resume: null,		//call to unfreeze confetti animation
	togglePause: null,	//call to toggle whether the confetti animation is paused
	remove: null,		//call to stop the confetti animation and remove all confetti immediately
	isPaused: null,		//call and returns true or false depending on whether the confetti animation is paused
	isRunning: null		//call and returns true or false depending on whether the animation is running
};

(function() {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.toggle = toggleConfetti;
	confetti.pause = pauseConfetti;
	confetti.resume = resumeConfetti;
	confetti.togglePause = toggleConfettiPause;
	confetti.isPaused = isConfettiPaused;
	confetti.remove = removeConfetti;
	confetti.isRunning = isConfettiRunning;
	var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
	var streamingConfetti = false;
	var animationTimer = null;
	var pause = false;
	var lastFrameTime = Date.now();
	var particles = [];
	var waveAngle = 0;
	var context = null;

	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = Math.random() * Math.PI;
		return particle;
	}

	function toggleConfettiPause() {
		if (pause)
			resumeConfetti();
		else
			pauseConfetti();
	}

	function isConfettiPaused() {
		return pause;
	}

	function pauseConfetti() {
		pause = true;
	}

	function resumeConfetti() {
		pause = false;
		runAnimation();
	}

	function runAnimation() {
		if (pause)
			return;
		else if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			var now = Date.now();
			var delta = now - lastFrameTime;
			if (!supportsAnimationFrame || delta > confetti.frameInterval) {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				updateParticles();
				drawParticles(context);
				lastFrameTime = now - (delta % confetti.frameInterval);
			}
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}

	function startConfetti(timeout, min, max) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimationFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, confetti.frameInterval);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
			document.body.prepend(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
			context = canvas.getContext("2d");
		} else if (context === null)
			context = canvas.getContext("2d");
		var count = confetti.maxCount;
		if (min) {
			if (max) {
				if (min == max)
					count = particles.length + max;
				else {
					if (min > max) {
						var temp = min;
						min = max;
						max = temp;
					}
					count = particles.length + ((Math.random() * (max - min) + min) | 0);
				}
			} else
				count = particles.length + min;
		} else if (max)
			count = particles.length + max;
		while (particles.length < count)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		pause = false;
		runAnimation();
		if (timeout) {
			window.setTimeout(stopConfetti, timeout);
		}
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function removeConfetti() {
		stop();
		pause = false;
		particles = [];
	}

	function toggleConfetti() {
		if (streamingConfetti)
			stopConfetti();
		else
			startConfetti();
	}
	
	function isConfettiRunning() {
		return streamingConfetti;
	}

	function drawParticles(context) {
		var particle;
		var x, y, x2, y2;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			x2 = particle.x + particle.tilt;
			x = x2 + particle.diameter / 2;
			y2 = particle.y + particle.tilt + particle.diameter / 2;
			if (confetti.gradient) {
				var gradient = context.createLinearGradient(x, particle.y, x2, y2);
				gradient.addColorStop("0", particle.color);
				gradient.addColorStop("1.0", particle.color2);
				context.strokeStyle = gradient;
			} else
				context.strokeStyle = particle.color;
			context.moveTo(x, particle.y);
			context.lineTo(x2, y2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle) - 0.5;
				particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();