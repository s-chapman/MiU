//global vars
$_Genres = ["","Action", "Adventure", "Comedy", "Coming of Age", "Crime", "ScienceFiction", "Horror", "Drama"];
$_MediaTypes = ["", "DVD", "Bluray", "Digital"];


//rss feed
function initRss (){
    $('#rssFeed').rssfeed('http://rss.imdb.com/news/sb/', {limit:15});
}

function getSearch(term) {
    //By term
    if (term !== ""){
        for (i = 0, j = localStorage.length; i < j; i++) {
            var key = localStorage.key(i);
            if (key.substring(0,3) != "sml")
            {
                continue;
            }
            var vals = localStorage.getItem(key);
            var items = JSON.parse(vals);
                if (items["mname"][1].indexOf(term) != -1) {
                    
                    var resultsUl = $("#searchResults");
                    getImage(items, resultsUl[0]);
                    for (var q in items) {
                        
                        $("<li>").html(items[q][0] + items[q][1]).appendTo(resultsUl);
                    }
                
            }
        }
    }
}

function getMovieByCategory(cat, paragraph)
{
        if (cat !== ""){
        for (var i = 0, j = localStorage.length; i < j; i++) {
            var key = localStorage.key(i);
            if (key.substring(0,3) != "sml")
            {
                continue;
            }
            var vals = localStorage.getItem(key);
            var items = JSON.parse(vals);
            
                if (items["genres"][1].indexOf(cat) != -1) {
                    getImage(items, paragraph[0]);
                    for (var q in items) {
                        $("<li>").html(items[q][0] + items[q][1]).appendTo(paragraph);
                        
                    }
                
            }
        }
    }
    return false;
}

//show the slider values
//function SetSlider() {
//   var slider = $('mrating');
//   var sliderSpan = $('mratingValue');
//   
//   slider.onchange = function() {
//        sliderSpan.innerHTML = this.value;
//     }
//}

//getElementByID Function
function ge(x){
        var theElement= document.getElementById(x);
        return theElement;
        }
    
 
//create seletct field element
function makeDrop(id, dropAry, htmlId){
        var formTag = document.getElementsByTagName("form"),
            selectLi = ge(htmlId);
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", id)
        for(var i=0, j=dropAry.length; i<j; i++){
            var makeOption = document.createElement("option");
            var optText = dropAry[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }        
        selectLi.appendChild(makeSelect);
}

    
function getCheckboxValue(){
        if(ge('mfavorite').checked){
            favoriteValue = ge('mfavorite').value;
        }else{
            favoriteValue = "no";
        }
        }
        
function ToggleControls(n){
        switch(n){
            case "on":
               ge('form').style.display = "none";
               ge('deleteYourMovie').style.display = 'inline';
               ge('editYourMovie').style.display = "none";
               ge('addNew').style.display = "inline";
                break;
            
            case "off":
               ge('form').style.display = "block";
               ge('deleteYourMovie').style.display = 'inline';
               ge('editYourMovie').style.display = "inline";
               ge('addNew').style.display = "none";
               ge('items').style.display = "none";
                break;
                
            default:
                return false;
        }
        }
        
        
function storeData(key){
        //if there is no key, this means this is a brand new item and we need a new key
        if(!key || MouseEvent){
                var id = "sml" + Math.floor(Math.random()*10000001);
        }else{
                //set the id to the existing key we are editing so that it will save over the data.
                //the key is the same key thats beddn passed along from the editSubmit event handler
                //to the validate function, and then passed here, into the storeData function.
                id = key;
        }
                //get form field values and store in object.
                //object properties contain array with the form lable and input value.
                //getSelectedRadio();
                getCheckboxValue();
        
        var item = {};
        item.genres = ["Genre:", ge('dropDown').value];
        item.media = ["Media Type",ge('Mdrop').value];
        item.mname = ["Movie name:", ge('mname').value];
        item.date = ["Movie Date:", ge('mdate').value]; 
        item.note = ["Notes:", ge('mnotes').value];
        //item.type = ["Media:", mediaValue];
        item.favorite = ["Favorite:",favoriteValue];
        item.rating = ["Rating:", ge('mrating').value];
        //save data into local storage; use stringify to convert our object to a string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Movie Saved!");
        $('input').val('');
        $('.ui-icon-checkbox-on').addClass("ui-icon-checkbox-off").removeClass("ui-icon-checkbox-on");
        $('option').removeAttr('selected');
        $('.ui-select .ui-btn-text').html("");
        
        }
        
        
function getData(){
        if(localStorage.length ==0){
           
        } else {
        //ToggleControls("on");
        //Write Data from local storage to the browser.
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        $(makeDiv).appendTo($("#viewContent")); 
        ge("items").style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            if (key.substring(0, 3) != "sml")
            {
                continue;
            } else {
                var makeli = document.createElement('li');
                var linksLi = document.createElement("li");
                makeli.setAttribute("class", "border");
                makeList.appendChild(makeli);
            
            
            
                 //convert the string from local storage value back to an abject by using JSON.parse
                var obj = JSON.parse(value);
                
                var makeSubList = document.createElement('ul');
                //makeSubList.innerHTML = obj.genres[1]; Not needed
                makeli.appendChild(makeSubList);
                getImage(obj, makeSubList); 
                for(var n in obj){
                    var makeSubli = document.createElement('li');
                    makeSubList.appendChild(makeSubli);
                    var optSubText = obj[n][0]+" "+obj [n][1];
                    makeSubli.innerHTML = optSubText;
                    makeSubList.appendChild(linksLi);
                    
                }
                makeItemLinks(localStorage.key(i), linksLi);  //Create out edit and delete buttons for each item in local stroage.
            }
            
        }
        if ($(makeList).html() == "") {
             alert("There are no Movies saved, so default data was added.");
            autoFillData();
            getData();
        }
    }
}


