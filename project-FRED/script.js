// All the variables and jQuery DOM pointers can be assigned here
var superheroName;
var superhero_src;
var score;

// The following array will be used for a drop-down to select mode of transportation.  The move the user selects will be returned to the selectedMoveMode var, to be used in Colin's distance/points calculation function.
var moveModesArr = ["walk","bike","run","skateboard","walk-jog"];
var selectedMoveMode = "";

// The following array will be replaced by an api function "get superheroes" from Gabe that returns an array of superhero objects.  This is just mock data for us to use in page layout.
var heroesArr = [
    {
        heroID: 1,
        heroName: "Black Widow",
        heroImgURL: "Assets\images\av-img-black-widow-cropped.jpg"
    },{
        heroID: 2,
        heroName: "Iron Man",
        heroImgURL: "Assets\images\av-img-iron-man.png"
    },{
        heroID: 3,
        heroName: "Miles Morales",
        heroImgURL: "Assets/images/av-img-iron-man.png"
    },{
        heroID: 4,
        heroName: "Ms. Marvel",
        heroImgURL: "Assets\images\av-img-msmarvel.jpg"
    }
];

console.log(heroesArr);

// The following "locations" array of objects is designed to be used in a drop-down for saved start points and destinations, and can be appended when user enters new locations.  I've entered some mock data for testing. -Jen
var locationsArr = [
    {
        locName: "Home",
        locStreetNumber: "64",
        locStreetName: "Flicker Drive",
        locCrossStreet: "Alameda del Prado",
        locCity: "Novato",
        locState: "CA",
        locZip: "94949"
    },{
        locName: "School",
        locStreetNumber: "64",
        locStreetName: "399 Alameda De La Loma",
        locCrossStreet: "Via Escondida",
        locCity: "Novato",
        locState: "CA",
        locZip: "94949"
    },{
        locName: "Library",
        locStreetNumber: "64",
        locStreetName: "931 C Street",
        locCrossStreet: "Main Gate Road",
        locCity: "Novato",
        locState: "CA",
        locZip: "94949"
    }
];

//When user selects a location from the locationArr, the selected object will be pushed to travelStart and destination.  Alternately, we could simply push locationsArr.locName[i] to travelStart 
// var travelStart = {};
// var destination - {};

// The screen switcher function will toggle between which screen is displayed.
function screen_switcher(id) {
    var main_divs = $('main');
    var mainDiv;

    for (var i=0; i < main_divs.length; i++) {
        mainDiv = $(main_divs[i]);

        // TODO: delete console.log()
        console.log(mainDiv);

        if (mainDiv.attr('id') === id) {
            mainDiv.show();
        } else {
            mainDiv.hide();
        }
    }
}

// SEGMENT 1: USER INITIALIZATION

// This initialiation sequence will assess whether or not the user is new or returning

function display_UI() {
    $('#user-interface').show();
}


function display_user_info() {
    // Function which will display user info in profile section
}

function update_score(points) {
    score += points;
    localStorage.setItem('userScore', score);
}

// Initial setup
function setup() {
    if (!localStorage.getItem('userCharacter')) {
        screen_switcher('new-user');
        $('.card').on("click", function() {
            console.log("id: ", $(this).attr('id'));
            localStorage.setItem('userCharacter', $(this).attr('id'));
            localStorage.setItem('userScore', 0);
            
            // $('#user-interface').attr('style', "display:block")
            $('#user-interface').show();
            screen_switcher('initial-prompt');
        })
    } else {
        display_UI();
        screen_switcher('initial-prompt');
        display_user_info();
    }    
}
//This function is designed to set up the rows and columns with hero cards.

function buildHeroCards() {
    var heroesRow = $('.heroes-row');
    var col, card, cardImage, cardContent;
    var heroImage, heroName;
    var heroObject;

    for (var i = 0; i < heroesArr.length; i++) {
      heroObject = heroesArr[i];
      col = $('<div></div>').addClass('col s2 m2 l2');
      card = $('<div></div>').addClass('card').attr('id', heroObject.heroID);
      cardImage = $('<div></div>').addClass('card-image');
      cardImage.attr('style', 'background-image: url("' + heroObject.heroImgURL + '")');
    //  TODO: delete commented out lines below
    //   FRED: no longer need heroImage.  We assign a background image to <div class="card-image">
    //   so we can make all the images the same size
    
    //   heroImage = $('<img>').addClass('hero-image').attr('src', heroObject.heroImgURL);
    //   cardImage.append(heroImage);
      cardContent = $('<div></div>').addClass('card-content');
      heroName = $('<p></p>').addClass('hero-name').text(heroObject.heroName);
      cardContent.append(heroName);
      card.append(cardImage);
      card.append(cardContent);
      col.append(card);
      heroesRow.append(col);
    }   

    console.log("HeroObject:" + heroObject);
}

// OTHER OBJECTIVES:
// 1. Create a function which updates score. Ideally, some number of earned points is passed in from segment two. There needs to be a function which
//      accepts these additional points, adds them to the current score, and possible levels up the user if enough points are earned.
// 2. As an added bit of functionality, the user can pick a new avatar to 'unlock' upon reaching a new level. There should be a 'profile' page
//      where the user can toggle between all the different unlocked avatars.


// ---------------------------------------------------------------------------------------------

// The Segment1 - Segment2 junction:

// 1. Segment 1 does not need to pass too much information to Segment 2. Possibly, Segment 2 might need to access information about 
//      superhero avatar in local storage for interactiveness.
// 2. Segment 2, after having calculated new earned points, Segment 2 must pass the number to segment 1 as a raw number. Segment 1 can
//      then update score and level in local storage.


