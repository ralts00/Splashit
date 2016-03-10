/**
 * @version 0.2.0
 * @author Eduardo Aguilar <dante.aguilar41@gmail.com>
 */


/**
 * Class Splashit
 * @constructor
 */
function Splashit(){

    this.version = "0.2.0";

    /**
     * General URL to API Unsplash
     * @type {string}
     */
    var url = "https://source.unsplash.com/";


    /**
     * Globalization for Splashit context
     * @type {Splashit}
     */
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



    /**
     * Flag options for construct the Url to the image
     * @type {{flag: boolean, value: string}}
     */

    this.sizeOpt = {
        flag: false,
        value: ""
    };

    this.typeOpt = {
        flag: false,
        value: ""
    };

    this.userOpt = {
        flag: false,
        like: false,
        value: ""
    };

    this.fixedOpt = {
        flag: false,
        value: ""
    };




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
                data[d] = data[d].replace(" ","").replace(" ","").split(":");
            }


            activeFlags(data, splashes[x], x);
            resetFlags();
        }
    };


    /**
     * Reset Storage values for new elements
     * @return {void}
     */
    var resetFlags = function(){
        that.sizeOpt.flag = false;
        that.sizeOpt.value = "";

        that.typeOpt.flag = false;
        that.typeOpt.value = "";

        that.userOpt.flag = false;
        that.userOpt.like = false;
        that.userOpt.value = "";

        that.fixedOpt.flag = false;
        that.fixedOpt.value = "";
    };


    /**
     * Active Flags for precontruct of Url
     * @param {Array} dataArray
     * @param {DOM-Element} item
     * @param {int} cont
     */
    var activeFlags = function(dataArray, item, cont){
        
        for(var x = 0; x < dataArray.length; x++){

            var flag = dataArray[x][0];
            var value = dataArray[x][1];
            
            if(flag == "size"){
                that.sizeOpt.flag = true;
                that.sizeOpt.value = value;
            }else if(flag == "user"){
                that.userOpt.flag = true;
                that.userOpt.value = value;
            }else if(flag == "userlike"){
                if(value == "true"){
                    that.userOpt.like = true;
                }
            }else if(flag == "fixed" && (value == "daily" || value == "weekly")){
                that.fixedOpt.flag = true;
                that.fixedOpt.value = value;
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

        if(that.typeOpt.flag && !that.userOpt.flag){
            img = img + that.typeOpt.value;
        }else if(that.userOpt.flag){
            img = img + "user/" + that.userOpt.value + "/";
            if(that.userOpt.like){
                img = img + "likes/";
            }
        }

        if(that.fixedOpt.flag){
            img = img + that.fixedOpt.value + "/";
        }

        if(that.sizeOpt.flag){
            img = img + that.sizeOpt.value + "/";
        }

        img = img + "?=" + cont;


        /////////////////////////////////////////////////////////////////
        console.log(img);
        /////////////////////////////////////////////////////////////////


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