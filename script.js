// All the variables and jQuery DOM pointers can be assigned here
var superheroName;
var superhero_src;
var score = 10;
var firstLocName = [];
var secondLocName = [];

// The following array will be used for a drop-down to select mode of transportation.  The move the user selects will be returned to the selectedMoveMode var, to be used in Colin's distance/points calculation function.
var moveModesArr = ["walk", "bike", "run", "skateboard", "walk-jog"];
var selectedMoveMode = "";

// The following array will be replaced by an api function "get superheroes" from Gabe that returns an array of superhero objects.  This is just mock data for us to use in page layout.

var heroesObj = {
    "Black Widow": "Assets/images/av-img-black-widow-cropped.jpg",
    "Iron Man": "Assets/images/av-img-iron-man.jpg",
    "Miles Morales": "Assets/images/av-img-miles-morales.jpg",
    "Ms. Marvel": "Assets/images/av-img-msmarvel.jpg",
    "Black Panther": "Assets/images/av-img-black-panther.jpg",
}

// The following "locations" array of objects is designed to be used in a drop-down for saved start points and destinations, and can be appended when user enters new locations.  I've entered some mock data for testing. -Jen


//When user selects a location from the locationArr, the selected object will be pushed to travelStart and destination.  Alternately, we could simply push locationsArr.locName[i] to travelStart 
// var travelStart = {};
// var destination - {};

