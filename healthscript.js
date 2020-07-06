//ONE: Need a div in html where you want the tip to appear with id=#tip

//TWO: Add array to script.js

var healthTips = [
    {
        tip: "By just moderately pushing your skateboard you’ll burn around 400 calories an hour, 800 calories if you skate aggressively.",
        topics: ["skateboarding", "exercise", "transportation"],
    },{
        tip: "Keep your fast-food meals around 500 calories or fewer.  Avoid french fries and onion rings. Choose a side salad with light dressing and you'll level up the health quality of your meal",
        topics: ["fast-food", "nutrition"],
    },{
        tip: "Grilled chicken or steak are usually your best option on the menu at most fast-food places",
        topics: ["fast-food", "nutrition"],
    },{
        tip: "Do you know about the secret menu at In-N-Out? Order your burger 'Protein Style' with lettuce in lieu of the bun and you'll seriously lower your calories and carbs.",
        topics: ["fast-food", "nutrition"],
    },{
        tip: "Experts recommend that teens do 60 minutes or more of physical activity every day. Walking counts!",
        topics: ["walking", "exercise", "transportation"],
    },{
        tip: "Riding your bike for 20 minutes will burn 150 to 250 calories!",
        topics: ["biking", "exercise", "transportation"],
    }
];

//THREE: Add function to script.js to generate a random tip from the array, assign to a randomTip var, and populate the DOM with that tip in the designated space. 
//Something like this but I suspect my syntax is off

function randomTipGenerator {
    var randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    //create a pointer from var randomTip to #tip on index.html
    randomTip = $('#tip').addClass('health-tip').text(healthTips.tip);
    }

//FOUR: Add class to style.css, test and adjust style as needed.  
health-tip {
    background-color: black;
    font-family: 'Quicksand', sans-serif;
    font-size: 18px;
    color: lightblue;
}