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

    this.sizeOpt = {
        flag: false,
        value: ""
    };

    this.typeOpt = {
        flag: false,
        value: ""
    };

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

        }
    };


    var activeFlags = function(dataArray, item, cont){
        
        for(var x = 0; x < dataArray.length; x++){
            if(dataArray[x][0] == "size"){
                that.sizeOpt.flag = true;
                that.sizeOpt.value = dataArray[x][1];
            }
        }

        if(item.classList.contains("random")){
            that.typeOpt.flag = true;
            that.typeOpt.value = types.random;
        }else if(item.classList.contains("buildings")){
            that.typeOpt.flag = true;
            that.typeOpt.value = types.buildings;
        }else if(item.classList.contains("food")){
            that.typeOpt.flag = true;
            that.typeOpt.value = types.food;
        }else if(item.classList.contains("nature")){
            that.typeOpt.flag = true;
            that.typeOpt.value = types.nature;
        }else if(item.classList.contains("people")){
            that.typeOpt.flag = true;
            that.typeOpt.value = types.people;
        }else if(item.classList.contains("technology")){
            that.typeOpt.flag = true;
            that.typeOpt.value = types.technology;
        }else if(item.classList.contains("objects")){
            that.typeOpt.flag = true;
            that.typeOpt.value = types.objects;
        }else{
            that.typeOpt.flag = true;
            that.typeOpt.value = types.random;
        }


        precontructUrl(item, cont);

    };


    /**
     * Construct the Url for image Render based in the data-splasit tag information
     * @param {DOM-Element} elem    Element to configure
     * @param {int}         cont    Counter for random image
     * @return {void}
     */
    var precontructUrl = function(elem, cont){
        var img = url;

        if(that.typeOpt.flag){
            img = img + that.typeOpt.value;
        }

        if(that.sizeOpt.flag){
            img = img + that.sizeOpt.value + "/";
        }

        img = img + "?=" + cont;

        console.log(img);

        identifyTypeTag(elem, img);
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