// TUTORNOTE: New screen switcher function from Fred. His suggestion to fix bugs:
function screen_switcher(id) {
    var main_divs = $('main');
    var mainDiv;

    for (var i = 0; i < main_divs.length; i++) {
        mainDiv = $(main_divs[i]);

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
    // $('#user-interface').attr('style', "display:block")
    //TUTORNOTE: Use show function and .hidden class instead of inline styling and add attribute
}

function display_user_info() {
    $("#greeting").text("Hello " + localStorage.getItem("userCharacter"));
    $("#profile-greeting").text(localStorage.getItem("userCharacter"));
    $("#profile-details").text("Points: " + localStorage.getItem("userScore"));
    console.log(heroesObj[localStorage.getItem('userCharacter')])
    $("#profile-img").attr('src', heroesObj[localStorage.getItem('userCharacter')])
    console.log($("#profile-img").attr('src'))
    // var profileImg = $('#profile-img');
    // profileImg = $('<div></div>').addClass('profile-image');
    // profileImg.attr('style','background-image: url(("_____")')
    // Function which will display user info in profile section
    //TUTORNOTE: user character should be userCharacter (no space, camelcase)
}


//TUTORNOTE: if then else statement and event handlers should be within the setup function, which is defined here but called in document.ready later. 
function setUp() {

    if (localStorage.getItem('userCharacter') === null) {
        //TUTORNOTE: if (!localStorage.getItem('userCharacter'))
        //TUTOENOTE: The keys for local storage should not have spaces, that can throw errors. Removed spaces in userCharacter and userScore.
        screen_switcher('new-user');
        $('#user-interface').hide()
        $('.card').on("click", function () {
            localStorage.setItem('userCharacter', $(this).attr('id'));
            localStorage.setItem('userScore', 0);

            // Replace this: $('#user-interface').attr('style', "display:block") ...with:
            $('#user-interface').show();
            screen_switcher('initial-prompt');
            display_user_info()

        })

    } else {
        display_UI()
        screen_switcher('initial-prompt')
        display_user_info()
    }


    var goBtn = $('#btn-go');
    goBtn.on('click', function () {
        screen_switcher('activity');
        $('#sideBar').addClass('hide-on-small-only');
    });

    var transpoSubmit = $('#transpo-submitBtn')
    transpoSubmit.on("click", function (event) {
        for (const mode of $('.transpo')) {
            if (mode.checked) {
                selectedMoveMode = mode.getAttribute('id');
            };
        };

        if (selectedMoveMode) {
            screen_switcher('address-input');
        } else {
            $('#activity-invalid').show();
            setTimeout(function () {
                $('#activity-invalid').hide()
            }, 2000)
        }



    })

    // screen_switcher("address-input");
    var submitBtn = $('#submitBtn')

    submitBtn.on('click', function (event) {
        event.preventDefault();
        var startPointObj = getStartValues();
        var endPointObj = getEndValues();

        if (startPointObj.startNum && startPointObj.startName && startPointObj.startCity && endPointObj.endNum && endPointObj.endName && endPointObj.endCity) {

            // storeLocations(startPointObj, endPointObj);
            console.log("PointA :" + JSON.stringify(startPointObj) + "PointB :" + JSON.stringify(endPointObj))

            // push this to global variables
            var firstLoc = startPointObj.startLocName;
            console.log(firstLoc);
            var secondLoc = endPointObj.endLocName;

            firstLocName.push(firstLoc);
            secondLocName.push(secondLoc);
            console.log("firstLocName = " + firstLocName);
            console.log("secondLocName = " + secondLocName);
            doubleAddressRoute(startPointObj, endPointObj);
            // takeLocNames(startPointObj, endPointObj);
        } else {
            $('#address-invalid').show();
            setTimeout(function () {
                $('#address-invalid').hide()
            }, 2000)
        }

    });

    $('#badgeOne').on('click', function (event) {
        window.open('About.html');

    })

    $('#badgeTwo').on('click', function (event) {
        location.reload();

    })

    $('#badgeThree').on('click', function (event) {
        window.open('Links.html');

    })
}

// OTHER OBJECTIVES:
// 1. Create a function which updates score. Ideally, some number of earned points is passed in from segment two. There needs to be a function which accepts these additional points, adds them to the current score, and possible levels up the user if enough points are earned.

// 2. As an added bit of functionality, the user can pick a new avatar to 'unlock' upon reaching a new level. There should be a 'profile' page where the user can toggle between all the different unlocked avatars.

// ---------------------------------------------------------------------------------------------

// The Segment1 - Segment2 junction:

// 1. Segment 1 does not need to pass too much information to Segment 2. Possibly, Segment 2 might need to access information about 
//      superhero avatar in local storage for interactiveness.
// 2. Segment 2, after having calculated new earned points, Segment 2 must pass the number to segment 1 as a raw number. Segment 1 can
//      then update score and level in local storage.


// ---------------------------------------------------------------------------------------------

// SEGMENT 2: USER ACTIVITY PROMPTING - OBJECTIVES:
// 1. The user is asked if they are going to eat or do an activity. Their responses will be used in an if-else sequence to determine the application flow.
// As of 7.3, the question "What would you like to do" is inserted into a div in the index.html, with buttons for Grab A Bite and Go Somewhere.
//TO DO: Need to write event listeners on those buttons to call functions to screen switch to activity or meal divs.

// TO DO: The following function will create start and end point objects for use by Colin's function, and also push those to the locations array.  Needs to be finished and adjusted to sync up var names


//need an event listener on this: screen_switcher("address-input");

;

function getStartValues() {
    // Retrieves the form values and assigns them to startPointObj
    var startPointObj;
    // var startLocName = $('#startLocName').val();
    // var startAddress = $('#startAddress').val();
    startLocName = $('#startLocName').val()
    startLocNum = $('#startNum').val();
    startName = $('#startName').val();
    startCity = $('#startCity').val();

    startPointObj = {
        startLocName: startLocName,
        startNum: startLocNum,
        startName: startName,
        startCity: startCity,
    }; // end of startPointObj
    return startPointObj;
} // end of getStartValues function

function getScore() {
    return parseInt(localStorage.getItem('userScore'));
}

function setScore(current_score) {
    localStorage.setItem("userScore", current_score)
}

function updateScore(new_points) {
    var current_score = getScore();
    current_score += parseFloat(new_points);
    setScore(current_score)
    $('#profile-details').text('Points: ' + current_score)
}
//we probably don't need this stuff:
// function startingPointSaver () {
//     const LS_KEY = "journey";
// }; end of startingPointSaver function
// function endPointSaver {
//     // Retrieves the form values and assigns them to endPointObj
//     var submitBtn = $('#submitBtn');
//     const LS_KEY = "journey";

function getEndValues() {
    var endPointObj, endLocName, endAddress, endCity, endState, endZip;
    endLocName = $('#endLocName').val();
    endNum = $('#endNum').val();
    endName = $('#endName').val();
    endCity = $('#endCity').val();

    endPointObj = {
        endLocName: endLocName,
        endNum: endNum,
        endName: endName,
        endCity: endCity,
    } // end of endPointObj
    return endPointObj;
}; // end of getEndValues function
// end of getEndValues function

// function storeLocations(startPointObj, endPointObj) {

//     // localStorage.saveItem(LS_KEY, JSON.stringify(startPointobj));
//     locationsArr.push(startPointObj);
//     locationsArr.push(endPointObj);
// }; //end of storeLocations function
// };//end of endPointSaver function

// }
// function saveToLocalStorage(obj) {
//   localStorage.saveItem(LS_KEY, JSON.stringify(obj));
// }
// function calculatePoints() {
//   // TODO: submit journey via API call that calculates the distance
//   // TODO: submit distance via API call that calculates the points
//   // Save the calculated points to pointsEarned variable
// }


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

$('#btn-eat').on("click", function () {
    screen_switcher('activity2');
    $('#sideBar').addClass('hide-on-small-only');
})

$('#home-from-food').on("click", function () {
    location.reload();
})

var transpoSubmit2 = $('#transpo-submitBtn2')
transpoSubmit2.on("click", function (event) {
    for (const mode of $('.transpo2')) {
        if (mode.checked) {
            selectedMoveMode = mode.getAttribute('id');
        };
    };
    if (selectedMoveMode) {
        screen_switcher('eat-div');
    } else {
        $('#activity2-invalid').show();
        setTimeout(function () {
            $('#activity2-invalid').hide()
        }, 2000)
    }
})

function confirm_choice(name, points) {
    screen_switcher('food-choice-confirm');
    $('#restaurant-confirm').text('For your choice to ' + selectedMoveMode + ' to ' + name + ', here are ' + points + ' points!');
    updateScore(points);
}

$('#meal-submit').on("click", function (event) {
    event.preventDefault();
    var street_num = $('#startNumber2').val();
    var street_name = $('#startStreet2').val();
    var city = $('#startCity2').val();

    if (street_num && street_name && city) {

        var address = {
            locStreetNumber: street_num,
            locStreetName: street_name,
            locCity: city
        }
        find_restaurants(address)
    } else {
        $('#meal-invalid').show();
        setTimeout(function () {
            $('#meal-invalid').hide()
        }, 2000)
    }
})

function scoreCalculator(distance) {
    var totalScore;

    if (selectedMoveMode === "walk") {
        totalScore = (distance * 10).toFixed();
    } else if (selectedMoveMode === "walk-jog") {
        totalScore = (distance * 20).toFixed();
    } else if (selectedMoveMode === "run") {
        totalScore = (distance * 30).toFixed();
    } else if (selectedMoveMode === "skateboard") {
        totalScore = (distance * 15).toFixed();
    } else if (selectedMoveMode === "bike") {
        totalScore = (distance * 25).toFixed();
    }

    return totalScore

}

function find_restaurants(address_object) {

    var street_num = address_object.locStreetNumber;
    var street_name = address_object.locStreetName;
    var city = address_object.locCity;

    var current_loc_url = 'https://api.tomtom.com/search/2/structuredGeocode.JSON?key=L7UIPFqhhWosaSn7oAMjfGZGsRJ9EnPU&countryCode=US&streetNumber=' + street_num + '&streetName=' + street_name + '&municipality=' + city

    $.ajax({
        url: current_loc_url,
        method: 'GET'
    }).then(function (response) {
        var current_lat = response.results[0].position.lat;
        var current_lon = response.results[0].position.lon;

        let zomato_url = 'https://developers.zomato.com/api/v2.1/search?q=Healthy&lat=' + current_lat + '&lon=' + current_lon + '&radius=8050&count=10'

        $.ajax({
            url: zomato_url,
            method: 'GET',
            headers: {
                'X-Zomato-API-Key': '1dc29c917607ec14f7f9f5309c721b3c'
            }
        }).then(function (response) {
            var tableData = []
            var index = 1;
            for (const place of response.restaurants) {

                var restaurant_lat = place.restaurant.location.latitude;
                var restaurant_lon = place.restaurant.location.longitude;
                var openroute_url = 'https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3&start=' + current_lon + ',' + current_lat + '&end=' + restaurant_lon + ',' + restaurant_lat

                $.ajax({
                    url: openroute_url,
                    method: 'GET'
                }).then(function (response) {
                    var distance_to = response.features[0].properties.summary.distance / 1609;
                    var points = scoreCalculator(distance_to)
                    tableData.push({
                        id: index,
                        name: place.restaurant.name,
                        address: place.restaurant.location.address,
                        score: points
                    })
                    index += 1

                    if (index === 10) {
                        screen_switcher('food-choices')
                        var header = $('<h4>');
                        header.attr("style", "text-align: center")
                        header.text('Choose a restaurant to ' + selectedMoveMode + ' to and earn points!')

                        ;

                        var table = new Tabulator("#food-choices", {
                            data: tableData,
                            layout: "fitColumns",
                            columns: [{
                                    title: "Name",
                                    field: "name"
                                },
                                {
                                    title: "Address",
                                    field: "address"
                                },
                                {
                                    title: "Score",
                                    field: "score",
                                    sorter: "number"
                                },
                            ],
                            rowClick: function (e, row) {
                                let points = row.getData().score;
                                let name = row.getData().name;
                                confirm_choice(name, points)
                            },
                        });
                        table.redraw(true)
                        $('#food-choices').prepend(header)
                    }
                })
            };
        })
    })
};



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


    // Extracting info from address object 1
    var streetNumber1 = addressObj1.startNum;
    var streetName1 = addressObj1.startName;
    // var crossStreet1 = addressObj1.locCrossStreet;
    var city1 = addressObj1.startCity;

    // local variables to use in openRoute
    var cordA = '';
    var cordB = '';

    // First TomTom call - from HOME
    $.ajax({
        // &countrySubdivision=Illinoiso&postalCode=60618 example of state and zip 
        // might need states to be spelled fully. 
        url: 'https://api.tomtom.com/search/2/structuredGeocode.JSON?key=L7UIPFqhhWosaSn7oAMjfGZGsRJ9EnPU&countryCode=US&streetNumber=' + streetNumber1 + '&streetName=' + streetName1 + '&municipality=' + city1,
        method: 'GET'
    }).then(function (responseOne) {

        // console log clarity 
        console.log("First cordinate:");
        console.log(responseOne);
        console.log("======================")

        // Testing Geo-Cordinates from first TomTom call
        console.log("First lat: " + responseOne.results[0].position.lat);
        console.log("First lon: " + responseOne.results[0].position.lon);

        //  Geo-Cordinates from first TomTom call
        cordA = responseOne.results[0].position.lon + "," + responseOne.results[0].position.lat;


        // // Extracting info from address object 2
        var streetNumber2 = addressObj2.endNum;
        var streetName2 = addressObj2.endName;
        // var crossStreet1 = addressObj1.locCrossStreet;
        var city2 = addressObj2.endCity;

        // // Testing TomTom with Address 2
        // var streetNumber2 = "10100";
        // var streetName2 = "Finch Ave";
        // // var crossStreet1 = addressObj1.locCrossStreet;
        // var city2 = "Cupertino";
        // var state2 = "CA";
        // var zip2 = "95014";

        // Second TomTom call - from Secondary Location
        // COMMENT - Only works if Secondary Location is located as the second object in locationsArr
        $.ajax({
            // &countrySubdivision=Illinoiso&postalCode=60618 example of state and zip 
            // might need states to be spelled fully. 
            url: 'https://api.tomtom.com/search/2/structuredGeocode.JSON?key=L7UIPFqhhWosaSn7oAMjfGZGsRJ9EnPU&countryCode=US&streetNumber=' + streetNumber2 + '&streetName=' + streetName2 + '&municipality=' + city2,
            method: 'GET'

        }).then(function (responseTwo) {

            // console log clarity 
            console.log("Second cordinate");
            console.log(responseTwo);
            console.log("======================")

            // Testing Geo-Cordinates from first TomTom call
            // console.log("Second lat: " + responseTwo.results[0].position.lat);
            // console.log("Second lon: " + responseTwo.results[0].position.lon);

            //  Geo-Cordinates from first TomTom call
            cordB = responseTwo.results[0].position.lon + "," + responseTwo.results[0].position.lat;

            console.log("This is cordA: " + cordA);
            console.log("This is cordB: " + cordB);

            // Calling openRoute API
            openRouteNF();

            // Taking mode of travel response from user & Jen
            function openRouteNF() {

                // Console log tests for cords
                console.log("cordA =" + cordA);
                console.log("cordB =" + cordB);
                console.log("================");

                // determining which route to take
                if (((selectedMoveMode === "walk") || (selectedMoveMode === "run") || (selectedMoveMode === "walk-jog"))) {
                    var queryUrl = "https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3&start=" + cordA + "&end=" + cordB;

                } else {
                    var queryUrl = "https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3&start=" + cordA + "&end=" + cordB;

                };
                $.ajax({
                    // Longitude comes first, then latitude, in each query url
                    url: queryUrl,
                    method: 'GET'
                }).then(function (responseB) {

                    // console checks
                    console.log("Colin's Obj:");
                    console.log(responseB);
                    // console.log("Total distance traveled " + responseB.features[0].properties.summary.distance);
                    // console.log("Total time travelled " + responseB.features[0].properties.summary.duration);


                    // Takes distance in meters and converts it to miles
                    var distanceMeters = responseB.features[0].properties.summary.distance;
                    var distanceMiles = distanceMeters / 1609;
                    // Makes number spit out two decimal places 
                    var finalDistance = distanceMiles.toFixed(2);
                    // Outputs miles

                    // Tracks how long it will take ( - might not be super accurate though -)
                    var totalTime = ((responseB.features[0].properties.summary.duration) / 60).toFixed();
                    console.log("This should take you " + totalTime + " minutes");

                    console.log("Miles traveled: " + finalDistance);

                    $('#confirmation').text("Total distance walked " + finalDistance + " miles");
                    scoreGenerator(finalDistance);
                    // score = finalDistance;

                    // Create generate score function here?
                    // Test 1

                })
            }
        })
    })
};
console.log("check1");
// Points per mile - Score function
function scoreGenerator(totalDistance) {
    if (selectedMoveMode === "walk") {
        var totalScore = (totalDistance * 10).toFixed();
        console.log(totalScore);
    }
    if (selectedMoveMode === "walk-jog") {
        var totalScore = (totalDistance * 20).toFixed();
        console.log(totalScore);
    }
    if (selectedMoveMode === "run") {
        var totalScore = (totalDistance * 30).toFixed();
        console.log(totalScore);
    }
    if (selectedMoveMode === "skateboard") {
        var totalScore = (totalDistance * 15).toFixed();
        console.log(totalScore);
    }
    if (selectedMoveMode === "bike") {
        var totalScore = (totalDistance * 25).toFixed();
        console.log(totalScore);
    }
    confirmationPage(totalDistance, totalScore);
}

