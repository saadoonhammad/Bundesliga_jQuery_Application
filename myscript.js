let stadiums_url="https://api.myjson.com/bins/12ncb0";
let football_api="d18ffbf8805e4031b8d6f4705d75d8a6";

let mydata;
let stadiums_api= "https://api.myjson.com/bins/12ncb0";
let  currentTeam;
let  currentPlayer;
let currentStadium;
let stadiumsdata;
var map;

$(window).load(function(){
  $.ajax({
    url: stadiums_url,
      success: function(data) {
      console.log(data);
        stadiumsdata=data;

    }
  })
  
})
//Function to get stadiums data from API and isnert into <li> tag
$(document).on('pagebeforeshow',"#home1", function(){
  $(document).on('click','#showstadiums', function(e){
     e.preventDefault();
     $('#stadiumsData li').remove();
     $.each(stadiumsdata, function(index, data){
     $('#stadiumsData').append('<li> '  +'Stadium Name: '
      + stadiumsdata[index].StadiumName  + '<br> </br>' +'Capacity: '+ stadiumsdata[index].Capactiy
      + '<br> </br>' +'Place: '+ stadiumsdata[index].Place
     + '</li>');
    
          
      });
     
     $.mobile.changePage("#stadiumsPage ");
     e.stopImmediatePropagation();
  })
})


        
//Function to get teams data from API and isnert into <li> tag
$(document).on("click","#teams",function() {
    event.preventDefault();

$.ajax({
    headers: { 'X-Auth-Token': football_api },
    url: 'http://api.football-data.org/v2/competitions/2002/standings',
    
    dataType: 'json',
    type: 'GET',
  }).success(function(data) {
 
    console.log(data);
 
    mydata=data.standings[0].table;

    $('#data li').remove();
    $.each(mydata, function(index, data){
      $('#data').append('<li>   <a id="to_details" href="#"><img src="'+mydata[index].team.crestUrl +'" height="60" width="60">'+
      '<span id="'+ index +'" class="ui">'  + mydata[index].team.name 
      +'</span>  </a>  </li>');

  
      $('#data').listview('refresh');
 
    }); 
  });  

 });
// Fuction to get fixture data on click
$(document).on("click","#fixtures",function() {
  event.preventDefault();

$.ajax({
  headers: { 'X-Auth-Token': football_api },
  url: 'http://api.football-data.org/v2/competitions/2002/matches',
  
  dataType: 'json',
  type: 'GET',
}).success(function(data) {
 
  console.log(data);

  matches=data.matches;

  $('#data2 li').remove();
  
  $.each(matches, function(index, data){
    
    $('#data2').append('<li> <span id="'+ index +'" class="ui">' 
    + matches[index].awayTeam.name +'  vs  '+ matches[index].homeTeam.name +'<br></br>' 
    +'Date:  '+matches[index].utcDate+ '<br></br>' + 'Match Day: '+ matches[index].matchday+
    '</span></li>');

    $('#data2').listview('refresh');
    
  }); 
});

});

// Fuction to get top scorers data on click
$(document).on("click","#topScorers",function() {
  event.preventDefault();

$.ajax({
  headers: { 'X-Auth-Token': football_api },
  url: 'http://api.football-data.org/v2/competitions/2002/scorers',
  
  dataType: 'json',
  type: 'GET',
}).success(function(data) {
 
  console.log(data);

  goalsTable=data.scorers;

  $('#goals-table tbody').remove();
  $.each(goalsTable, function(index, data){
    $('#goals-table').append('<tr>  <a href="#" data-rel="external">'+ +'</a>'+ 
     '<td>'+goalsTable[index].player.name+'</td>'+'<td>'+goalsTable[index].team.name+'</td>'  +'<td>'+goalsTable[index].numberOfGoals+'</td>'+
     '<td>'+goalsTable[index].player.position+'</td>'+'<td>'+goalsTable[index].player.nationality+'</td>'+'</tr>');
  
    // $('#goals-table').listview('refresh');

  }); 

});


});

// Navigation from 
$(document).on('pagebeforeshow',"#home1", function(){
  $(document).on('click','#topScorers', function(e){
     e.preventDefault();
 
     $.mobile.changePage("#goalTable");
     e.stopImmediatePropagation();
  })
})


// Function to navigate to goals page
$(document).on('pagebeforeshow',"#home1", function(){
  $(document).on('click','#fixtures', function(e){
     e.preventDefault();
 
     $.mobile.changePage("#fixturePage");
     e.stopImmediatePropagation();
  })
})

// Function to navigate to second page
 $(document).on('pagebeforeshow',"#home1", function(){
  $(document).on('click','#teams', function(e){
     e.preventDefault();
 
     $.mobile.changePage("#home");
     e.stopImmediatePropagation();
  })
})

// Funtion to show team details
 $(document).on('pagebeforeshow',"#home", function(){
  $(document).on('click','#to_details', function(e){
     e.preventDefault();
    //  console.log(e.target);
     currentTeam = mydata[e.target.children[1].id];
 
     $.mobile.changePage("#detail");
     e.stopImmediatePropagation();
  })
})
// Function to populate details page with team details
$(document).on("pagebeforeshow", "#detail", function (e) {
  e.preventDefault();
 
  $("#Name").text('Name: ' +currentTeam.team.name);
  $("#TablePosition").text('Table Position: ' +currentTeam.position);
  $("#Won").text('Won: ' +currentTeam.won);
  $("#Draw").text('Draw: ' + currentTeam.draw);
  $("#Lost").text('Lost: ' + currentTeam.lost);
  $("#Points").text('Points: ' + currentTeam.points);
  $("#GoalsFor").text('Goals For: ' + currentTeam.goalsFor);
  $("#GoalsAgainst").text('Goals Against: ' + currentTeam.goalsAgainst);
  $("#GoalDifference").text('Goal Difference: ' + currentTeam.goalDifference);
  e.stopImmediatePropagation();



});


 //Event listener function for navigation to home page
  $(document).on('click','#home_btn', function(e){
     e.preventDefault();
 
     $.mobile.changePage("#home1");
     e.stopImmediatePropagation();
  })
//   Event listener function for navigation to map page
$(document).on('click','#locate', function(e){
  e.preventDefault();
  
  $.mobile.changePage("#mapPage");
  e.stopImmediatePropagation();

  lat = stadiumsdata[0].Lat;
  lon = stadiumsdata[0].Long

   map = L.map('map').setView([lat, lon], 6);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  window.setTimeout(function (){
    map.invalidateSize();
  },1000);

  for (var i = 0; i < stadiumsdata.length; i++) {
    stadiumName = stadiumsdata[i].Place;
    markers = new L.marker([stadiumsdata[i].Lat, stadiumsdata[i].Long])
      .bindPopup(stadiumName)
      .addTo(map);

}
});


