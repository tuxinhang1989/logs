// win.hide();
win.width = 300;
win.height = Math.ceil(window.screen.availHeight * 0.8);

win.setPosition("center");
win.show();


var showNotification = function(icon, title, body) {
    var notification = new Notification(title, {
        icon: icon,
        body: body
    });

    notification.onclick = function() {
        // console.log("Notification clicked");
        win.focus();
    };

    notification.onclose = function() {
        // console.log("Notification closed");
        // win.focus();
    };

    notification.onshow = function() {
        // console.log(title);
    };

    return notification;
};


function poll() {
    // console.log('Pulling msg!');
    $.ajax({
        url: "/app/fetch",
        success: function(resp) {
            renderMsg(resp);
        },
        error: function(err) {},
        type: "GET",
        dataType: "json",
        timeout: 3000
    });
}


function renderMsg(resp) {
    data = resp.data;
    msgNum = data.length;

    if (msgNum === 0) {
        return false;
    }

    // console.log('Got new msg! Show Notification!');

    $(".no-msg").remove();

    $.each(data, function(index, msg) {
        $(".msg-list ol").prepend('<li class="msg unread"><span class="time-label">' + msg.create_time + '</span><div class="msg-item animated shake"><h3 class="msg-header">' + msg.title + '</h3><div class="msg-body">' + msg.content + '</div></div></li>');
        //     $.each(this, function(name, value) {
        //         console.log(name + '=' + value);
        //     });
    });

    if (msgNum > 1) {
        showNotification('/static/img/app-icon.png', '【金斗云】消息', '有 ' + msgNum + ' 条新消息！点击查看');
    } else {
        showNotification('/static/img/app-icon.png', '【金斗云】消息', '有 ' + msgNum + ' 条新消息！点击查看');
    }
}


// new_win = gui.Window.open('nw://blank', {
new_win = gui.Window.open('https://agent.iyobee.com/static/empty.html', {
    toolbar: false,
    // focus: true,
    show: false,
    resizable: true,
    title: "金斗云管理平台",
    icon: "img/app-icon.png"
});

new_win.on('close', function() {
    this.hide();
    this.maximize();
    // console.log("We're hideing...");
});


// var ntf_width = 200;
// var ntf_height = 200;

$(document).ready(function() {
    poll();
    setInterval(poll, 5000);

    $('.msg-list').on('click', 'li.unread', function(e) {
        $(this).removeClass("unread").addClass("read");
    });

    $('.msg-list').delegate("a", "click", function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        url = $(this).attr("href");

        // gui.Shell.openExternal(url);
        new_win.window.location.replace(url);
        new_win.maximize();
        new_win.show();
        new_win.focus();

        $(this).parents("li.unread").removeClass("unread").addClass("read");
    });

    // $('#pullMsg').click(function(event) {
    //     poll();
    // });

    // $('#ntf').click(function(event) {
    //     showNotification("【金斗云】消息", '新订单\n京KH5299');
    // });

    // $('#popup').click(function(event) {
    //     var new_win = gui.Window.open('/app/pop', {
    //         show_in_taskbar: false,
    //         focus: true,
    //         toolbar: false,
    //         frame: false,
    //         // position: 'center',
    //         x: window.screen.availWidth - ntf_width,
    //         y: window.screen.availHeight - ntf_height,
    //         // x: 500,
    //         // y: 500,
    //         width: ntf_width,
    //         height: ntf_height
    //     });
    // });
});


win.on('error', error);
process.on('uncaughtException', exception);

function error() {
    console.log('This is an error of windows');
    alert('An error ocurred, please restart the app.');
    return false;
}

function exception() {
    console.log('This is an error process');
    alert('An error ocurred, please restart the app.');
    return false;
}

win.on('close', function() {
  new_win.hide();
  new_win.close(true);
  this.hide();
  this.close(true);
});
