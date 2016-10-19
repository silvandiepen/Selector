$.fn.Selector = function(options) {

  // Set Variables

  var self = {};
  var selectorMidLine, sIndex;
  var selector = $(this);
  var settings = $.extend({
    clickToOpen: false,
    setActiveOnClick: true,
    checkedClass: 'checked',
    setOrder: true,
    timeToGo: 300
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
    console.log(scrollToIndex);
    console.log(el.outerHeight());
    selector.animate({scrollTop:(scrollToIndex * el.outerHeight())},400);
    self.setSelected(selector);
  };

  self.initSelector = function initSelector(selector) {
      selectorMidLine = selector.outerHeight() / 2;
      var checked = selector.find('li.'+settings.checkedClass);
      var margin = (selectorMidLine - (checked.outerHeight() / 2));
      selector.find('ul').css({
        'margin-top': margin,
        'margin-bottom': margin
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
        self.setValue(selector,$(this));
      }
    });
  };

  self.setValue = function setValue(selector,el) {
    selector.attr('data-selected', el.attr('data-value'));
  };

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
  });
  $(selector).scroll(function() {
    self.setSelected(selector);
  });

};
