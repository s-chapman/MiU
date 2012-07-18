    var mediaValue = null;
    var favoriteValue = "no";
    var errMsg = ge('errors');
    
    makeDrop("dropDown", $_Genres, "genres");
    makeDrop("Mdrop", $_MediaTypes, "media");
   // SetSlider();

    //Set Link & Submit click events
    var displayLink = ge("editYourMovie");
    displayLink.addEventListener("click", getData);

    var clearlink = ge("deleteYourMovie");
    //clearlink.addEventListener("click", clearLocal);
    
    
    
    $(clearlink).click(function() {
        clearLocal();
    })

    var save = ge("submit");
    save.addEventListener("click", storeData);