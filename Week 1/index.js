$(function () {

    var genres = ["Action", "Adventure", "Science Fiction", "Crime", "Drama"];

    txtSearch = $('#txtSearch');

    $(txtSearch).autocomplete({ source: genres });
    btnSearch = $('#btnSearch');
    
    $(btnSearch).click(function () {
        SearchByGenre(
            $(txtSearch).val(),
            movies,
            'MovieDetails',
            'movies');
    });

    function SearchByGenre(genreName, data, template, element) {
        var searchTerm = genreName.toUpperCase();
        var filteredJson = new Array();
        for (var key in movies) {
            itemGenre = movies[key].genres[1].toUpperCase();
            if (itemGenre === searchTerm) {
                filteredJson.push(movies[key]);
            }
            
        }
        renderTemplate(filteredJson, template, element);
    }

    

    function renderTemplate(data, templateName, elementId) {
        var templateBase = 'Templates/';
        $.when($.get(templateBase + '_' + templateName + '.tmpl.html'))
    .done(function (tmplData) {
        $.templates({ elementId: tmplData });
        $('#' + elementId).html(
            $.render.elementId(data)
            );
    });
    }
});