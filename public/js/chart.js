$('#current').click(function () {

});
$('#old').click(function () {
    $.get('/old', {}, function (data) {
        $("p.inner").replaceWith()
    });
});