//get the image for the right category
//set to pull images for both my drop downs
function getImage(obj, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var genreImg = document.createElement('img');
        var mediaImg = document.createElement('img');
        mediaImg.setAttribute("src", "IMAGES/"+ obj.media[1] + ".png");
        genreImg.setAttribute("src", "IMAGES/"+ obj.genres[1] + ".png");
        var spaceSpan = document.createElement('span');
        spaceSpan.innerHTML = '&nbsp;';
        imageLi.appendChild(genreImg);
        imageLi.appendChild(spaceSpan);
        imageLi.appendChild(mediaImg);
        
}


//auto populate local storage
function autoFillData(){
        //the json data is coming from the json.js
        //store the json data to local storage
        for(var n in movies){
                var id = "sml" + Math.floor(Math.random()*10000001);
                localStorage.setItem(id, JSON.stringify(movies[n]));
           
        }
}
 
 
        //make item links
        //create the edit and delete links for eah stored item when displayed.
function makeItemLinks(key, linksLi){
        //add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Movie";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        //add line break
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        //add delete single item link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Movie";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }
    
    
function editItem(){
        //grab the data from out item from local storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        //show the form
        ToggleControls("off");
        //populate the form fields with the current local storage values
        ge('dropDown').value = item.genres[1];
        ge('Mdrop').value = item.media[1];
        ge('mname').value = item.mname[1];
        ge('mdate').value = item.date[1];
        ge('mnotes').value = item.note[1];
        ge('mrating').value = item.rating[1];
        if(item.favorite[1] == "Yes"){
        ge('mfavorite').setAttribute("checked", "checked");
        }
        var editSubmit = ge('submit');
        //remove the initial listener from the input "save movie" button.
        editSubmit.removeEventListener("click", storeData);
        //change submit button value to the edit button
        editSubmit.value = "Edit Movie";
        //save the key value established in this function as a property of the edit submint event so we can use the value when we save the data we edited.
        editSubmit.addEventListener("click", Validate);
        editSubmit.key = this.key;
    }
    
    
function deleteItem(){
        var ask = confirm("Are you sure you want to delete this movie?");
        if(ask){
             localStorage.removeItem(this.key);
      
             alert("Movie was deleted!!");
             window.location = "index.html";
             return false;
        }else{
                alert("Movie was not deleted.")
        }
    }
    
function clearLocal(){
            if(localStorage.length === 0){
                alert("There is no data to clear.")
            }else{
                localStorage.clear();
        
                alert("All Movies Deleted!");
                window.location = "index.html";
                return false;
            }
        }
                
                
                
function Validate(){
        //define the elements we want to check
        var getGroup = ge('dropDown');
        var getMname = ge('mname');
        var getMdate = ge('mdate');
        var getMedia = ge('Mdrop');
        //reset error messages
        errMsg.innerHTML = "";
        getGroup.style.border = "1px solid black";
        getMname.style.border = "1px solid black";
        getMdate.style.border = "1px solid black";
        getMedia.style.border = "1px solid black";
        
        //get error messages
        var messageAry = [];
        //group validateion
        if(getGroup.value === ""){
                var groupError = "Please choose a Genres.";
                getGroup.style.border = "1px solid red";
                messageAry.push(groupError);
        }
        //media type validation
        if(getMedia.value === ""){
                var mediaError = "Please choose a Media Type.";
                getMedia.style.border = "1px solid red";
                messageAry.push(mediaError);
        }
        
        //movie name validation
        if(getMname.value === ""){
                var mNameError = "Please enter a movie name."
                getMname.style.border = "1px solid red";
                messageAry.push(mNameError);
        }
        
        //movie date validation
        if(getMdate.value ===""){
                var mDateError= "please enter a movie date."
                getMdate.style.border = "1px solid red";
                messageAry.push(mDateError);
        }
        
        //if there are errors, display them on screen
        if(messageAry.length >= 1){
                for(var i=0, j=messageAry.length; i < j; i++){
                        var txt = document.createElement('li');
                        txt.innerHTML = messageAry [i];
                        errMsg.appendChild(txt);
                }
                
                return false;       
        }else{
                //if all is ok, save our data. send the key value ( which came for the editdata function);
                //remember this key value was passed thruough the editSubment event listner as a property.
                storeData(this.key);
        }
        
    }
    
    
    