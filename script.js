// All the variables and jQuery DOM pointers can be assigned here
var userStatus;
var superheroName;
var superhero_src;


// The screen switcher function will toggle between which screen is displayed.
function screen_switcher(id_name) {

    var main_divs = $('main');
    for (i=0; i<main_divs.length; i++) {
        if (main_divs[i].attr('id') === id_name) {
            main_divs[i].attr('data-visible', 'visible');
        }
        else {
            main_divs[i].attr('data-visible', 'invisible')
        };

    };
};

// SEGMENT 1: USER INITIALIZATION
// Kaitlins workstation

// This initialiation sequence will assess whether or not the user is new or returning
if (localStorage.getItem('isreturning') === null) {
    userStatus = 'new';
}

else {
    userStatus = 'returning'
};

function new_user() {
    // This is the main initialization function for a first time user. It will must do several things:
        // 1. It must give the user options for possible avatars to choose.
        // 1. When an avatar is chosen, it must create in local storage a 'superhero name' and 'superhero image' items which store the user avatar.
        // 2. It must create variables for the score (and possibly level) and store these in local storage as well.
        // 3. It must append the score and image to the appropriate part of the DOM.
}

function returning_user() {
    // This is the main initialization function for returning users. It must:
        // 1. It must retrieve the same superhero name and image stored in the new_user function.
        // 2. It must retrieve the user score and level and append them to the appropriate part of the DOM.
}

if (userStatus === 'new') {
    new_user();
}

else {
    returning_user();
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

// SEGMENT 2: User activity prompting

// OBJECTIVES:
    // 1. The user is asked if they are going to eat or going to do an activity. This information can be stored in a variable, which
    //      might be later used in an if-else sequence to determine the application flow.
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

// 1. An AJAX call will be made to find some number of related restaurants in the area matching the keys within a certain radius.
// 2. The address of each restaurant will be converted to geocoordinates using the TomTom API
// 3. The current address is fed to the TomTom API to get geocoordinates.
// 4. These pairs of coordinates are fed to the Open Route API to calculate the distance of travel to each restaurant.
// 5. The segment 2 algorithm is used to calculate a score for this restaurant. This score will be appended next to the restaurant choice in the segment 2 DOM table.

// ------------------------------------------------------------------------------------------------

// SEGMENT 4: GENERAL MOVEMENT SEARCH
// Colin's work station
$.ajax({
url: 'https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3&start=-87.68-21,41.95303&end=-87.63451,41.90145',
method: 'GET'
}).then(function (response) {
console.log(response);
})

blah blah blah - Kesha
// Test "1" - branch
// API key for OR: 
// 5b3ce3597851110001cf6248664ece6aa70a4c7dbf8aa68951f471c3
// 1. The starting and ending addresses are give from segment 2 in the form of the object.
// 2. The TomTom API converts these to geocoordinates.
// 3. These geocoordinates are used by the Open Route API to find a distance.
// 4. This distance is fed to the segment 2 algorithm to add a certain number of points to the user score.