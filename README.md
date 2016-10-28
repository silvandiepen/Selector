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