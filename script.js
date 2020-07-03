// All the variables and jQuery DOM pointers can be assigned here
var superheroName;
var superhero_src;
var score;

// The following array will be used for a drop-down to select mode of transportation.  The move the user selects will be returned to the selectedMoveMode var, to be used in Colin's distance/points calculation function.
var moveModesArr = ["walk", "bike", "run", "skateboard", "walk-jog"];
var selectedMoveMode = "";

// The following array will be replaced by an api function "get superheroes" from Gabe that returns an array of superhero objects.  This is just mock data for us to use in page layout.
var heroesArr = [{
    heroID: 1,
    heroName: "Black Widow",
    heroImgURL: "https://i.pinimg.com/originals/64/16/a9/6416a9d467b9d4d8149586c51171eb55.jpg"
}, {
    heroID: 2,
    heroName: "Iron Man",
    heroImgURL: "https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg"
}, {
    heroID: 3,
    heroName: "Miles Morales",
    heroImgURL: "https://66.media.tumblr.com/1660aaf63f281fc31564d42c8b3ed887/tumblr_pku5xlUfU11rda9da_540.jpg"
}, {
    heroID: 4,
    heroName: "Ms. Marvel",
    heroImgURL: "https://ca-times.brightspotcdn.com/dims4/default/4c8db25/2147483647/strip/true/crop/1988x1118+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F0d%2F8a%2Fd79cac66abbd1b9731dcee088d54%2Fla-trabrown-1478289681-snap-photo"
}];

console.log(heroesArr);

// The following "locations" array of objects is designed to be used in a drop-down for saved start points and destinations, and can be appended when user enters new locations.  I've entered some mock data for testing. -Jen
var locationsArr = [{
    locName: "Home",
    locStreetNumber: "64",
    locStreetName: "Flicker Drive",
    locCrossStreet: "Alameda del Prado",
    locCity: "Novato",
    locState: "CA",
    locZip: "94949"
}, {
    locName: "School",
    locStreetNumber: "64",
    locStreetName: "399 Alameda De La Loma",
    locCrossStreet: "Via Escondida",
    locCity: "Novato",
    locState: "CA",
    locZip: "94949"
}, {
    locName: "Library",
    locStreetNumber: "64",
    locStreetName: "931 C Street",
    locCrossStreet: "Main Gate Road",
    locCity: "Novato",
    locState: "CA",
    locZip: "94949"
}];

//When user selects a location from the locationArr, the selected object will be pushed to travelStart and destination.  Alternately, we could simply push locationsArr.locName[i] to travelStart 
// var travelStart = {};
// var destination - {};

// The screen switcher function will toggle between which screen is displayed.
function screen_switcher(id_name) {

    var main_divs = $('main');
    for (i = 0; i < main_divs.length; i++) {
        console.log(main_divs[i])
        if (main_divs[i].getAttribute('id') === id_name) {
            main_divs[i].setAttribute('style', 'display:block');
        } else {
            main_divs[i].setAttribute('style', 'display:none')
        };
        console.log(main_divs[i])

    };
};

// SEGMENT 1: USER INITIALIZATION

// This initialiation sequence will assess whether or not the user is new or returning

function display_UI() {
    $('#user-interface').attr('style', "display:block")
}

if (localStorage.getItem('user character') === null) {
    screen_switcher('new-user');
    $('.card').on("click", function () {
        localStorage.setItem('user character', $(this).attr('id'));
        localStorage.setItem('user score', 0);

        $('#user-interface').attr('style', "display:block")
        screen_switcher('initial-prompt');

    })
} else {

    display_UI()
    screen_switcher('initial-prompt')
    display_user_info()
}

function display_user_info() {
    $("#greeting").text("Hello " + localStorage.getItem("user character"));
    // Function which will display user info in profile section
}

function update_score(points) {
    score += points;
    localStorage.setItem('user score', score);
}

//This function is designed to set up the rows and columns with hero cards.

// function buildHeroCards() {
//     var heroesRow = $('.heroes-row');
//     var col, card, cardImage, cardContent;
//     var heroImage, heroName;
//     var heroObject;
//     for(var i = 0; i < heroesArr.length; i++) {
//       heroObject = heroesArr[i];
//       col = $('<div></div>').addClass('col s2 m2 l2');
//       card = $('<div></div>').addClass('card').attr('id', heroObject.id);
//       cardImage = $('<div></div>').addClass('card-image');
//       heroImage = $('<img>').addClass('hero-image').attr('src', heroObject.heroImgURL);
//       cardImage.append(heroImage);
//       cardContent = $('<div></div>').addClass('card-content');
//       heroName = $('<p></p>').addClass('hero-name').text(heroObject.heroName);
//       cardContent.append(heroName);
//       card.append(cardImage);
//       card.append(cardContent);
//       col.append(card);
//       heroesRow.append(col);
//   }

// 
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
// finish this function to push addressFormObj to locationsArr
// var addressFormObj;
// var pointsEarned;
// var submitBtn = $('#submitBtn');
// const LS_KEY = "journey";
// // Retrieves the form values and assign to addressFormObj as an object
// function getFormValues() {
//   var transportMode;
//   var startAddress = $('#startAddress').val(), 
//       startCity = $('#startCity').val(), 
//       startState = $('#startState').val(), 
//       startZip = $('#startZip').val(), ;
//   var destinationAddress, destinationCity, destinationState, destinationZip;
//   addressFormObj = {
//     transportMode : transportMode,
//     startAddress: startAddress,
//     startCity: startCity,
//     startState: startState,
//     startZip: startZip
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
// They are prompted to put in the address of their start place.
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
            headers: {
                'X-Zomato-API-Key': '1dc29c917607ec14f7f9f5309c721b3c'
            }
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
// Process Overview
// 1. The starting and ending addresses are give from segment 2 in the form of the object.
// 2. The TomTom API converts these to geocoordinates.
// 3. These geocoordinates are used by the Open Route API to find a distance.
// 4. This distance is fed to the segment 2 algorithm to add a certain number of points to the user score.

