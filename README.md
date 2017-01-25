# jQuery.Selector

An alternative select field. Which works on mobile and desktop. By clicks or just native scrolling. Set active and selected and call functions on new checked or active. 
	
Still a work in progress (help is welcome)


Installation
------------

Install the script with bower or make your own files

### Bower

```
bower install selector --save
```
### Npm

```
npm install jquery.selector --save
```

### Embed

```html
<script type="text/javascript" src="vendor/jquery.Selector.js"></script>
```

### Initialize Selector (example)

Initialize selector in javascript:

```javascript

	var CountrySelector = $('#countrySelector');
	CountrySelector.Selector({
		init: true,
		clickToOpen: false,
		setActiveOnClick: true,
		checkedClass: 'checked',
		setOrder: true,
		transitionTime: 300,
		valueAttr: 'data-value',
		arrows: 300,
		onSelectorChange: false,
		onActiveChange: false,
		onCheckedChange: false
	});

```
Create html code for selector

```html
	<div id="countrySelector">
		<ul>
			<li>Armenia</li>
			<li>Belgium</li>
			<li>Curaçao</li>
			<li>Denmark</li>
			<li>Ecuador</li>
			<li>France</li>
			<li>Georgia</li>
			<li>Hungary</li>
			<li>Iceland</li>
			<li>Japan</li>
		</ul>
	</div>
	
```

Embed CSS from selector.css or selector.scss

### Preset checked element
In order to default set an active element. Set the active class (defined in init, default: 'active'), to the element in the list. 
Create html code for selector

```html
	<li class="checked">Curaçao</li>
```


### Go To
In order to scroll the slider from another function, use the goto function.  You can use here any jQuery selector; 
ex: #idofelement, .classofelement div:nth-child(3) 


```js
	$selectboxCountry.Selector({goto: '#country-denmark' });
```

### onSelectorChange / onCheckedChange / onActiveChange

You can call function on change or checked by adding them to the init of the selector

``` js
onActiveChange: function(){ alert('Selector Changed'); }
```		

### Mobile specific

To use mobile specific functions or other behaviour, it is possible to overwrite certain values on mobile by using:

``` js
	onMobile: { arrows: false, transitionTime: 600, onActiveChange: function(){} }
```		

All options in onMobile will overrule the default or set settings. Standard max screen width is set to 750px, you can change this by
setting the mobileScreen:

``` js
	mobileScreen: 640
```		
Make sure you dont use pixels, rem, em, pt or percentages.  






