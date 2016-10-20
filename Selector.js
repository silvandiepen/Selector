$.fn.Selector = function(options) {

  // Set Variables
  console.log('Selector: #'+$(this).attr('id')+' initialized');

  var self = {};
  var selectorMidLine, sIndex,arrows,currentTop,margin = {};
  var selector = $(this);
  var settings = $.extend({
    clickToOpen: false,
    setActiveOnClick: true,
    checkedClass: 'checked',
    setOrder: true,
    timeToGo: 300,
    valueAttr: 'data-value',
    arrows: 300
  },options);


  // Create Functions

  self.goToUrl = function goToUrl(el){
    setTimeout(function(){
      if(el.attr('href').length() > 0){
        window.location.href = el.attr('href');
      } else if(el.attr('data-url').length > 0){
        window.location.href = el.attr('data-url');
      }
    },settings.timeToGo);
  };

  self.scrollToSelected = function scrollToSelected(el){
    var scrollToIndex = el.index();
    var scrollToPx = scrollToIndex * el.outerHeight();
    selector.animate({scrollTop:scrollToPx},400);
    self.setSelected(selector);
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
    selector.attr('data-checked', el.attr(settings.valueAttr));
  };
  self.setActive = function setActive(selector,el) {
    selector.attr('data-active', el.attr(settings.valueAttr));
  };

  self.keepArrowsInPlace = function keepArrowsInPlace(selector) {
    arrows.css('top',selectorMidLine + currentTop);
  };

  self.goToOption = function goToOption(goto){
    console.log('somethingggg');
    var goIndex;
    if(goto === 'up'){
      console.log('up');
      goIndex = selector.find('li.'+settings.checkedClass).index() - 1;
    } else if(goto === 'down') {
      console.log('down');
      goIndex = selector.find('li.'+settings.checkedClass).index() + 1;
    } else {
      goIndex = goto;
    }
    console.log(goIndex);
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
      el.addClass('active');
    });
  }

  // Initialize and Scroll

  $(document).ready(function(){
    self.initSelector(selector);
    self.scrollToSelected(selector.find('li.'+settings.activeClass));
    // self.setSelected(selector);

    if(settings.arrows){
	  	self.keepArrowsInPlace();
	  }
  });
  $(selector).scroll(function() {
    self.setSelected(selector);
    currentTop = selector.scrollTop();
    if(settings.arrows){
	  	self.keepArrowsInPlace();
	  }
  });

};
