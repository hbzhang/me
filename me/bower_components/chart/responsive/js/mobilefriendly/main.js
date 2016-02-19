
var ww = document.body.clientWidth;

$(document).ready(function() {
	$(".nav li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("parent");
		};
	})

	$(".toggleMenu").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".nav").toggle();
	});
	adjustMenu();
})

$(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (ww <= 768 ) {
	    $("#graybar").hide();
        $("#logo").hide();
        $(".logo, #imageSize.inner").show();
        $(".topImage").show();
        $("#header,#header.container").css("background","none");
        $(".nav li").css("border-bottom","thin solid white");
        $(".nav ul").css("width","none");
        //$(".topImage #imageSize").css("background-image", "../images/bannerMobile.png");
		$(".toggleMenu").css("display", "inline-block");
		if (!$(".toggleMenu").hasClass("active")) {
            $(".nav").hide();
		} else {
			$(".nav").show();
		}
		$(".nav li").unbind('mouseenter mouseleave');
		$(".nav li a.parent").unbind('click').bind('click', function(e) {
			// must be attached to anchor element to prevent bubbling
			e.preventDefault();
			$(this).parent("li").toggleClass("hover");
		});
	}
	else if (ww > 768) {
	   //h=document.getElementById('logo').visible;
		$(".toggleMenu").css("display", "none");
        $(".logo").hide();
        $("#header,#header.container").css("background","#aeaeae");
		$(".nav").show();
        $("#logo").show();
        $("#graybar").show();
        //$("#border").hide();
		$(".nav li").removeClass("hover");
		$(".nav li a").unbind('click');
		$(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
		});
	}
}
