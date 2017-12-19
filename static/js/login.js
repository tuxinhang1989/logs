$(function() {
    var checkUserLogin = function() {
        var uname = $("input[name=username]").val();
        if (!uname) {
            return;
        }

        $.ajax({
            "url": "/login/check",
            "data": {
                username: uname,
            },
            "success": function(data) {
                if (data.status) {
                    $("#captcha-wrapper").show();
                    $(".alert").hide();
                } else {
                    $("#captcha-wrapper").hide();
                }
            }
        });
    };

    $("input[name=username]").change(function() {
        checkUserLogin();
    });
    checkUserLogin();
});