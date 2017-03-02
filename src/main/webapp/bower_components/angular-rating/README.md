# Angular Rating 

> is a module to help you create a rating with some cusomizable options

![Rating Example](http://i.imgur.com/IRdJuov.jpg)

Current Version
---------------
```
3.1.0
```

Installation
------------
```
bower install angular-rating --save
```
OR
```
npm install angular-rating --save
```

Requirements
------------

- [AngularJS](http://angularjs.org) Version 1.5 at least
- [Bootstrap CSS](http://getbootstrap.com) 

Usage
=====

### Setup

Just include the js file to your html

```html
<script src="/path/to/angular-rating.js"></script>
```

Then, include the module in your code:

```javascript
angular.module('myModule', ['angular-rating'];
```

### Directive

This is a component, so at its most basic:

```html
<rating value="foo" max="5"></rating>
```

This will render the rating contained in `foo` with maximum 5 stars, and 5 is the default if you don't provide max attribute.

`foo` should be an Integar:

```javascript
foo = 1;
foo = 3;
foo = 4;
```

### Attributes

- `value` is the only required attribute that should contain Integar as I mentioned above.
- `max` is optional and this is the whole number of stars you want to show at a time.
- `size` is optional, this option is to provide the size of stars as you want to view them and also provide its unit as well (20px is the default in case it's not provided), just like:
```html
    <rating value="foo" size="30px"></rating>
    <rating value="foo" size="10em"></rating>
```
- `color` is optional, this is the color of the filled stars, so you can choose a color of your choice if not it will be `#F3D82C` as default value, 
the color can be a litteral color or HEX color prefixed by `#`.
```html
    <rating value="foo" color="red"></rating>
    <rating value="foo" color="#333"></rating>
```
- `interactive` is optional, by default it's `true`, that means you can change the rating but if you assign it to `false` the rating will be disabled.

License
=======

MIT

Authors
=======

- Medhat Dawoud (@med7atdawoud)
- Peter Sobhy
