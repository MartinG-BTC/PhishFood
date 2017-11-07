var request = require('request');
var fs = require('fs');
var async = require('async');

function password() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 11; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function username() {
    return usernames[Math.floor(Math.random() * usernames.length)];
}

function post(callback) {

    /*
     * This is where the login form fields go
     */
    var formData = {
        'fp': '',
        'username': username(),
        'password': password(),
        'remember': 'on'
    };

    /*
     * This is where the submit url goes
     */
    var url = 'https://c503724.000webhostapp.com/Desktop/login.php';

    console.log(formData);

    request.post({url:url, formData: formData}, function(err, httpResponse, body) {
        if(callback) callback(err, body);

        console.log(err, body);

        if(err) {
            console.log(err);
        } else {
            console.log(body);
        }
    });
}

var usernames = JSON.parse(fs.readFileSync('usernames.json', 'utf8'));

async.timesLimit(50, 1, function (n, next) {
    setTimeout(function() {
        post(function (err, result) {
            next(null, n);
        });
    }, 1000);

}, function (error, results) {
    console.log("Done");
});