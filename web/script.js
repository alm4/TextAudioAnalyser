let src = "https://code.angularjs.org/1.3.8/angular.min.js"
let url = "http://localhost:3000/"

var mainMod = angular.module('MainApp', []);
            mainMod.controller('MainCtrl', function ($scope) {
                $scope.text = '';
            });

function sendToBack() {
    
    let a = {
        isso: "as"
    }

    axios.post(`${url}get-analyse-text`, a)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
    
    // let data = JSON.stringify({
    //     "url": 'https://www.youtube.com/watch?v=hC4V7-CHHfs'
    // });

    // $.post(url + "get-analyse-text", {name: "John", time: "2pm"}, function(data) {
    //     console.log("Data Loaded: " + data);
    // });

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", url + 'get-analyse-text', true);


    // //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onreadystatechange = function() {
    //     if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    //         console.log(this.responseText);
    //     }
    // }
    // xhr.send(data);
}