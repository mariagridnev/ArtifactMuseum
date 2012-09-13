$(document).ready(function() {  
  /*--------------------------------------------------------------------------------
  - PAGES SLIDER ANIMATION - uses jQuery 'Easing', 'scrollTo' and 'inview' Plugins -
  --------------------------------------------------------------------------------*/
  $('body').on('click','nav a, a.video_strip',function(){
    $(window).trigger('action');
    $(window).unbind('action');
    
    var whereToScroll = $(this).attr('href');
    
    settings = {
      duration:1500,
      easing: 'easeInOutQuart',
      onAfter:function(){       
        $('html').removeClass('moving');
        window.location.hash = whereToScroll;
      }
    };

    $('html').addClass('moving');
    
    // create dynamic pageview call
    _gaq.push(['_trackPageview', whereToScroll]);
    
    //this uses the scrollTo plug-in
    $.scrollTo(whereToScroll,settings);
    
    return false;
  });

  var $window = $(window);
  var windowHeight = $window.height(); 

  //apply the class "inview" to a section that is in the viewport
  $('#home, #case, #work, #team').bind('inview', function (event, visible) {
    if (visible === true) {
      $(this).addClass("inview");

      if (artifact.useragent.getType() == 'desktop' || artifact.useragent.getDevice() == 'ipad') {
        $('nav a').removeClass('selected');
        $('nav a[href=#' + $(this).attr('id') + ']').addClass('selected');
      }
      // create dynamic pageview call
      _gaq.push(['_trackPageview', '#' + $(this).attr('id')]);
    
    } else {
      $(this).removeClass("inview");
    }
  });

  $window.bind('scroll', function(){ //when the user is scrolling...
    $window.trigger('action');
    $window.unbind('action');
  });

  /*--------------------------------------------------------------------------------
  ------------  HOME-PAGE GALLERY SLIDER - uses jQuery Cycle Plugin  ---------------
  --------------------------------------------------------------------------------*/
  $('#home_gallery').cycle({ 
    fx: 'scrollLeft',
    speed: 1200,
    timeout: 7000 
  }); 

  /*--------------------------------------------------------------------------------
  --------------------------  CAPABILITIES ANIMATION  ------------------------------
  --------------------------------------------------------------------------------*/
  $('#capabilities').hover(
    function() {
      $('ul.cap_list').slideDown('slow');
      $('p.title').css('background','#d8352c');
    },
    function() {
      $('ul.cap_list').slideUp('fast');
      $('p.title').css('background','#000');
    }
  );

  /*--------------------------------------------------------------------------------
  -------------  CASE-PAGE CASES SLIDER - uses jQuery Cycle Plugin  ----------------
  --------------------------------------------------------------------------------*/
  $('.case_slider').after('<div class="case_slider_nav">').cycle({
    fx: 'scrollLeft',
    speed: 600,
    timeout: 0,
    pager: '.case_slider_nav',
    pagerAnchorBuilder: function(index, el) {
        return '<div></div>';
      }
  });

  /*--------------------------------------------------------------------------------
  ----------------------------  CREATE "MORE WORK" PAGE  ---------------------------
  --------------------------------------------------------------------------------*/
  createWorkPage = {

    init:function(){
      var self = this;
      self.albumID = 1906571;
      self.writePage();
    },

    itemTemplate:'<div class="work_item"><a class="video popup_video" href="http://vimeo.com/{videoId}" data-videotitle="{videoTitle}" data-videodesc="{videoDescription}" data-videoid="{videoId}"><img src="{imgSource}" alt="" border="0" width="143" height="107" /></a></div>',

    writePage:function(){   
      var self = this;
      self.itemSource = '<li class="panel clearfix">';
      self.counter = 0;

      var url = "http://www.artifactdesign.com/vimeo/index_museum.php?album_id=" + self.albumID;
      $.getJSON(url,function(data) {
        $(data.videos.video).each(function(i){

        self.itemSource += artifact.substitute(self.itemTemplate,{
          imgSource:this.thumbnails.thumbnail[1]._content,
          videoId:this.id,
          videoTitle:this.title.replace(/\x22/g, '&quot;'),
          videoDescription:this.description.replace(/\x22/g, '&quot;')
        });
        self.itemSource += '</li><li class="panel clearfix">';


        });
        self.itemSource += '</li>';

        $('#video_left').show();
        $('#video_right').show();


        $('#work .video_gallery').html(self.itemSource);
      });
    }
  };

  createWorkPage.init();

  /*--------------------------------------------------------------------------------
  -----------  POPUP VIDEO - uses Vimeo API and JQuery ColorBox Plugin  ------------
  --------------------------------------------------------------------------------*/
  $(document).on("click", "a.popup_video", function(e) {
    e.preventDefault();

    var $link, 
        title,
        videoId, 
        desc,
        videoIFrame;

      $link = $(this);
      title = $link.data("videotitle");
      videoId = $link.data("videoid");
      desc = $link.data("videodesc");
      videoIFrame = '<iframe src="http://player.vimeo.com/video/' + videoId +'?color=ffffff" width="640" height="360" frameborder="0"></iframe>'; 

    var _cbHTML = '';

      _cbHTML = '<iframe src="http://player.vimeo.com/video/' + videoId  + '?color=ffffff" width="640" height="360" frameborder="0"></iframe><h4>' + title + '</h4><p>' + desc + '</p>';

    var _cbWidth = '670px';

    $.colorbox({
      close:'<img src="img/overlay_close.png" alt="Close" border="0" />', 
      width: _cbWidth, 
      transition: 'none', 
      scrolling: false, 
      html: _cbHTML, 
      onComplete: function(){ 
        $('#colorbox').hide(); 
        $('#colorbox').fadeIn(500); 
      }
    });
  });
  
  /*--------------------------------------------------------------------------------
  ----------------------------  NEWSLETTER FORM SUBMIT  ----------------------------
  --------------------------------------------------------------------------------*/  
  $('#newsletterSubmit').click(function(){
    var email = $('#email').val();

      if (!email.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
        alert('Please enter a valid email address');      
        return false;
      }

    var postData = 'email=' + email;

    var errorHTML = '<p>Sorry, but there was an error! Please email <a href="mailto:amanda@artifactdesign.com">amanda@artifactdesign.com</a> to sign up for our newsletter.</p>';
    var successHTML = '<p>Thanks for subscribing to our newsletter!';

    $.ajax({
      type: "POST",
      url: "mail.php",
      data: postData,
      cache: false,
      success: function(success){
        if(success) {
          $("#newsletter").hide().html(successHTML).fadeIn(500);
        } else {
          $("#newsletter").hide().html(errorHTML).fadeIn(500);
        }
      }
    });
    
    return false;  
  });
});






