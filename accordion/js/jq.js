$(document).ready(function() {
    $('#container .text').hide();
    $('#container .title').on('click', accordion);
});
 
function accordion(){
    $(this).next().slideToggle(1000);
}
