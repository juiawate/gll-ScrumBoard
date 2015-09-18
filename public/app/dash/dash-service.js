/**
 * Created by natalie on 9/14/2015.
 */
angular.module('scrumBoardApp.dash', [])
    .service('svc', [ '$rootScope', function ($rootScope) {
        var service = {
            lat: 0,
            lng: 0,
            initMap: function (lat, lng) {
                lat = typeof lat !== 'undefined' ? lat : 37.3763019;
                lng = typeof lng !== 'undefined' ? lng : -122.0306044;
                this.lat = lat;
                this.lng = lng;
            }
        };
        return service;
    }])
    .controller('DashController', ['$scope', '$interval', '$http', '$location', 'Accounts', 'svc', function ($scope, $interval, $http, $location, Accounts, svc) {
        svc.initMap();
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        $scope.seeLog = false;
        $scope.maps = [];
        $scope.prettyDate  = function(inDate){
            var date = new Date(inDate);
            return date;
        };
        $scope.showEntries = function () {
            var url = '/attendance/roster';
            $http.get(url).success(function (result) {
                $scope.dataList = result;
            });
            $http.get('/authenticate/all').success(function (result) {
                $scope.inCount = result.message.length;
                $scope.presentList = result.message;
                $scope.presentList.forEach(function (member) {
                    $scope.maps.push(member);
                });
            });
            $scope.timeIn = function(inTime){
                var currentTime = new Date();
                inTime = new Date(inTime);
                if(inTime.getFullYear() === currentTime.getFullYear() && inTime.getMonth() === currentTime.getMonth() && inTime.getDate() === currentTime.getDate()){
                    var hours = 0,
                        minutes = 0,
                        elapsed;

                    elapsed = (currentTime - inTime)/1000;
                    minutes = elapsed/60;
                    hours = minutes/60;
                    minutes%=60;

                    hours = Math.trunc(hours);
                    minutes = Math.trunc(minutes);

                    return hours + 'hrs, ' + minutes + 'min';
                }
                else{
                    console.log('Error, last check-in was not today.');
                }
            };
        };
    }])
    .directive('myDir', ['$compile', 'svc', function ($compile, svc) {
        return{
            scope: true,
            link: function (scope, element, attrs) {
                $(function () {
                    var map = new google.maps.Map(document.getElementById('groupMap'), {
                        center: {lat: svc.lat, lng: svc.lng},
                        zoom: 8
                    });
                    var bounds = new google.maps.LatLngBounds();
                    var markers = [];
                    scope.$watch( function () {
                        markers.length = 0;
                        scope.maps.forEach(function (member) {
                            var marker = new google.maps.Marker({
                                position: {lat: member.geocode[0], lng: member.geocode[1]},
                                map: map,
                                title: member.username,
                                icon: '../images/user-icon.png'
                            });
                            markers.push(marker);
                            for(i=0;i<markers.length;i++) {
                                bounds.extend(markers[i].getPosition());
                            }
                            map.fitBounds(bounds);
                        });
                    })
                });
            }
        }
    }]);