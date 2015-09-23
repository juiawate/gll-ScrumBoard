/**
 * Created by natalie on 9/14/2015.
 */
angular.module('scrumBoardApp.dash', [])
    .service('svc', [ '$rootScope', function ($rootScope) {
        var service = {
            lat: 0,
            lng: 0,
            initMap: function (lat, lng) {
                console.log('line 10 of d-s', lat, lng);
                lat = typeof lat !== 'undefined' ? lat : 37.3763019;
                lng = typeof lng !== 'undefined' ? lng : -122.0306044;
                this.lat = lat;
                this.lng = lng;
            }
        };
        return service;
    }])
    .controller('DashController', ['$scope', '$interval', '$http', '$location', 'Accounts', 'svc', function ($scope, $interval, $http, $location, Accounts, svc) {
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        if($scope.user.type !== 'Admin' && $scope.user.type !== 'Master'){
            $http.get('/403').success(function (result) {
            });
            window.location = './#/home';
        }
        $scope.seeLog = false;
        $scope.zooming = false;
        $scope.maps = [];
        $scope.prettyDate  = function(inDate){
            var date = new Date(inDate);
            return date;
        };
        $scope.whosIn = function(){
            $http.get('/authenticate/all/in').success(function (result) {
                $scope.inCount = result.message.length;
            });
        };
        $scope.showEntries = function () {
            var url = '/attendance/roster';
            $http.get(url).success(function (result) {
                $scope.dataList = result;
            });
            $http.get('/authenticate/all/members').success(function (result) {
                $scope.memberList = result.message;
                $scope.memberList.forEach(function (member) {
                    if (member.status === 'in'){
                        $scope.maps.push(member);
                    }
                });
            });
            $scope.timeIn = function(inTime){
                if (typeof inTime === 'undefined'){
                    return undefined;
                }
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
        $scope.lightStatus = function (status) {
            if (status === 'in'){
                return true;
            }
            else return false;
        };
        $scope.zoomTo = function (coords) {
            $scope.zooming = !$scope.zooming;
            if($scope.zooming){
                svc.initMap(coords[0],coords[1]);
                console.log('zooming...', $scope.zooming);
            }
        };
    }])
    .controller('HighchartController', ['$scope', function($scope){
        $scope.highchart = function() {
            $('#highchartContainer').highcharts({
                title: {
                    text: 'Weekly Working Hours',
                    x: -20 //center
                },
                xAxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri']
                },
                yAxis: {
                    title: {
                        text: 'Total Hours'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ' Hours'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 1
                },
                series: [{
                    name: 'Ronak',
                    data: [7.0, 6.5, 8, 6, 5.5]
                }, {
                    name: 'Natalie',
                    data: [7, 6, 7.5, 8, 5]
                }, {
                    name: 'Charles',
                    data: [4, 8, 8, 7, 6]
                }, {
                    name: 'Lakshmi',
                    data: [5, 7, 5.5, 7.5, 7]
                }]
            });
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
                        if (scope.zooming){
                            map.setCenter({lat:svc.lat,lng:svc.lng});
                            map.setZoom(16);
                        }
                        else{
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
                        }
                    })
                });
            }
        }
    }]);