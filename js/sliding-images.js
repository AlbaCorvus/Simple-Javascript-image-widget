$(function(){
var imageHolder=document.getElementsByClassName('sub-image-holder')[0]; // define variables from dom objects sub-image-holder (div)
var parentImage=document.getElementsByClassName('image-holder')[0];  // define variables from dom object image-holder (div)
var firstImage=imageHolder.querySelector('img'); // grab the first image in imageHolder querySelector returns only the first instance it finds
var timer; // timer variable global declaration this will be reset and initialised on every 'click'

$(firstImage).addClass('active');
$(parentImage).css({'background-image':'url('+firstImage.src+')'});
var images=imageHolder.querySelectorAll('img'); // get NodeList of image objects
var imageArr=Array.prototype.slice.call(images); // convert NodeList to Array object querySelector returns NodeList which does not support indexOf()


function activeImage(e){ // declare function activeImage takes param e which is passed from EventListener
var els=document.querySelectorAll('img.active'); // grab the img element who's class is set to active (above I have set this to the first image in images[]) line 7
var target =e.target || e.srcElement; // set variable for target element i.e. the element the event has been triggered on
var parentTarget=target.parentNode; // get elements parent node in this case sub-image-holder
var targetGrandparent=parentTarget.parentNode; // get parent nodes - > parent node i.e. images GrandParent node.

if(els.length>0){ // conditional statement testing that at least 1 image has class active set
var previous=els[0]; // set variable to this image because we know only one image will ever be active we can say els[0] is that element
$(previous).removeClass('active'); // remove active class from previous image
}


$(target).addClass('active'); // add active class to target element (the element a user has clicked on)
$(targetGrandparent).css({'background-image':'url('+target.src+')'}); // set background image of grandParent element to the same url as the target image clicked
cycleImages(); // call cycleImages() because we want to reset the timer after we manually change image if no action is taken by the user cycleImage will rotate through all images
               // by itself one image every four seconds so when we click we say reset timer to 4 seconds and go again

}


function cycleImages(){ // declare function cycleImages
clearInterval(timer); // reset interval on timer to 4 seconds
timer=setInterval(function(){ // set global var timer to anonymous function with Interval of 4 seconds

var currentImage=imageHolder.querySelector('img.active'); // first thing done find active image in imageHolder

if(imageArr.indexOf(currentImage)<images.length-1){ // conditional statement finds index of currentImage and validates against (images.length-1) because array length 3 means last element is
                                                    // indexed at arr[2] so we subtract 1 from the length value

$(currentImage).removeClass('active');  // remove class active from currentImage
var index=imageArr.indexOf(currentImage); //grab index of image we remover active class from
$(images[index+1]).addClass('active'); // increase index by 1 and add class active to that image
$(targetParent).css({'background-image':'url('+images[index+1].src+')'}); // change background of target parent to url of new active image

}else{ // else we are at the last image in the array
$(currentImage).removeClass('active'); // currentImage remove active class same as above

current=images[0]; // set current to images[0] as in first image in array
$(current).addClass('active'); // add active class to this image
$(targetParent).css({'background-image':'url('+images[currentIndex].src+')'}); // set background of parent to this url src
}

},4000); // set delay on function to 4000 milliseconds (4 seconds)

} // end function cycleImages




if(imageHolder.addEventListener){ // add event listener to imageHolder this is the images parent container by adding to the parent we get to inherit this action on child nodes
                                  // we put the addEventListener in a conditional statement in case it is not supported mainly for IE < 8
imageHolder.addEventListener('click',function(e){ // if it is supported add anonymous function on 'click' and pass (e) to activeImage(e) function

activeImage(e); // calls our activeImage function with e -> event from clicked element we will get the identity of this element through e.target || e.srcElement
},false);

}else{ // addEventListener is not supported
imageHolder.attachEvent('onclick',function(e){ // use old version attachEvent to accomplish the same thing 'onclick' call anonymous function(e) pass to activeImage(e)
activeImage(e);
});
}

cycleImages() // at the very end we call cycleImages() to kick start the automatic rotation of images if we didn't write this here nothing would happen until a user clicked on
              // an image then and only then would would the images cycle automatically so we start it ourselves and reset on click of image

}); // end parent function that runs when page ready $(function(){});



