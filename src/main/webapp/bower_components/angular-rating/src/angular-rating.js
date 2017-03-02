(function () {
    "use strict";

    angular.module("angular-rating", []).component("rating", {
        template: '<span class="rating-container" ng-mouseleave="model.control_onMouseLeave()">' +
        '<span class="star glyphicon glyphicon-star" ng-class="{\'star-on\':entry.filled, \'star-high\':entry.highlighted}"' +
        'ng-mouseover="model.onMouseOver($index)"' +
        'ng-mouseleave="model.onMouseLeave($index)"' +
        'ng-click="model.onClick($index)"' +
        'style="font-size:{{model.size}};" ng-repeat="entry in model.stars track by $index"></span>' +
        '</span>',
        bindings: {
            value: "=",
            max: "<",
            size: "@",
            color: "@",
            align: "@",
            interactive: "@"
        },
        transclude: true,
        controllerAs: "model",
        controller: ["$timeout", "$scope", function ($timeout, $scope) {
            var model = this;

            model.userSelectedValue = -1;
            if (isInteractive()) {
                model.value = -1;
            }

            if (!model.value) {
                if (model.value !== 0)
                    model.value = 1;
            }

            if (!model.size)
                model.size = '20px';

            if (!model.color)
                model.color = "#F7EB90";

            if (!model.highColor)
                model.highColor = "#F7EB90";

            if (model.max == undefined) {
                model.max = 5;
            }

            model.stars = drawStars(model.value, model.max);

            var eventQueue = {
                type: '',
                index: -1,
                action: null,
                process: function (_type, _index) {
                    this.type = _type;
                    this.index = _index;
                    if (this.type === 0) { //unhighlight: mouse out of star
                        var _event = this;
                        if (isDirty()) {
                            return;
                        }
                        this.action = $timeout(function () {
                            if (_event.index == 'out') {
                                UnhighlightedStar(_event.index);
                            }
                        }, 100);
                    } else if (this.type === 'hover') { // highlight: mouse in star
                        reset();

                        if (this.action) {
                            $timeout.cancel(this.action);
                        }
                        for (var i = this.index; i >= 0; i--) {
                            highlightedStar(i);
                        }
                        for (var i = this.index + 1; i <= model.max - 1; i++) {
                            UnhighlightedStar(i);
                        }
                        for (var i = 0; i < model.max; i++) {
                            UnfillStar(i);
                        }
                    }
                    else if (this.type === 'click') { // select: click on star
                        setValue(this.index + 1);

                        for (var i = this.index; i >= 0; i--) {
                            fillStar(i);
                        }
                        for (var i = this.index + 1; i <= model.max - 1; i++) {
                            UnfillStar(i);
                        }
                        for (var i = 0; i < model.max; i++) {
                            UnhighlightedStar(i);
                        }
                    }
                }
            };

            $scope.$watch('model.value', function () {
                model.stars = drawStars(model.value, model.max);
            });

            model.onMouseOver = function (starIndex) {
                if (isInteractive()) {
                    eventQueue.process('hover', starIndex);
                }
            }

            model.onMouseLeave = function (starIndex) {
                if (isInteractive()) {
                    eventQueue.process('out', starIndex);
                }
            }

            model.onClick = function (starIndex) {
                if (isInteractive()) {
                    eventQueue.process('click', starIndex);
                }
            }

            model.control_onMouseLeave = function () {
                if (!isInteractive()) { return; }
                for (var i = model.value - 1; i >= 0; i--) {
                    fillStar(i);
                }
                for (var i = model.value + 1; i <= model.max - 1; i++) {
                    UnfillStar(i);
                }
                for (var i = 0; i < model.max; i++) {
                    UnhighlightedStar(i);
                }
            }

            function drawStars(rateValue, maxValue) {
                var stars = [];
                for (var i = 0; i < maxValue; i++) {
                    stars.push({
                        filled: i < rateValue
                    });
                }
                return stars;
            }

            function reset() {
                model.value = model.userSelectedValue;
            }

            function isDirty() {
                return model.userSelectedValue !== model.value;
            }

            function isInteractive() {
                if (model && model.interactive) {
                    return model.interactive.toLowerCase() == "true";
                }
                else {
                    return false;
                }
            }

            function UnmarkStar(s) {
                model.stars[s].filled = false;
                model.stars[s].highlighted = false;
            }

            function fillStar(s) {
                model.stars[s].filled = true;
            }

            function UnfillStar(s) {
                model.stars[s].filled = false;
            }

            function highlightedStar(s) {
                model.stars[s].highlighted = true;
            }

            function UnhighlightedStar(s) {
                model.stars[s].highlighted = false;
            }

            model.setRatingValue = function () {
                for (var i = model.value - 1; i >= 0; i--) {
                    fillStar(i);
                }
                for (var i = model.value + 1; i <= model.max - 1; i++) {
                    UnfillStar(i);
                }
                for (var i = 0; i < model.max; i++) {
                    UnhighlightedStar(i);
                }
            }

            function setUserSelection(val) {
                model.userSelectedValue = val;
            }

            function setValue(val) {
                model.value = val;
                model.userSelectedValue = val;
            }

            // the following is the insertion of styles into page onload
            var rating = {
                selector: 'rating',
                rules: [
                    'text-align: ' + (model.align || 'center') ,
                    'display: block',
                    'padding-bottom: 3px'
                ]
            }
            var star = {
                selector: '.star',
                rules: [
                    'font-size: 18px',
                    'color: #ddd',
                    'cursor: pointer'
                ]
            }
            var starOthers = {
                selector: '.star+.star',
                rules: [
                    'margin-left: 3px'
                ]
            }
            var starOn = {
                selector: '.star.star-on',
                rules: [
                    'color:' + model.color
                ]
            }
            var starHigh = {
                selector: '.star.star-high',
                rules: [
                    'color:' + model.highColor
                ]
            }

            var ratingCSS = rating.selector + '{' + rating.rules.join(';') + '}';
            var starCSS = star.selector + '{' + star.rules.join(';') + '}';
            var starOthersCSS = starOthers.selector + '{' + starOthers.rules.join(';') + '}';
            var starOnCSS = starOn.selector + '{' + starOn.rules.join(';') + '}';
            var starHighCSS = starHigh.selector + '{' + starHigh.rules.join(';') + '}';
            angular.element(document).find('head').prepend('<style type="text/css">' + ratingCSS + starCSS + starOthersCSS + starOnCSS + starHighCSS + '</style>');

        }]
    });

} ());