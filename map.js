var map = {
    north: 42.296048,
    south: 34.584382,
    east: 44.860279,
    west: 25.585485,

    //north: 41.896048,
    //south: 27.584382,

    data: [
        //{id:'', x:0, y:0} 39.931502, 32.856155
        { id: 'izmir', x: 27.145878, y: 38.429399 },
        { id: 'istanbul', x: 28.989518, y: 41.073903 },
        { id: 'kars', x: 43.090693, y: 40.595234 },
        { id: 'ankara', x: 32.856155, y: 39.931502 },
    ],

    getSize: function () {
        var x = $("#map").width();
        var y = $("#map").height();
        console.log("size: " + x + " - " + y);
        return {x: x, y: y};
    },

    setSize: function(x, y){
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

    run: function () {
        this.clear();
        for (var i = 0; i < this.data.length; i++) {
            addIconGeoraphic(this.data[i].id, this.data[i].x, this.data[i].y);
        }
    },

    clear: function () {
        $("#icons").html('');
    }
}


function resizeMap() {
    var x = window.innerWidth;
    map.setX(x);
}

function addIconGeoraphic(id, x, y) {
    var k = map.getK();

    x = Math.abs(x - map.west) * k;
    y = (Math.abs(map.north - map.south) - (y - map.south)) * k;

    console.log("geo: " + x + " - " + y);
    addIcon(id, x, y);
}

function addIcon(id, x, y) {
    console.log(id + ': ' + x + ' - '  + y)
    $("#icons").html($("#icons").html() + "<img id='icon_" + id + "' src='icon.png' class='icon' style='top:" + y + "px;left:" + x + "px;'>");
}

//$(document).ready(function () {
//    resizeMap();
//    console.log(map.getK());
//    map.run();

//    $(window).resize(function () {
//        resizeMap();
//        map.run();
//    });
//});