jQuery(function($) {
	"use strict";
	
		 $('[data-toggle="tooltip"]').tooltip();
		 $('[data-toggle="popover"]').popover();
			 
		/**
		 * STICKY MENU
		  */
		$(window).scroll(function() {
		if ($(this).scrollTop() > 102){  
			$('.wrapper').addClass("sticky");
		  }
		  else{
			$('.wrapper').removeClass("sticky");
		  }
		});
		
		 
		 /**
		 * package trip fact
		 */
		$(document).ready(function() {
			$( "#hider" ).click(function() {
			 $( ".hide_more" ).slideUp(200);
			});
			$(function() {        
			  $(".click").click(function() {
				 $( ".trip-fact" ).toggleClass( 'active' ); 
			  });
			});
			$( "#shower" ).click(function(){
			  $( ".hide_more" ).slideDown(300);
			});
		});
		
		/**
		 * Initialization of owl Carousel
		 */
		$(document).ready(function() {
				//Featured Reviews
				var owl = $("#review-list");
				  owl.owlCarousel({
						items : 1,
						navigation : true,
						singleItem : true,
					 });	
					 
				});
			 
 },'jQuery');

jQuery(function($) {
	/**
	 * Sticky Header
	 */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 0){
			$('.wrap').addClass("sticky");
		}
		else{
			$('.wrap').removeClass("sticky");
		}
	});

	/**
	 *kEY sEARCH
	 */
	$(document).ready(function() {
		$('.search').click(function(){
			$(this).toggleClass('in');
			$('.key-search').toggleClass('active');
		});
	});

},'jQuery');


$(document).ready(function(e) {

	$('.site-search i').click(function(){
		$('.site-search').toggleClass('in');
		$('.key-search').toggleClass('active');
	});


	var page_right_width=$('.right-page').width();
	$('.natural').css('width',page_right_width + 'px');

	$(window).resize(function() {
		var page_right_width=$('.right-page').width();
		$('.natural').css('width',page_right_width + 'px');
	});


});
//site search
$(document).ready(function() {
	$('.add').click(function(){
		$('.site-search').addClass('search-active');
	});
	$(document).click(function (e) {
		if (!$(e.target).hasClass("add")
			&& $(e.target).parents(".site-search").length === 0)
		{
			$(".site-search").removeClass('search-active');
		}
	});
});
$(document).ready(function(){
	
	$('#advanced_search').bind('click', function() {
		var destination = $("#destination").val();
		if(destination==''){
			alert('Please select your destination');
			return false;
		}
		url = base_url+'advance_search.html?';
		var activity  = $("#activities").val();
		var days      = $("#days").val().split('_');
		if(activity==''){
			alert('Please select one activity');
			return false;
		}
		if(days==''){
			alert('Please select day(s)');
			return false;
		}
		if (destination) {
			url += '&destination=' + encodeURIComponent(destination);
		}
		if (activity) {
			url += '&activity=' + encodeURIComponent(activity);
		}
		if (days) {
			url += '&days_from=' + encodeURIComponent(days[0])+'&days_to='+encodeURIComponent(days[1]);
		}
		location = url.replace("&","");
		return false;
	});
	/********* display tripinfo ************/
	$(".view_info").click(function () {
		var info_id = $(this).attr('id');
		$.ajax({
			type : "POST",
			url    : base_url+"get_info",
			data   : "info_id="+info_id+"&action=getinfo",
			success:function(msg){
				if(msg!='no'){
					$("#mycontent").html(msg);
					$("#myModal").modal('show');
				}else{
					$("#mycontent").html("Error! while retrieving data");
					$("#myModal").modal('show');
				}
			},
			beforeSend:function(){
				$("#divloader").modal('show');
			},
			complete:function(){
				$("#divloader").modal('hide');
			},
			error:function(){
				//show some error message
			}
		});
	});
	$("#view_equipments").click(function () {
		var package_id = $(this).attr('rel');
		$.ajax({
			type : "POST",
			url    : base_url+"get_equipment",
			data   : "package_id="+package_id+"&action=getinfo",
			success:function(msg){
				if(msg!='no'){
					$("#mycontent").html(msg);
					$("#myModal").modal('show');
				}else{
					$("#mycontent").html("Error! while retrieving data");
					$("#myModal").modal('show');
				}
			},
			beforeSend:function(){
				$("#divloader").modal('show');
			},
			complete:function(){
				$("#divloader").modal('hide');
			},
			error:function(){
				//show some error message
			}
		});
	});

	$("#termsncondition").on("click",function(){
		$.ajax({
			type : "POST",
			url    : base_url+"get_terms",
			data   : "action=getTerms",
			success:function(msg){
				if(msg!='no'){
					$("#mycontent").html(msg);
					$("#myModal").modal('show');
				}else{
					$("#mycontent").html("Error! while retrieving data");
					$("#myModal").modal('show');
				}
			},
			beforeSend:function(){
				$("#divloader").modal('show');
			},
			complete:function(){
				$("#divloader").modal('hide');
			}
		});
	});

});



function get_activities(category){
	var category = category
	if(category!=''){
		$.ajax({
			type:"POST",
			url:base_url+"get_activities",
			data:"category="+category,
			success: function(msg){
				$("#activities").html(msg);
			},
			beforeSend:function(){
				$("#divloader").modal('show');
			},
			complete:function(){
				$("#divloader").modal('hide');
			},
			error:function(){
				//show some error message
			}
		});
	}
}

function add_news_letter(){
	var email 		= $("#news_email").val();
	var fullname 	= $("#news_full").val();
	$.ajax({
		type:"POST",
		url:base_url+"add_news_letter",
		data:"fullname="+fullname+"&email="+email+"&action=adduser",
		success: function(msg){
			if(msg.trim()=='yes'){
				$("#news_email").val('');
				$("#news_full").val('');
				alert('Thank you for subscribing our newsletter');
			}else{
				alert(msg);
			}
		},
		beforeSend:function(){
			$("#divloader").modal('show');
		},
		complete:function(){
			$("#divloader").modal('hide');
		},
		error:function(){
			//show some error message
		}
	});
}

function PrintDetails(){
	try{
		var oIframe = document.getElementById('ifrmPrint');
		var oContent = document.getElementById('printme').innerHTML;
		var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
		if (oDoc.document) oDoc = oDoc.document;
		oDoc.write("<html><head><title>Print Me</title>");
		oDoc.write("<link href=\"<?php echo base_url();?>themes/css/print.css\" rel=\"stylesheet\" media=\"print\" />");
		oDoc.write("</head><body onload='this.focus(); this.print();'>");
		oDoc.write(oContent + "</body></html>");
		oDoc.close();
	}
	catch(e){
		self.print();
	}

}