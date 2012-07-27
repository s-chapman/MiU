var parseAdditemForm = function(data){
        console.log(data);
    };



$(document).bind('pageinit', function(){
    var adForm = $('#form');

    adForm.validate({
        invalidHandler: function(form, validator){},
        submitHandler: function(){
            var data = rbform.serializeArray
            parseAdditemForm(data)
        }
        
        });                 
    
    });