let passw = parseInt(window.sessionStorage.getItem("pass"));

if (passw != 1234) {
  window.location.href = "https://spin-wheel.github.io/";
  //window.location.href = "http://127.0.0.1:5500/";
}

/////spin wheel/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
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

////render chart //////////////////////////////////////////////////////////////////////////////////////////////////////////////
let myChart;
let label_var = ["Apple", "Mango", "Banana", "Litchi", "Papaya", "Pineapple"];

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
          data: data,
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

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Fruit: ${label_var[i.value - 1]}</p>`;
      audio.pause();
      audio.currentTime=0;
      train.play();
      spinBtn.disabled = false;
      
      
      
      break;
    }
  }
};

function next_page() {
  window.location.href = "https://spin-wheel.github.io/row_sel.html";
  //window.location.href = "http://127.0.0.1:5500/row_sel.html";
}
