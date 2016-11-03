$.fn.Selector = function(options) {



  var self = {};
  var selectorMidLine, sIndex,arrows,currentTop,margin = {},allowSetSelected = true;
  var selector = $(this);
  var initialized = false;
  var settings = $.extend({
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
  },options);

  if(!initialized){
    console.log('initialized!');
    $(window).scroll(function(){
        self.initSelector(selector);
        self.scrollToSelected(selector.find('li.'+settings.activeClass));
        if(settings.arrows){
    	  	self.keepArrowsInPlace();
    	  }
    	  console.log('Selector: #'+$(this).attr('id')+' initialized');
        initialized = true;
    });
  }


  // Create Functions

  self.goToUrl = function goToUrl(el){
    setTimeout(function(){
      if(el.attr('href').length() > 0){
        window.location.href = el.attr('href');
      } else if(el.attr('data-url').length > 0){
        window.location.href = el.attr('data-url');
      }
    },settings.transitionTime);
  };

  self.scrollToSelected = function scrollToSelected(el){
    var scrollToIndex = el.index();
    var scrollToPx = scrollToIndex * el.outerHeight();
    selector.animate({scrollTop:scrollToPx},settings.transitionTime);
  //  self.setSelected(selector);
  };

  self.initSelector = function initSelector(selector) {
      selectorMidLine = selector.outerHeight() / 2;
      var checked = selector.find('li.'+settings.checkedClass);
      self.setActive(selector,checked);
      self.setChecked(selector,checked);

      margin.top = (selectorMidLine - (checked.outerHeight() / 2));
      margin.bottom = margin.top;
      if(settings.arrows){
    //    margin.top = margin.top - arrows.outerHeight();
      }
      selector.find('ul').css({
        'margin-top': margin.top,
        'margin-bottom': margin.bottom
      });
      initialized = true;
  };

  self.setSelected = function setSelected(selector) {
    selector.find('li').each(function() {
      if ($(this).position().top < selectorMidLine && ($(this).position().top + $(this).outerHeight()) > selectorMidLine && !$(this).hasClass('checked')) {
        sIndex = $(this).index();
        selector.find('li').each(function() {
          $(this).removeClass('checked').attr('data-order', sIndex - $(this).index());
        });
        $(this).addClass('checked');
        self.setChecked(selector,$(this));
      }
    });
  };

  self.setChecked = function setChecked(selector,el) {
    selector.attr('data-checked', el.attr(settings.valueAttr)).triggerAll('checkedChange selectorChange');
  };
  self.setActive = function setActive(selector,el) {
    selector.attr('data-active', el.attr(settings.valueAttr)).triggerAll('activeChange selectorChange');
  };

  self.keepArrowsInPlace = function keepArrowsInPlace(selector) {
    arrows.css('top',selectorMidLine + currentTop);
  };

  self.goToOption = function goToOption(goto){
    var goIndex;
    if(goto === 'up'){
      goIndex = selector.find('li.'+settings.checkedClass).index() - 1;
    } else if(goto === 'down') {
      goIndex = selector.find('li.'+settings.checkedClass).index() + 1;
    } else {
      goIndex = goto;
    }
    self.scrollToSelected(selector.find('li:eq('+goIndex+')'));
  };

    if(settings.arrows){
      arrows = $('<div>').addClass('selector-arrows');
      arrows.append($('<a>').addClass('selector-arrows-up').on('click',function(){ self.goToOption('up'); }));
      arrows.append($('<a>').addClass('selector-arrows-down').on('click',function(){ self.goToOption('down'); }));
      selector.prepend(arrows);
    }

  // Click Actions

  if(!settings.clickToOpen){
    selector.on('click','li',function(e){
      e.preventDefault();
      self.scrollToSelected($(this));
    });
  }

  if(settings.setActiveOnClick){
    selector.on('click','li a',function(e){
      var clickedElement = $(this);
      self.setActive(selector,$(this).parent());
      self.scrollToSelected($(this).parent());
      if(!settings.clickToOpen){
        e.preventDefault();
      }
      selector.find('.active').each(function(){
        $(this).removeClass('active');
      });
      $(this).parent().addClass('active');
    });
  }


// Check if var is function
self.isFunction = function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
// On Active change
selector.on('activeChange', function(){
  if(self.isFunction(settings.onActiveChange)){
    settings.onActiveChange();
  }
});
// On Checked change
selector.on('checkedChange', function(){
  if(self.isFunction(settings.onCheckedChange)){
    settings.onCheckedChange();
  }
});
// On Checked change
selector.on('selectorChange', function(){
  if(self.isFunction(settings.onSelectorChange)){
    settings.onSelectorChange();
  }
});



  // When leaving the Selector
  selector.mouseleave(function(){
    setTimeout(function(){
      self.scrollToSelected(selector.find('li.'+settings.checkedClass));
    },200);
  });

  // When scrolling into Selector
  selector.scroll(function() {
    self.setSelected(selector);
    currentTop = selector.scrollTop();
    if(settings.arrows){
	  	self.keepArrowsInPlace();
	  }
  });

};

(function($) {
    $.fn.extend({
        triggerAll: function (events, params) {
            var el = this, i, evts = events.split(' ');
            for (i = 0; i < evts.length; i += 1) {
                el.trigger(evts[i], params);
            }
            return el;
        }
    });
})(jQuery);
