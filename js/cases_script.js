$(document).ready(function() { 
  /*--------------------------------------------------------------------------------
  -----------  POPUP VIDEO - uses Vimeo API and JQuery ColorBox Plugin  ------------
  --------------------------------------------------------------------------------*/
  $('a.popup_video').click(function(e) {  
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
  ------------------------  CASE STUDIES NAV JAVASCRIPT  ---------------------------
  --------------------------------------------------------------------------------*/
  $(".menu a").click(function(e) {
    e.preventDefault();
    var $link = $(this),
      href = $link.attr('href');

    $link.parents('ul').find('.selected').removeClass('selected');
    $link.addClass('selected');

    $('.case:visible').hide();
    $(href).show();

    $('html, body').scrollTop(0);
  });

  var hash,
    $menu,
    $cases,
    $currentCase;

  hash = window.location.hash;  
  $menu = $(".menu");
  $cases = $(".case");
  $currentCase = $cases.filter(hash);

  $cases.hide();

  if($currentCase.length > 0) {
    $currentCase.show();
    $menu.find('a').removeClass('selected').filter('a[href$='+hash+']').addClass('selected');
  }
});