// Taking address info from Jen and creating geo-cords from it
function doubleAddressRoute(addressObj1, addressObj2) {

    // // Extracting info from address object 1
    // var streetNumber1 = addressObj1.locStreetNumber;
    // var streetName1 = addressObj1.locStreetName;
    // // var crossStreet1 = addressObj1.locCrossStreet;
    // var city1 = addressObj1.locCity;
    // var state1 = addressObj1.locState;
    // var zip1 = addressObj1.locZip;

      // Testing TomTom with Address 1
      var streetNumber1 = "1421";
      var streetName1 = "Lexington Drive";
      // var crossStreet1 = addressObj1.locCrossStreet;
      var city1 = "San Jose";
      var state1 = "CA";
      var zip1 = "95117";

    // local variables to use in openRoute
    var cordA = '';
    var cordB = '';

    // First TomTom call - from HOME
    $.ajax({
        // &countrySubdivision=Illinoiso&postalCode=60618 example of state and zip 
        // might need states to be spelled fully. 
        url: 'https://api.tomtom.com/search/2/structuredGeocode.JSON?key=L7UIPFqhhWosaSn7oAMjfGZGsRJ9EnPU&countryCode=US&streetNumber=' + streetNumber1 + '&streetName=' + streetName1 + '&municipality=' + city1 + '&countrySubdivision=' + state1 + '&postalCode=' + zip1,
        method: 'GET'
    }).then(function (responseOne) {

        // console log clarity 
        console.log("First cordinate:");
        console.log(responseOne);
        console.log("======================")

        // Testing Geo-Cordinates from first TomTom call
        console.log(responseOne.results[0].position.lat);
        console.log(responseOne.results[0].position.lon);

        //  Geo-Cordinates from first TomTom call
        cordA = (responseOne[1].lat) + "," + responseOne[1].lon;

    // Extracting info from address object 2
        var streetNumber2 = addressObj2.locStreetNumber;
        var streetName2 = addressObj2.locStreetName;
        // var crossStreet1 = addressObj1.locCrossStreet;
        var city2 = addressObj2.locCity;
        var state2 = addressObj2.locState;
        var zip2 = addressObj2.locZip;

        // Second TomTom call - from Secondary Location
        // COMMENT - Only works if Secondary Location is located as the second object in locationsArr
        $.ajax({

            // &countrySubdivision=Illinoiso&postalCode=60618 example of state and zip 
            // might need states to be spelled fully. 
            url: 'https://api.tomtom.com/search/2/structuredGeocode.JSON?key=L7UIPFqhhWosaSn7oAMjfGZGsRJ9EnPU&countryCode=US&streetNumber=' + streetNumber2 + '&streetName=' + streetName2 + '&municipality=' + city2 + '&countrySubdivision=' + state2 + '&postalCode=' + zip2,
            method: 'GET'

        }).then(function (responseTTNFb) {

            // console log clarity 
            console.log("Second cordinate");
            console.log(responseTTNFb);
            console.log("======================")

            // Testing Geo-Cordinates from first TomTom call
            console.log(responseTTNFb[1].lat);
            console.log(responseTTNFb[1].lon);

            //  Geo-Cordinates from first TomTom call
            cordB = (responseTTNFb[1].lat) + "," + responseTTNFb[1].lon;

            // Calling openRoute API
            openRouteNF();

            // Taking mode of travel response from user & Jen
            // Test variable
            // selectedMoveMode = "bike";

            function openRouteNF(cordA, cordB) {

                // Console log tests for cords
                console.log("Colins TT cord check");
                console.log("cordA =" + cordA);
                console.log("cordB =" + cordB);
                console.log("================");

                // Test cordinate values from TomTom
                // var cordA = "-87.68021,41.95303";
                // var cordB = "-87.63451,41.90145";

                if (((selectedMoveMode === "walk") || (selectedMoveMode === "run") || (selectedMoveMode === "walk-jog"))){
                    var queryUrl = "https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3&start=" + cordA + "&end=" + cordB;

                } else {
                    var queryUrl = "https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3&start=" + cordA + "&end=" + cordB;

                };
                $.ajax({
                    // Longitude comes first, then latitude, in each query url
                    url: queryUrl,
                    method: 'GET'
                }).then(function (response) {

                    // console checks
                    console.log("Colin's Obj:");
                    console.log(response);
                    console.log("Total distance traveled " + responseB.features[0].properties.summary.distance);
                    console.log("Total time travelled " + responseB.features[0].properties.summary.duration);


                    // Takes distance in meters and converts it to miles
                    var distanceMeters = responseB.features[0].properties.summary.distance;
                    var distanceMiles = distanceMeters / 1609;
                    // Makes number spit out two decimal places 
                    var twoDecimals = distanceMiles.toFixed(2);
                    // Outputs miles
                    // To do list: 1) Append a p tag with info 
                    $('#confirmation').text("Total distance walked " + twoDecimals + " miles");
                    console.log("==========================");


                    // Create generate score function here?
                    // Test 1
                });
            };
        })
    })
};

// Create generate score function here?
// Test 1
doubleAddressRoute ();

// API key for OR: 
// 5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3

$(document).ready(function () {


    // buildHeroCards()
});