// ---------------------------------------------------------------------------------------------

// SEGMENT 2: User activity prompting - following lines need to be adjusted to sync up var names. This is work from tutoring session but requires tinkering.  

// var addressFormObj;
// var pointsEarned;
// var submitBtn = $('#submitBtn');
// const LS_KEY = "journey";
// // Retrieves the form values and assign to addressFormObj as an object
// function getFormValues() {
//   var transportMode;
//   var startingAddress = $('#startingAddress').val(), 
//       startingCity = $('#startingCity').val(), 
//       startingState = $('#startingState').val(), 
//       startingZip = $('#startingZip').val(), ;
//   var destinationAddress, destinationCity, destinationState, destinationZip;
//   addressFormObj = {
//     transportMode : transportMode,
//     startingAddress: startingAddress,
//     startingCity: startingCity,
//     startingState: startingState,
//     startingZip: startingZip
//     destinationAddress: destinationAddress,
//     destinationCity: destinationCity,
//     destinationState: destinationState,
//     destinationZip: destinationZip
//   };
// }
// function saveToLocalStorage(obj) {
//   localStorage.saveItem(LS_KEY, JSON.stringify(obj));
// }
// function calculatePoints() {
//   // TODO: submit journey via API call that calculates the distance
//   // TODO: submit distance via API call that calculates the points
//   // Save the calculated points to pointsEarned variable
// }
// submitBtn.on('click', function() {
//   getFormValues();
//   saveToLocalStorage();
//   calculatePoints();
// });


// OBJECTIVES:
// 1. The user is asked if they are going to eat or going to do an activity. This information can be stored in a variable, which
//      might be later used in an if-else sequence to determine the application flow.

// 7.2.20 6:50pm Status from Jen:
// The question "What would you like to do" is inserted into the div in the index.html, along with buttons for Grab A Bite and Go Somewhere.  
//Event listeners on those buttons will initialize functions to prompt user for answers: 
//onclick Go Somewhere, prompt user to select mode of transportation, and enter start point and destination.  Start point and destination can be selected from a drop-down which pulls options from the Locations array on the script.

//onclick Grab a Bite, prompt user to select mode of transport and start point, then launch Zomato search (Gabe's function).  
//run function = find_restuarant(initial_lat, initial_lon, trans_mode)

// 2. IF the user is going to do an activity:
// They are prompted to put in the address of their starting place.
// They are asked to put in the address of their ending location.
// They are asked how they plan to arrive there.
// 3. IF the user is going to eat:
// They are asked to enter what kind of food they are interested in, and possibly given some set of options.
// They are asked how they plan on getting there.

// 4. If the user is eating, a DOM table is set up. This table will be built with a jQuery extension library which makes tables more aesthetic and interactive.
// 5. Create a basic algorithm for calculating the score from the mode of transportation and distance traveled.


// -----------------------------------------------------------------------------------------------

// The Segment2 - Segment3/4 junction:

// If the user wants a meal, segment 2 will pass the current address, as well as the restaurant search parameters, to segment3.
// If the user just wants to go do an activity, segment 2 will pass to segment 4 the current address and the destination address.

// NOTE: To be compatible with the Open Route API, address information should be taken from the user and organized into an OBJECT:
//  Address object format: {street_number: <>, street_name: <>, city: <>, state: <>, zip_code: <>}


// ------------------------------------------------------------------------------------------------       

// SEGMENT 3: RESTAURANT SEARCH

// Gabe's Workstation

function find_restuarant(initial_lat, initial_lon, trans_mode) {
    var queryURL = 'https://developers.zomato.com/api/v2.1/search?' + 
    $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/search?q=Mexican&q=Healthy&count=4',
            method: 'GET',
            headers: { 'X-Zomato-API-Key': '1dc29c917607ec14f7f9f5309c721b3c' }
        }).then(function (response) {
            console.log(response)
        })
}
    
// 1. An AJAX call will be made to find some number of related restaurants in the area matching the keys within a certain radius.
// 2. The address of each restaurant will be converted to geocoordinates using the TomTom API
// 3. The current address is fed to the TomTom API to get geocoordinates.
// 4. These pairs of coordinates are fed to the Open Route API to calculate the distance of travel to each restaurant.
// 5. The segment 2 algorithm is used to calculate a score for this restaurant. This score will be appended next to the restaurant choice in the segment 2 DOM table.

// ------------------------------------------------------------------------------------------------
// SEGMENT 4: GENERAL MOVEMENT SEARCH
// 1. The starting and ending addresses are give from segment 2 in the form of the object.
// 2. The TomTom API converts these to geocoordinates.
// 3. These geocoordinates are used by the Open Route API to find a distance.
// 4. This distance is fed to the segment 2 algorithm to add a certain number of points to the user score.


// Colin's work station
// add variables in url to add in values
// need coordinates to be global variables
function colinFunction(cordA, cordB, transpoMode) {

    var queryUrl = "https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3&start=" + cordA +"&end=-87.63451,41.90145";

    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function (response) {
        console.log("Colin's obj " + response);
        // console.log(response.____)
    })
};


// Main function: take in two sets of geo cordinates and calculate the distance of travel. 
// Create/collab variables for geocords (4 data sets total)
// Create ajax call to calculate the directions to travel on foot 
// parse info from object response
// calculate in terms of miles and minutes traveled
// Duration is measured in seconds
// Distance is measured in meters
// Conversion of meters to miles -- divide total meters by 1609 

// Test "1" - branch
// API key for OR: 
// 5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3

$(document).ready(function() {
    buildHeroCards();
    setup();
});