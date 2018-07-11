let src = "https://code.angularjs.org/1.3.8/angular.min.js"
let url = "http://localhost:3000/"

var mainMod = angular.module('MainApp', []);
            mainMod.controller('MainCtrl', function ($scope) {
                $scope.text = '';
            });

function sendToBack() {

    let urlVideo = document.getElementById("hello").value;
    
    let data = {
        url: urlVideo
    }

    axios.post(`${url}get-analyse-text`, data)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
    
}