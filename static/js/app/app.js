var gui = require('nw.gui');
var win = gui.Window.get();

if (process.platform != "darwin") {
    var tray = new gui.Tray({
        title: '',
        icon: 'img/tray-icon@2x.png',
        alticon: 'img/tray-icon@2x.png',
        iconsAreTemplates: false
    });
}

// win.on('minimize', function() {
//     // this.hide();
//     win.hide();
// });


// tray.on('click', function() {
//     win.focus();
//     // win.show();
//     // this.remove();
//     // tray = null;
// });