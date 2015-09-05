var map = {
    north: 42.673093,
    south: 34.632070,
    east: 45.287194,
    west: 25.555186,

    iconHeight: 33,
    iconWidth: 33,

    popupHeight: 100,
    popupWidth: 150,

    data: [
        //{ name: 'izmir', x: 27.145878, y: 38.429399, html: "<a href='#'>Html Code</a>" },
    ],

    setData: function(data){
        this.data = data;
        this.run();
    },

    getSize: function () {
        var x = $("#map").width();
        var y = $("#map").height();
        console.log("size: " + x + " - " + y);
        return { x: x, y: y };
    },

    setSize: function (x, y) {
        this.setX(x);
        this.setY(y);
    },

    setX: function (x) {
        $("#map").width(x);
    },

    setY: function (y) {
        $("#map").height(y);
    },

    getK: function () {
        var size = this.getSize();
        var k = size.x / (this.east - this.west);
        return k;
    },

    resize: function () {
        var x = window.innerWidth;
        map.setX(x);
    },

    runIcons: function () {
        this.clear();
        for (var i = 0; i < this.data.length; i++) {
            addIconGeoraphic(i, this.data[i].name, this.data[i].x, this.data[i].y, this.data[i].html);
        }
    },

    run: function () {
        this.resize();
        this.runIcons();
    },

    clear: function () {
        $("#icons").html('');
    }
}

function addIconGeoraphic(id, name, x, y, html) {
    var k = map.getK();

    x = Math.abs(x - map.west) * k*0.99;
    y = Math.abs(map.north - y) * k * 1.18;

    console.log("geo: " + x + " - " + y);
    addIcon(id, name, x, y, html);
}

function addIcon(id, name, x, y, html) {
    var iconX = map.iconWidth;
    var iconY = map.iconHeight;

    x = x - (iconX / 2);
    y = y - iconY;

    var px = x + iconX;
    var py = y - iconY;

    if (py < 0) {
        py = 0;
    }

    if (px + map.popupWidth > map.getSize().x) {
        px = x - map.popupWidth;
    }

    console.log(id + ': ' + x + ' - ' + y)
    $("#icons").html($("#icons").html() + "<img name='icon_"+name+"' id='icon_" + id + "' src='icon.png' class='icon' style='top:" + y + "px;left:" + x + "px; height:" + map.iconHeight + "px; width:" + map.iconWidth + "px;' onclick='openPopup(" + id + ")'>");
    $("#icons").html($("#icons").html() + "<div name='popup_" + name + "' id='popup_" + id + "' src='icon.png' class='popup' style='top:" + py + "px;left:" + px + "px; height:" + map.popupHeight + "px; width:" + map.popupWidth + "px;'>" + html + "</div>");
}

function openPopup(id) {
    closePopups();
    $("#popup_" + id).show();
}

function closePopup(id) {
    $("#popup_" + id).hide();
}

function closePopups() {
    $(".popup").hide();
}

$(document).ready(function () {
    $("#map").click(function () {
        closePopups();
    });

    map.run();

    $(window).resize(function () {
        map.run();
    });
});

