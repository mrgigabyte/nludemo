$('#searchHeader').click(function(){
    var name = $(this).text();
    $(this).html('');
    $('<input style="outline:none;"></input>')
        .attr({
            'type': 'text',
            'name': 'fname',
            'id': 'searchHeader',
            'size': '30',
            'value': ""
        })
        .appendTo('#searchHeader');
    $('searchHeader').focus();
});

$('#searchHeader').focusout(function(){
    if($(this).text()=""){
    $(this).html('');
    $('<span>Search</span>')
        .attr({
            'class': 'searchHeader',
            'id': 'searchHeader'
            
        })
        .appendTo('#searchHeader');
    $('searchHeader').focus();}
});

$(document).on('blur','#txt_fullname', function(){
    var name = $(this).val();
    //alert('Make an AJAX call and pass this parameter >> name=' + name);
    $('#searchHeader').text(name);
});