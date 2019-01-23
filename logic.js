//global vars
var queryURL;
var queryString;
var queryParams;
var animalArray = [];

//functions
function addBtn(){
    event.preventDefault();
    var btnValue = $("#animalInput").val().trim();
    if (btnValue === "")
    {
        alert("Please fill out the field!");
    }
    else if(animalArray.indexOf(btnValue) > -1)
    {
        alert("The animal has already existed!");
        $("form").trigger("reset");
    }
    else
    {
    var $gifBtn = $("<button>");
    $gifBtn.addClass("btn btn-success mr-4 mt-4");
    $gifBtn.attr("id", "gifBtn");
    $gifBtn.attr("value", btnValue);
    $gifBtn.text(btnValue);
    $("#buttons").append($gifBtn);
    animalArray.push(btnValue);
    $("form").trigger("reset");
    };
};

function showGif(){
    queryString = $(this).attr("value");
    buildUrl();
    queryURL = buildUrl();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updateGif);
}

function buildUrl (){
    queryURL = "http://api.giphy.com/v1/gifs/search?";
    queryParams = { "api_key": "XPQi9J9GS4amlcMrGrqGWwrKFaC447j9" };
    queryParams.q = queryString;
    queryParams.limit = 5;
    return queryURL + $.param(queryParams);
};


function updateGif(response){
    $("#gifs").empty();
    if (response.meta.status === 200 && response.data.length > 0){
        for (var i=0; i<queryParams.limit; i++){
            var $figEle = $("<figure>");
            var $imgEle = $("<img>");
            var $figCapEle = $("<figcaption>");
            var imgUrl = response.data[i].images.fixed_width_downsampled.url;
            var imgRating = response.data[i].rating;
            $imgEle.prop("src", imgUrl);
            $imgEle.addClass("figure-img img-fluid");
            $figCapEle.addClass("text-center mb-4");
            $figCapEle.text("Rating: " + imgRating);
            $($figEle).addClass("figure float-left mr-4 d-table");
            $($figEle).append($figCapEle);
            $($figEle).append($imgEle);
            $("#gifs").append($figEle);
        };
    }
    else if (response.meta.status === 404 || response.data.length === 0){
        alert("No GIF for this animal!");
    }
    else {
        alert("API call failed!")
    };
};

//script starts here
$(document).on("click","#gifBtn", showGif);

$("#submitBtn").on("click", addBtn);





