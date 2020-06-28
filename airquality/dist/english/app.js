
//Loading JSON data from Github URL
var requestURL = 'https://raw.githubusercontent.com/bbc/vj-code-tests/master/airquality/src/data/english.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    var data = request.response;
    showData(data); 
    
}


//Main function generating the interactive project
function showData(jsonObj) {
    var data = jsonObj;

    //write subtitle under title
    document.querySelector(".subtitle").innerHTML = data["compare-tabs_1_method"]

    //write instructions 
    document.querySelector(".instructions").innerHTML = data["p_5_value"]

    //write methodology 
    document.querySelector(".methodology").innerHTML = "<p>" + data["p_7_value"] + "</p>" + "<p>" + data["p_8_value"] + "</p>" +"<p>" + data["p_9_value"] + "</p>" +  "<p>" + data["p_10_value"] + "</p>"


    //function to generate cigarette image
    function generateImage() {
 
        var img = document.createElement('img')
        img.className = "cigg-img"
        img.src = "../../src/img/ciggarette_icon.png";
        
        return img;
       
    }
    //Loop through the data
    for (var property in data){
        //get name of cities and create buttons for each city
        if (property.includes("name")){
            var citiesContainer = document.querySelector(".cities");
            var button = document.createElement('button');
            citiesContainer.appendChild(button);
            button.innerHTML = data[property];
         
            //click function for buttons and assign attributes and render them on output gallery
           
            button.addEventListener("click", function(){
                


                var imageGallery = document.querySelector('.image-gallery')
                imageGallery.innerHTML = " ";
                var city = this.innerHTML;
                var aqi = this.getAttribute("aqi")
                var cigg = this.getAttribute("cigg")
                
                var span = document.querySelector('.city')
                span.innerHTML = city
    
                var infodiv = document.querySelector(".city-info")
                infodiv.innerHTML = 'Walking around in ' + city + ' for a week is the same as smoking ' + cigg + ' cigarette(s)' 
                
                //append cigarette image depending on the nb of ciggs for each city

                for (var i = 0; i < cigg; i++ ) {
                
                    imageGallery.appendChild(generateImage())
                  
                }  
    
            })
    
        } else if(property.includes("aqi")){
            button.setAttribute("aqi", data[property])
           
        } else if(property.includes("cigg")){
            button.setAttribute("cigg", data[property])
        } 
    
    }
    
}
 