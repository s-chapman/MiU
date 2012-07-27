

var accordionDiv = $("#accordionDiv");

for (var i = 1, len = $_Genres.length; i < len; i++)
{
    var cat = $_Genres[i];
    
    var newDiv = $("<div data-role='collapsible' data-collapsed='true'><h3>" + cat + "</h3><p><ul></ul><p></div>");
    newDiv.appendTo(accordionDiv);
    
    newDivParagraph = newDiv.find("ul");
    
    getMovieByCategory(cat, newDivParagraph);

}

