let body = document.querySelector('body');
let select = document.querySelector('select');

axios.get('https://covid-api.mmediagroup.fr/v1/cases').then((response)=>{
    //მომაქვს ინფორმაცია ბექიდან
    let allCountiesInfo = response.data;
    console.log(allCountiesInfo);
    
//ვქმნი გლობალურ ინფორმაციას
    let globalConfirmed = document.querySelector('#confirmed');
    let confirmedInfo = allCountiesInfo.Global.All.confirmed;
    globalConfirmed.innerHTML = "confirmed: " + confirmedInfo;

    let GlobalDeaths = document.querySelector('#deaths');   
    let deathInfo = allCountiesInfo.Global.All.deaths;
    GlobalDeaths.innerHTML = "death: " + deathInfo;

    let globalPopulation = document.querySelector('#population');
    let populationInfo = allCountiesInfo.Global.All.population;
    globalPopulation.innerHTML = "population: " + populationInfo;

    let globalRecovered = document.querySelector('#recovered');
    let recoveredInfo = allCountiesInfo.Global.All.recovered;
    globalRecovered.innerHTML = "recovered: " + recoveredInfo;
    
    //ვაკეთებ ქვეყნების ჩამონათვალს select ისთვის
    let countryKeys = Object.keys(allCountiesInfo);
    console.log(countryKeys);
    for(let i = 0; i < countryKeys.length; i++){
        let option = document.createElement('option');
        option.value = countryKeys[i];
        option.text = countryKeys[i];
        select.appendChild(option);
    }
    // select -ზე ქვეყნის არჩევისას იცვლება ინფორმაცია ყოველი ქვეყნისთვის
    select.addEventListener('change', function(){
        let global = document.querySelector('.global');
        global.classList.add("none");

        let buttonBox = document.querySelector('.button');
        buttonBox.classList.add ("block");

        let location = document.querySelector('#location');
        location.innerHTML = "location: " + allCountiesInfo[this.value].All.location;
        if(!allCountiesInfo[this.value].All.location){
            location.innerHTML = "";
        }
        
        
        let updated = document.querySelector('#updated');
        updated.innerHTML = "updated: " + allCountiesInfo[this.value].All.updated;


        let confirm = document.querySelector('#confirm');
        confirm.innerHTML = "confirmed: " + allCountiesInfo[this.value].All.confirmed;
        
        
        let populationAmount = document.querySelector('#populationAmount');
        populationAmount.innerHTML = "population: " + allCountiesInfo[this.value].All.population;
        

        let death = document.querySelector('#death');
        death.innerHTML = "deaths: " + allCountiesInfo[this.value].All.deaths;
        death.classList.add("none");
        
        
        let lifeExpectancyAmount = document.querySelector('#lifeExpectancyAmount');
        lifeExpectancyAmount.innerHTML = "lifeExpectancy: " + allCountiesInfo[this.value].All.life_expectancy;
        lifeExpectancyAmount.classList.add("none");
        
        let infectionRateAmount = document.querySelector('#infectionRateAmount');
        let confirmedAmount = allCountiesInfo[this.value].All.confirmed;
        let populationAll = allCountiesInfo[this.value].All.population;
        infectionRateAmount.innerHTML = "infection-Rate: " + confirmedAmount/populationAll * 100;
        infectionRateAmount.classList.add("none");
        
        let deathRateAmount = document.querySelector('#deathRateAmount');
        let deathRateAll = allCountiesInfo[this.value].All.deaths;
        deathRateAmount.innerHTML = "deathRate: " + deathRateAll/populationAll * 100;
        deathRateAmount.classList.add("none");

       
    
})
// ღილაკზე დაკლიკვისას იფარება და იშლება მეტი ინფორმაცია
    let button = document.querySelector('button');
    button.addEventListener('click', function(){
        death.classList.toggle('none');
        lifeExpectancyAmount.classList.toggle('none');
        infectionRateAmount.classList.toggle('none');
        deathRateAmount.classList.toggle('none');
    });  

})