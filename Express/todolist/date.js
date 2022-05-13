
exports.getDate = function(){
    let now = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return now.toLocaleDateString("en-US",options);
}

exports.getDay = function(){
    let now = new Date();

    let options = {
        weekday: "long",
    };

    return now.toLocaleDateString("en-US",options);
}