// Confirm page 
function confirmationPage(finalDistance, totalScore) {

    $('#startingLoc').text("Starting location: " + firstLocName);
    $('#endingLoc').text("Ending location: " + secondLocName);
    $('#totalDistance').text("Total Distance: " + finalDistance);
    $('#pointsEarned').text("Total points from this route: " + totalScore);
    // $('#confirmMessage1').text("Awesome! If you " + selectedMoveMode + " " + finalDistance + " miles, you will earn " + totalScore + " points!");
    updateScore(totalScore);
    $('#confirmMessage2').text("Since starting project Miles, you have earned " + getScore() + " points!");
    // localStorage.setItem('user score', )
    screen_switcher('confirmationPage');
};

// Return home function
// This is on the last div; however, we could make this a button that persists throughout
$('#btn-home').on("click", function () {
    location.reload();
})



// Function to move back one page
$('#btn-previous').on("click", function () {

    // Find the id of the parent-main div 
    var parentId = $(this).parent().attr('id');
    // Send that parentId to s_s_prev
    screen_switcher_previous(parentId);

});

function screen_switcher_previous(id_name) {

    var main_divs = $('main');
    console.log(main_divs)
    for (i = 0; i < main_divs.length; i++) {
        // finds the parentId
        if (main_divs[i].getAttribute('id') === id_name) {
            // displays the main div previous on page
            main_divs[i - 1].setAttribute('style', 'display:block');
        } else {
            main_divs[i].setAttribute('style', 'display:none')
        };

    };
};

// Create generate score function here?
// Test 1


//TUTORNOTE: All functions called should be inside document.ready, including if then else statement, and all initialize activities should be in an initialize function


$(document).ready(function () {
    // buildHeroCards();
    setUp();

});