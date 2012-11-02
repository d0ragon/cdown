# CDown v1.0

* https://github.com/vazha-asatiani/cdown

# DESCRIPTION

CDown is a lightweight countdown based on javascript & jQuery.


# INSTALL

Just download and include cdown.js file.


# USAGE

You just need to select an element with jQuery and then run cdown, e.g.
```javascript
$('#myid').cdown(options);
```


# OPTIONS

options is an object with 2 necessary and 2 optional properties.

## Necessary Properties

* __start__: Start date. Javascript date object or time in seconds.  
e.g.
```javascript
new Date()
```
or
```javascript
Math.round(new Date().getTime() / 1000)
```
because new Date().getTime() returns time in milliseconds.  
You can also get the seconds with unary operator:
```javascript
start = + new Date()
```
`+ new Date()` is equal to `new Date().getTime()`

* __end__: End date. Javascript date object or time in seconds.  
For example, if you want the end date to be 13:00 February 3, 2013, you should create a date object according to this:
```javascript
new Date(year, month, day, hours, minutes, seconds)
```
and note that month indexes in javascript start with 0, so the object for 13:00 February 3, 2013 will be:
```javascript
var end = new Date(2013, 1, 3, 13, 0, 0);
```
and if you want to get seconds:
```javascript
end = Math.round(end.getTime() / 1000);
```


## Optional Properties

* __use_plain_text__: `boolean`  
If set to true, innerHTML of the countdown element will be only text, no html tags, e.g. `10:02:03:06`.  
If set to false, countdown function will use a template with tags for custom styling:
```html
<div class="cdown_p">
      <div class="cdown_number cdown_days">00</div>
      <div class="cdown_define"> labels.days </div>
</div>
<span class="cdown_colon">:</span>
<div class="cdown_p">
      <div class="cdown_number cdown_hours">00</div>
      <div class="cdown_define"> labels.hours </div>
</div>
<span class="cdown_colon">:</span>
<div class="cdown_p">
      <div class="cdown_number cdown_minutes">00</div>
      <div class="cdown_define"> labels.minutes </div>
</div>
<span class="cdown_colon">:</span>
<div class="cdown_p">
      <div class="cdown_number cdown_seconds">00</div>
      <div class="cdown_define"> labels.seconds </div>
</div>
```

* __labels__: an object with 4 properties: days, hours, minutes & seconds.  
If you want to have labels under numbers, you can set the values for them with this option. But if `use_plain_text` property is set to `true`, this won't work, of course.  
Also, if you want to use the template but you don't want to have the labels, you can set the `display: none` property for `.cdown_define` class.
```css
.cdown_define {
      display: none;
}
```

