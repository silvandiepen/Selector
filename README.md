# jQuery.Selector

	An alternative select field. Which works on mobile and desktop. By clicks or just native scrolling. Set active and selected and call functions on new checked or active. 
	
	Still a work in progress (help is welcome)

### Initialize Selector (example)


```javascript

	$('#ID-TO-ELEMENT').Selector({
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

Installation
------------

Install the script with bower or make your own files

### Embed

```html
<script type="text/javascript" src="vendor/jquery.Selector.js"></script>
```

### Bower

```
bower install selector --save
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






