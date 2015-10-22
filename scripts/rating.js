var app = angular.module('sampleApp', ["firebase"]).controller('RatingCtrl', ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
        $scope.rating = 2;
        var email = $scope.email;
        var fireRef = new Firebase("https://rating123.firebaseio.com/");
        $scope.reviews = $firebaseArray(fireRef);
        $scope.rateFunction = function(rating, email) {
            // Synchronizing the items on our $scope
            var newUserRef = fireRef.push();
            newUserRef.set({
                'email': email,
                'Mobile': rating
            });
            /*fireRef.on("value", function(snapshot) {
            console.log(snapshot.val());
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });*/
        };

    }])
    .directive('starRating',
        function() {
            return {
                restrict: 'A',
                template: '<ul class="rating">' + '  <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' + '\u2605' + '</li>' + '</ul>',
                scope: {
                    ratingValue: '=',
                    max: '=',
                    onRatingSelected: '&'
                },
                link: function(scope, elem, attrs) {
                    var updateStars = function() {
                        scope.stars = [];
                        for (var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled: i < scope.ratingValue
                            });
                        }
                    };

                    scope.toggle = function(index) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({
                            rating: index + 1
                        });
                    };

                    scope.$watch('ratingValue',
                        function(oldVal, newVal) {
                            if (newVal) {
                                updateStars();
                            }
                        }
                    );
                }
            };
        }
    );
