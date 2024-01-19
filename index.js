let searchInput = document.getElementById("search");
var date=new Date()
let serchInput=document.querySelector("#search")

var response

async function getWeaterData(city) {
  response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9f2868d5b28d4d1b99e212658241001&q=${city}&days=3`);
  response = await response.json();
  console.log(response);
}

function displayToDay(){
  document.querySelector("#firstday").innerHTML=`<div class="forecast-header" id="today">
  <div class="day">${date.toLocaleDateString("en-us",{weekday:"long"})}</div>
  <div class="date">${date.getDate()+date.toLocaleDateString("en-us",{month:"long"})}</div>
</div>
<!-- .forecast-header -->
<div class="forecast-content" id="current">
  <div class="location">${response.location.name}</div>
  <div class="degree">
    <div class="num">${response.current.feelslike_c}<sup>o</sup>C</div>

    <div class="forecast-icon">
      <img
        src="https:${response.current.condition.icon}"
        alt=""
        width="90"
      />
    </div>
  </div>
  <div class="custom">${response.current.condition.text}</div>
  <span><img src="imgs/icon-umberella.png" alt="" />${response.current.humidity}%</span>
  <span><img src="imgs/icon-wind.png" alt="" />${response.current.wind_kph}km/h</span>
  <span><img src="imgs/icon-compass.png" alt="" />${response.current.wind_dir}</span>`
}
function displayNextDay(){
  let cartonaa="";
  let arr=response.forecast.forecastday
    for(let i=1;i<arr.length;i++){
      let date2=new Date(arr[i].date);
      cartonaa+= ` <div class="forecast">
      <div class="forecast-header">
        <div class="day">${date2.toLocaleDateString("en-us",{weekday:"long"})}</div>
      </div>
      <!-- .forecast-header -->
      <div class="forecast-content">
        <div class="forecast-icon">
          <img
            src="https:${arr[i].day.condition.icon}"
            alt=""
            width="48"
          />
        </div>
        <div class="degree">${arr[i].day.maxtemp_c}<sup>o</sup>C</div>
        <small>${arr[i].day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${arr[i].day.condition.text}</div>
      </div>
    </div>`

    }
    document.querySelector("#nextday").innerHTML=cartonaa
}


async function displayfun(searchValue="paris"){
  await getWeaterData(searchValue);
  displayToDay()
 displayNextDay()
}
displayfun()
serchInput.addEventListener("input",()=>{
displayfun( serchInput.value)
 
  
})