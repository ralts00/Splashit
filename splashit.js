/**
 * @version 0.1.0
 * @author Eduardo Aguilar <dante.aguilar41@gmail.com>
 */


/**
 * Class Splashit
 * @constructor
 */
function Splashit(){

    var that = this;

    /**
     * Allowed types of splash images
     * @type {{random: string, buildings: string, food: string, nature: string, people: string, technology: string, objects: string}}
     */
    var types = {
        random: "random/",
        buildings: "category/buildings/",
        food: "category/food/",
        nature: "category/nature/",
        people: "category/people/",
        technology: "category/technology/",
        objects: "category/objects/"
    };

    this.sizeFlag = false;
    this.typeFlag = false;

    /**
     * General URL to API Unsplash
     * @type {string}
     */
    var url = "https://source.unsplash.com/";


    /**
     * Initialize elements and validate type of image to splash
     * @return void
     */
    this.init = function(){
        //All elements to splash
        var splashes = document.querySelectorAll(".splash-this");

        for(var x = 0; x < splashes.length; x++){
            var data = splashes[x].hasAttribute("data-splashit") ? splashes[x].getAttribute("data-splashit") : "";

            data = data.split(";");

            for(var d = 0; d < data.length; d++){
                data[d] = data[d].replace(" ","").split(":");
            }


            activeFlags(data, splashes[x], x);


            console.log(data);
        }
    };


    var activeFlags = function(dataArray, item, cont){
        var type = "";
        
        for(var x = 0; x < dataArray.length; x++){
            if(dataArray[0] == "size"){
                that.sizeFlag = true;
            }
        }

        if(item.classList.contains("random")){
            that.typeFlag = true;
            type = types.random;
        }else if(item.classList.contains("buildings")){
            that.typeFlag = true;
            type = types.buildings;
        }else if(item.classList.contains("food")){
            that.typeFlag = true;
            type = types.food;
        }else if(item.classList.contains("nature")){
            that.typeFlag = true;
            type = types.nature;
        }else if(item.classList.contains("people")){
            that.typeFlag = true;
            type = types.people;
        }else if(item.classList.contains("technology")){
            that.typeFlag = true;
            type = types.technology;
        }else if(item.classList.contains("objects")){
            that.typeFlag = true;
            type = types.objects;
        }else{
            that.typeFlag = true;
            type = types.random;
        }


        precontructUrl();
        setSplashImage(item, type, cont);
    };


    var precontructUrl = function(elem, type, cont){
        
    };


    /**
     * Generate the URL to the Image in Unsplash
     * @param {DOM-Element} elem Element to modify
     * @param {string} 		type Configuration Image in API
     * @param {int} 		x    Random numeration
     */
    var setSplashImage = function(elem, type, x){
    	var image = url.replace(":replace:",type)+"?="+x;
    	identifyTypeTag(elem, image);
    };


    /**
     * Identify type of DOM-Element to process (img or other tag)
     * @param  {DOM-Element}   elem   Element to modify
     * @param  {string} 	   image  Complete URL in API
     * @return {void}
     */
    var identifyTypeTag = function( elem, image ){
        if(elem.hasAttribute("src")){
            elem.src = image;
        }else{
            elem.style.backgroundImage = "url('"+image+"')";
        }
    };
}

/**
 * Initialize Splashit Objecto to process image to splash
 * @type {Splashit.init|*}
 */
window.onload = new Splashit().init;