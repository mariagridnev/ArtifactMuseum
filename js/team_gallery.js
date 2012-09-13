/* ---- SET VARIABLES ---- */
var image = 0,
	mainImageWidth = 320,
	transitionTime = 200;

/* ---- GALLERY DATA ---- */
var images = [
	{
		caption: "Team",
		caption2: "",
		image: "img/team/battery.jpg",
		image2: "img/team/battery.jpg"
	},
	{
		caption: "Ken",
		caption2: "Executive Creative Director",
		image: "img/team/kenA.jpg",
		image2: "img/team/kenB.jpg"
	},
	{
		caption: "Brandy",
		caption2: "Director of Interactive Design",
		image: "img/team/brandyA.jpg",
		image2: "img/team/brandyB.jpg"
	},
	{
		caption: "Amanda",
		caption2: "Account Executive",
		image: "img/team/amandaA.jpg",
		image2: "img/team/amandaB.jpg"
	},
	{
		caption: "Amy",
		caption2: "General Manager",
		image: "img/team/amyA.jpg",
		image2: "img/team/amyB.jpg"
	},
	{
		caption: "Adrienne",
		caption2: "Senior Producer",
		image: "img/team/adrienneA.jpg",
		image2: "img/team/adrienneB.jpg"
	},
	{
		caption: "Chase",
		caption2: "Desinger / Animator",
		image: "img/team/chaseA.jpg",
		image2: "img/team/chaseB.jpg"
	},
	{
		caption: "Chris",
		caption2: " Executive Producer",
		image: "img/team/chrisPA.jpg",
		image2: "img/team/chrisPB.jpg"
	},
	{
		caption: "Christina",
		caption2: "Designer / Animator",
		image: "img/team/christinaA.jpg",
		image2: "img/team/christinaB.jpg"
	},
	{
		caption: "Hip Hop",
		caption2: "Director of 3D Animation",
		image: "img/team/chrisRA.jpg",
		image2: "img/team/chrisRB.jpg"
	},
	{
		caption: "Jeff",
		caption2: "Designer / 3D Animator",
		image: "img/team/jeffA.jpg",
		image2: "img/team/jeffB.jpg"
	},
	{
		caption: "Kyung",
		caption2: "Designer / Animator",
		image: "img/team/kyungA.jpg",
		image2: "img/team/kyungB.jpg"
	},
	{
		caption: "Paco",
		caption2: "Designer / Animator",
		image: "img/team/pacoA.jpg",
		image2: "img/team/pacoB.jpg"
	},
	{
		caption: "Pat",
		caption2: "Creative Director",
		image: "img/team/patA.jpg",
		image2: "img/team/patB.jpg"
	},
	{
		caption: "Ryan",
		caption2: "Creative Director",
		image: "img/team/ryanA.jpg",
		image2: "img/team/ryanB.jpg"
	},
	{
		caption: "Stacey",
		caption2: "Producer",
		image: "img/team/staceyA.jpg",
		image2: "img/team/staceyB.jpg"
	},
	{
		caption: "Stephanie",
		caption2: "Office Manager",
		image: "img/team/stephanieA.jpg",
		image2: "img/team/staphanieB.jpg"
	}
];

/* ---- DOCUMENT READY ---- */ 

$(document).ready(function(){
	drawGallery();

});
	
/* ---- PAGE FUNCTIONS ---- */

function drawGallery() {
	var imageData,
		wrapperWidth = 0,
		caption_html = "<ul>\n",
		images_html = "<ul>\n";

		// draw captions and images
		for(var i=0; i<images.length; i++) {
			imageData = images[i];
	
			// add caption
			caption_html += '<li>';
			caption_html += '<p class="caption">' + imageData.caption + '</p>';
			caption_html += '<p class="caption2">' + imageData.caption2 + '</p>';
			caption_html += '</li>' + "\n";
	
			// add a main image
			images_html += '<li>';
			images_html += '<img src="' + imageData.image + '" alt="' + imageData.caption + '" width="300" height="300" />';
			images_html += '</li>' + "\n";
			
			// increment the width of the wrapper
			wrapperWidth += 320;
		}
		
		caption_html += "</ul>\n";
		images_html += "</ul>\n";

	$('#comment').html( caption_html );
	$('.main_image.clipped').html( images_html );
	
	//set the .main_image DIV width dynamically
	$('.main_image.clipped').css('width', wrapperWidth);
	
	//give the first caption the 'selected' class
	//to show it as selected
	$('#comment UL LI:first-child').addClass('selected');
}

function nextImage() {
	if (image === images.length-1) goToImage(0);
	else goToImage(image+1);
}

function previousImage() {
	if (image === 0) goToImage(images.length-1);
	else goToImage(image-1);
}

function goToImage( indx ) {
	//get an array of the caption LI items
	var captions = $('#comment UL LI');
	
	//loop through the captions to either add or remove the 'selected' class
	for(var i=0; i<captions.length; i++) {
		if (i===indx) $(captions[i]).addClass('selected');
		else $(captions[i]).removeClass('selected');
	}

	//get a reference to the UL container for the images
	var container = $('.main_image.clipped UL');
	//determine its position (horizontal)
	var currentX = container.position().left;
	//calculate the new position based on the width of an image
	var newX = (indx * -mainImageWidth);
	
	//if the values are equal we don't need to animate
	if (currentX != newX) {

		if((image === 0 && indx === images.length-1 ) || (image === images.length-1 && indx === 0 )) {
			container.css('left', newX);
		} else {

			//animate the UL to its new position
			container.animate(
				{left: newX}, transitionTime
			);
		}
	}	
	
	image = indx;
}