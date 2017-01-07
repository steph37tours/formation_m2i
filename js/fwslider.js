var videoSupport = !!document.createElement('video').canPlayType;
var dpInt;

jQuery.fn.fwSlider = function(fade_speed,pause) {	
	'use strict';

	var i = 0; //curr index
	var actr = 0;
	
	if(!fade_speed){fade_speed = 800;}else{fade_speed = parseInt(fade_speed);} 
	if(!pause){pause = 5000;}else{pause = parseInt(pause);} 		
		
	var this_div = jQuery(this);
	var videoLayer;
	
	
	//CHECK HTML5 VIDEO SUPPORT - IF NOT SUPPORTED, REMOVE VIDEO LAYERS
		if(!videoSupport){		
			jQuery('.video',this_div).remove();		
		}else{			
		//pause all video
			var videoEl = jQuery('.video video')[0];
			if(videoEl){
				videoEl.pause();		
			}
		}
		

	//COUNT/PREPARE LAYERS
		var dp_fws_imgs = jQuery('.layer',this_div).length;	
		jQuery('.layer',this_div).last().addClass('active first');
		jQuery('.layer',this_div).first().addClass('last');
		if(jQuery('.layer.first',this_div).hasClass('video')){			
			jQuery('.layer.first',this_div).find('video').get(0).play();
		}		
		if(dp_fws_imgs < 1){
			jQuery('.dp_fws_arrows',this_div).remove();		
		}
	
	//REMOVE LOADING
		jQuery('.loading',this_div).fadeOut(700);
	
	//ROTATING FUNCTION
		var change = function(){												
				if(jQuery('.layer.active',this_div).hasClass('last')){
				//on last item fade in the 1st
					//video control - if next layer is video start playing it
						if(jQuery('.layer.first',this_div).hasClass('video')){
							videoLayer = jQuery('.layer.first',this_div).find('video').get(0);
							if(videoLayer.videoHeight != 0){
								videoLayer.currentTime = 0;									
								videoLayer.play();				
							}	
						}else{
							videoLayer = null;						
						}
				
					//video control - if current layer is video, pause it
						if(jQuery('.layer.active',this_div).hasClass('video')){
							jQuery('.layer.active',this_div).find('video').get(0).pause();							
						}
						
					//fade to first slide
						jQuery('.layer.first',this_div).animate({'opacity':'1'},{ queue: false, duration: fade_speed, complete: function(){
								jQuery('.layer.last',this_div).removeClass('active');
								jQuery('.layer.first',this_div).addClass('active');
								jQuery('.layer',this_div).css('opacity','1');
							}
						});
					
				}
				else{
				//fade out current slide					
					//video control - if next layer is video start playing it
						if(jQuery('.layer.active',this_div).prev('.layer').hasClass('video')){
							videoLayer = jQuery('.layer.active',this_div).prev('.layer').find('video').get(0);			 
							if(videoLayer.videoHeight != 0){
								videoLayer.currentTime = 0;									
								videoLayer.play();				
							}							
							//console.log('start video');
						}else{
							videoLayer = null;
						}
						
					//video control - if current layer is video, pause it
						if(jQuery('.layer.active',this_div).hasClass('video')){
							jQuery('.layer.active',this_div).find('video').get(0).pause();
							//console.log('stop video');
						}
						
					//fade to next slide					
						jQuery('.layer.active',this_div).animate({'opacity':'0'},{ queue: false, duration: fade_speed, complete: function(){																	
								jQuery('.layer.active',this_div).removeClass('active').prev('.layer').addClass('active');															
							}
						});
						
				}												
		};
		
	//START THE LOOP
		if(dp_fws_imgs > 1){	//start only if we have more than 1 image
			dpInt = setInterval(change, pause);		//start the loop
		}
	
	
	//NAVIGATION ARROWS
		//NEXT
		jQuery(document).on('click','#dp-fw-slider .arrow-right',function(){
			change();
			
			if(dp_fws_imgs > 1){
				clearInterval(dpInt);
				dpInt = setInterval(change, pause);
			}			
		});
		
		//PREV
		jQuery(document).on('click','#dp-fw-slider .arrow-left',function(){			
			if(jQuery('.layer.active',this_div).hasClass('first')){
			//if current slide is first, go to last slide
				
				//if .last slide is video, start playing it
					if(jQuery('.layer.last',this_div).hasClass('video')){
						videoLayer = jQuery('.layer.last',this_div).find('video').get(0);			 
						if(videoLayer.videoHeight != 0){
							videoLayer.currentTime = 0;									
							videoLayer.play();				
						}	
					}else{
						videoLayer = null;
					}
				
				jQuery('.layer',this_div).not('.first,.last').css('opacity','0');				
				jQuery('.layer.first',this_div).animate({'opacity':'0'},{ queue: false, duration: fade_speed, complete: function(){
						jQuery('.layer.first',this_div).removeClass('active');
						jQuery('.layer.last',this_div).addClass('active');						
					}
				});
			
			}else{
			//else: fade in prev (next in line) slide
				//if prev slide is video, start playing it
					if(jQuery('.layer.active',this_div).next('.layer').hasClass('video')){
						videoLayer = jQuery('.layer.active',this_div).next('.layer').find('video').get(0);			 
						if(videoLayer.videoHeight != 0){
							videoLayer.currentTime = 0;									
							videoLayer.play();				
						}	
					}else{
						videoLayer = null;
					}
			
				jQuery('.layer.active',this_div).next('.layer').animate({'opacity':'1'},{ queue: false, duration: fade_speed, complete: function(){																	
						jQuery('.layer.active',this_div).removeClass('active').next('.layer').addClass('active');							
					}
				});		
			}
			
			
			if(dp_fws_imgs > 1){
				clearInterval(dpInt);
				dpInt = setInterval(change, pause);
			}			
		});
		
};