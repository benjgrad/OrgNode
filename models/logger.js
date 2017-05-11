
module.exports = {
    // return the data and filepath to be logged as a string
    datefile: function(path) {
        var now = new Date();
        var y = now.getFullYear();
        var mo = now.getMonth();
        var d = now.getDate();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        var ms = now.getMilliseconds();

        var response = "[" + y + "/" + mo + "/" + d + " "+h + ":" + m + ":" + s + ":" + ms + "]" + "\t" + path + "\t";

        return response;

    }

};
