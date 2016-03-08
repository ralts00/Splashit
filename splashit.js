/**
 * @version 0.1.0
 * @author Eduardo Aguilar <dante.aguilar41@gmail.com>
 */


/**
 * Class Splashit
 * @constructor
 */
function Splashit(){

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


    /**
     * General URL to API Unsplash
     * @type {string}
     */
    var url = "https://source.unsplash.com/:replace:";


    /**
     * Initialize elements and validate type of image to splash
     * @return void
     */
    this.init = function(){
        //All elements to splash
        var splashes = document.querySelectorAll(".splash-this");

        for(var x = 0; x < splashes.length; x++){
            if(splashes[x].classList.contains("random")){
                setSplashImage(splashes[x], types.random, x);

            }else if(splashes[x].classList.contains("buildings")){
                setSplashImage(splashes[x], types.buildings, x);

            }else if(splashes[x].classList.contains("food")){
                setSplashImage(splashes[x], types.food, x);

            }else if(splashes[x].classList.contains("nature")){
                setSplashImage(splashes[x], types.nature, x);

            }else if(splashes[x].classList.contains("people")){
                setSplashImage(splashes[x], types.people, x);

            }else if(splashes[x].classList.contains("technology")){
                setSplashImage(splashes[x], types.technology, x);

            }else if(splashes[x].classList.contains("objects")){
                setSplashImage(splashes[x], types.objects, x);

            }else{
                setSplashImage(splashes[x], types.random, x);
            }
        }
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
    }


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