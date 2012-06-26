$(function() {

//variables
var genres = ["", "adventure","comedy","comingOfAge", "crime", "fantasy", "horror", "romance", "scienceFiction", "thriller"];
var media = ["", "Bluray", "DVD", "Digital"];
var save = $("#submit");
var getView = $("#get");


//click event from submit event to save data to json        
save.click(function(){
        storeData();
        });

getView.click(function(){
        var dataSet = getData();

        renderTemplate(dataSet, "MovieList", "viewContent" );
});


});



//store data functions
function storeData(key) {
    //if there is no key, this means this is a brand new item and we need a new key
    if (!key) {
        var id = Math.floor(Math.random() * 10000001);
    } else {
        //set the id to the existing key we are editing so that it will save over the data.
        //the key is the same key thats beddn passed along from the editSubmit event handler
        //to the validate function, and then passed here, into the storeData function.
        id = key;
    }
    //get form field values and store in object.
    //object properties contain array with the form lable and input value.
    
    getCheckboxValue();

    var item = {};
    item.genres = ["Genres:", $('#genres').val()];
    item.media = ["Media Type", $('#media').val()];
    item.mname = ["Movie name:", $('#mname').val()];
    item.date = ["Movie Date:", $('#mdate').val()];
    item.note = ["Notes:", $('#mnotes').val()];
    item.favorite = ["Favorite:", favoriteValue];
    item.rating = ["Rating:", $('#mrating').val()];
    //save data into local storage; use stringify to convert our object to a string
    localStorage.setItem(id, JSON.stringify(item));
    alert("Movie Saved!");
    window.location.reload();
}

function getCheckboxValue(){
        if($('#mfavorite').val()){
            favoriteValue = $('#mfavorite').val();
        }else{
            favoriteValue = "no";
        }
        }
        
        
        

function renderTemplate(data, templateName, elementId) {
        var templateBase = 'Templates/';
        $.when($.get(templateBase + '_' + templateName + '.tmpl.html'))
    .done(function (tmplData) {
        $.templates({ "tmpl": tmplData });
        $('#' + elementId).html(
            $.render.tmpl(data)
            );
    });
    }

function getData(){
        var mAry = [];  
        if(localStorage.length === 0){
            alert("There are no Movies saved, so default data was added.");
            autoFillData();
            getData();
        } else {
        for(var i=0, len=localStorage.length; i<len;i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        mAry.push (obj);
        }
        return mAry;
        }
        
}
        
 //auto populate local storage
function autoFillData(){
        //the json data is coming from the json.js
        //store the json data to local storage
        for(var n in json){
                var id = Math.floor(Math.random()*10000001);
                localStorage.setItem(id, JSON.stringify(json[n]));
           
        }
}       
   
//accordian function
function populateBrowseAccordion(objArray, ulID) {
        var parent = $(ulID);
        $(parent).attr("data-role", "listview");
        $(parent).attr("data-inset", "true");
        
        for (var i = 0; i < objArray.length; i++)
        {
            if (objArray[i] === "") {continue;}
            var li = newLi();
            $(li).html(newAhref(objArray[i], "#browse"));
            $(li).appendTo(parent);
            
        }
    }
    
    function newLi(){
        var li = document.createElement("li");
        return li;
    }
    
    function newAhref(innerTxt, link){
        var a = document.createElement("a");
        a.href = link;
        $(a).html(innerTxt);
        return a;
    }
        
//Rss feed 
$('#rssFeed').rssfeed('http://rss.imdb.com/news/sb/', {
    limit: 15
});
       
        
populateBrowseAccordion(genres, "#genreList");       



