'use strict'

//variables
let currentCity;
let currentLong;
let currentLat;
let allWeather;
const date = new Date();
let searchBtn=document.getElementById('search-btn')
let searchValue=document.getElementById('search-value');
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDay = date.getDate();
const currentDayName =  days[date.getDay()];
const currentMonth =  monthNames[date.getMonth()] ;
let shownData=document.getElementById('wether-data');
let dayTwo=date.getDay()+1 ,dayThree=date.getDay()+2;

date.getDay()==6 ? (  dayTwo= 0,dayThree =1 ) 
: date.getDay()==5 ? ( dayThree =0 ) :"";


//condition.icon to get image
//current.temp_c temprature
//status condition.text 
getLocation();
if (document.body.contains(searchBtn)) {
       // functionMange() ;
        getLocation();
}

async function getWeather(currentLong,currentLat) {
      
        let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=51228da869164f5eb1a103306233107&q=${currentLat},${currentLong}&days=3`);  
                response=await response.json();
                 allWeather=  response;
                 //show data from here 

                        if(!response.error && response!=null ){
                                displayWeather() ;
                                }   
                   
}



// get city with lang ang lat
        // async function getCity(long,lat) {
                        
        //         let response=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);``
        //                 response=await response.json();
        //                 currentCity=response.city;        
        // }


//    async function functionMange() {
//         await  getLocation();
//         await  getCity(currentLong,currentLat);
//         await  getLocation(currentCity);
//       }  

async function getLocation() 
        {       if (navigator.geolocation) {  navigator.geolocation.getCurrentPosition(showPosition);  }
                else { console.log("Geolocation is not supported by this browser."); }
        }
function showPosition(position) {   
               currentLong=position.coords.longitude;
                currentLat=position.coords.latitude; 

                getWeather(currentLong,currentLat);
        } 

// display function is here----------------------------
 function displayWeather() {
      let box="";

        if (allWeather!=null) {
                box=`
                <div class="col-lg-4">
                        <div class="card ">
                                <div class="card-header d-flex flex-row justify-content-between align-items-center">
                                        <span> ${currentDayName} </span>
                                        <span>${currentDay+currentMonth}</span>
                                </div>
                                        <div class="card-body">
                                         <h5 class="card-title">${allWeather.location.name}</h5>
                                                <div class="degree d-flex justify-content-center align-items-center ">
                                                        <div class="num">${allWeather.current.temp_c}<sup>o</sup>C</div>
                                                        <div class="forecast-icon">
                                                        <img src="images/${allWeather.current.condition.icon.slice(35, allWeather.current.condition.icon.lengh)}" alt="" width="90">
                                                </div>	
                                        </div>
                                            <p id="weather-status">${allWeather.current.condition.text}</p>
                                        <div class="card-footer ">
                                                 <div class="icon-info  d-flex flex-row align-items-center justify-content-center p-1 ">
                                                        <span>
                                                        <img src="images/icon-umberella.png" class="px-2" alt="">20%
                                                        </span>
                                                        <span>
                                                        <img src="images/icon-wind.png" class="px-2" alt=""> 18km/h
                                                        </span>
                                                        <span>
                                                        <img src="images/icon-compass.png" class="px-2" alt=""> East
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>  
                <div class="col-lg-4">
                        <div class="card ">
                                <div class="card-header d-flex flex-row justify-content-center align-items-center">
                                        <span> ${days[date.getDay()+1]} </span>
                                </div>
                                <div class="card-body text-center ">
                                
                                
                                
                               
                                        <div class="degree d-flex justify-content-center align-items-center  flex-column">
                                                <img src="images/${allWeather.forecast.forecastday[1].day.condition.icon.slice(35, allWeather.current.condition.icon.lengh)}" alt="" width="90">
                                                <div class="Midd-num">${allWeather.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup></div>
                                                <div class="foot-num">${allWeather.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></div>
                                        </div>
                                        <p id="weather-status" class="pt-3">${allWeather.forecast.forecastday[1].day.condition.text}</p>
                                </div>
        
                        </div>
                  
                </div>
                
                <div class="col-lg-4">
                        <div class="card ">
                                        <div class="card-header d-flex flex-row justify-content-center align-items-center">
                                        <span>  ${days[date.getDay()+2]}  </span>
                                        </div>
                                <div class="card-body text-center ">
                                        <div class="degree d-flex justify-content-center align-items-center  flex-column">
                                        <img src="images/${allWeather.forecast.forecastday[2].day.condition.icon.slice(35, allWeather.current.condition.icon.lengh)}" alt="" width="90">
                                                <div class="Midd-num">${allWeather.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup></div>
                                                <div class="foot-num">${allWeather.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></div>
                                        </div>
                                <p id="weather-status" class="pt-3">${allWeather.forecast.forecastday[2].day.condition.text}</p>
                                
                                </div>
        
                        </div>
                  
                </div>
                `
                shownData.innerHTML=box;
        } else {
                
        }
      
      }

// searching function events 
if (document.body.contains(searchBtn)) {   searchBtn.addEventListener('click',function () { searchWeather();  })    }
if (document.body.contains(searchValue)) { searchValue.addEventListener('input',function () {  searchWeather();   })}
//main search function
function searchWeather() {  
     
        searchValue.value=="" ?  getLocation() :getWeather(searchValue.value)  ;
          
           }
//media querry chamges
if (window.innerWidth<=991) {
        document.querySelector('.navbar-toggler').style.backgroundColor='var(--main-color)';
        document.querySelector('.navbar-toggler-icon').style.backgroundImage="none";
        document.querySelector('.navbar-toggler-icon').classList.add('text-center');
        document.querySelector('.navbar-toggler-icon').innerHTML=`<i class="fa-solid fa-bars mt-1" style="color: #ffffff;"></i>`;
} 
