/*.....................functions......................*/



(function($){  



  



    $.fn.extend({   







        filter_input: function(options) {







          var defaults = {  



              regex:".",



              negkey: false, // use "-" if you want to allow minus sign at the beginning of the string



              live:false,



              events:'keypress paste'



          }  



                



          var options =  $.extend(defaults, options);  



          



          function filter_input_function(event) {







            var input = (event.input) ? event.input : $(this);



            if (event.ctrlKey || event.altKey) return;



            if (event.type=='keypress') {







              var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;







              // 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete



              if (key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46) {







                // if charCode = key & keyCode = 0



                // 35 = #, 36 = $, 37 = %, 39 = ', 46 = .



         



                if (event.charCode == 0 && event.keyCode == key) {



                  return true;                                             



                }



              }



              var string = String.fromCharCode(key);



              // if they pressed the defined negative key



              if (options.negkey && string == options.negkey) {



                // if there is already one at the beginning, remove it



                if (input.val().substr(0, 1) == string) {



                  input.val(input.val().substring(1, input.val().length)).change();



                } else {



                  // it isn't there so add it to the beginning of the string



                  input.val(string + input.val()).change();



                }



                return false;



              }



              var regex = new RegExp(options.regex);



            } else if (event.type=='paste') {



              input.data('value_before_paste', event.target.value);



              setTimeout(function(){



                filter_input_function({type:'after_paste', input:input});



              }, 1);



              return true;



            } else if (event.type=='after_paste') {



              var string = input.val();



              var regex = new RegExp('^('+options.regex+')+$');



            } else {



              return false;



            }







            if (regex.test(string)) {



              return true;



            } else if (typeof(options.feedback) == 'function') {



              options.feedback.call(this, string);



            }



            if (event.type=='after_paste') input.val(input.data('value_before_paste'));



            return false;



          }



          



          var jquery_version = parseFloat(jQuery.fn.jquery.split('.')[0]+'.'+jQuery.fn.jquery.split('.')[1]);



          if (options.live) {



            if (jquery_version >= 1.7) {



              $(this).on(options.events, filter_input_function); 



            } else {



              $(this).live(options.events, filter_input_function); 



            }



          } else {



            return this.each(function() {  



              var input = $(this);



              if (jquery_version >= 1.7) {



                input.off(options.events).on(options.events, filter_input_function);



              } else {



                input.unbind(options.events).bind(options.events, filter_input_function);



              }



            });  



          }



          



        }  



    });  



      



})(jQuery); 











function UserNameKeyUp() {







	var username = $.trim($('#username').val());



	if(username != '') {		



		$('#username').removeClass('input_error');



		$('#usernameErrorMsg').hide();



	}



}







function Title() {



	



	var title = $.trim($('#title').val());



	var jazz = 0;



	if(title == '') {		



		$('#title').addClass('input_error'); jazz = 1;



		$('#error_msg_title').fadeIn().html('Please enter title');



		$('#title').focus();



	} else {



		$('#title').removeClass('input_error');



		$('#error_msg_title').hide();



	}



	return jazz;



}















function Code() {



	



	var code = $.trim($('#code').val());



	var jazz = 0;



	if(code == '') {		



		$('#code').addClass('input_error'); jazz = 1;



		$('#code').focus();



	} else {



		$('#code').removeClass('input_error');



	}



	return jazz;



}







function CouponType() {



	



	var jazz = 0;



	var coupon = $('#coupon_type').val();



	



	if(coupon == 0) {		



		$('#coupon_type').addClass('input_error'); jazz = 1;



		$('#coupon_type').focus();



	} else {



		$('#coupon_type').removeClass('input_error');



	}



	return jazz;



}















function NumberTimes() {



	



	var jazz = 0;



	var numberTimes = $('#numberTimes').val();



	if(numberTimes == 0) {		



		$('#numberTimes').addClass('input_error'); jazz = 1;



		$('#numberTimes').focus();



	} else {



		$('#numberTimes').removeClass('input_error');



	}



	return jazz;



}







function NumberUsers() {



	



	var jazz = 0;



	var numberUsers = $('#numberUsers').val();



	if(numberUsers == 0) {		



		$('#numberUsers').addClass('input_error'); jazz = 1;



		$('#numberUsers').focus();



	} else {



		$('#numberUsers').removeClass('input_error');



	}



	return jazz;



}







function DiscountTpye() {



	



	var jazz = 0;



	var discount = $('#discount_type').val();



	if(discount == 0) {		



		$('#discount_type').addClass('input_error'); jazz = 1;



		$('#discount_type').focus();



	} else {



		$('#discount_type').removeClass('input_error');



	}



	return jazz;



}







function Discount() {



	



	var jazz = 0;



	var discount = $.trim($('#discount').val());



	var discount_type = $('#discount_type').val();



	if(discount == '') {



				



		$('#discount').addClass('input_error'); jazz = 1;



		$('#discount').focus();



		



	} else if(discount_type == 2){



		



		if(discount > 100){



			



		$('#discount').addClass('input_error'); jazz = 1;



		$('#discount').focus();



		



	}



	}else {		



		



		$('#discount').removeClass('input_error');



	}



	return jazz;



}







function Expiry() {



	



	var date = $.trim($('#expiry').val());



	var jazz = 0;



	if(date == '') {		



		$('#expiry').addClass('input_error'); jazz = 1;



	} else {



		$('#expiry').removeClass('input_error');



	}



	return jazz;



}







function Commission() {



	



	var jazz = 0;



	var commission = $.trim($('#commission').val());



	if(commission == '') {		



		$('#commission').addClass('input_error'); jazz = 1;



		$('#commission').focus();



	} else {		



		$('#commission').removeClass('input_error');



	}



	return jazz;



}







function Comment() {



	



	var jazz = 0;



	var comment = $.trim($('#comment').val());



	if(comment == '') {		



		$('#comment').addClass('input_error'); jazz = 1;



		$('#commiscommentsion').focus();



	} else {		



		$('#comment').removeClass('input_error');



	}



	return jazz;



}







function CompanyName() {



	



	var jazz = 0;



	var companyname = $.trim($('#company_name').val());



	if(companyname == '') {		



		$('#company_name').addClass('input_error'); jazz = 1;



		$('#company_name').focus();



	} else {		



		$('#company_name').removeClass('input_error');



	}



	return jazz;



}







function CompanyAddress() {



	



	var jazz = 0;



	var address = $.trim($('#company_address').val());



	if(address == '') {		



		$('#company_address').addClass('input_error'); jazz = 1;



		$('#company_address').focus();



	} else {		



		$('#company_address').removeClass('input_error');



	}



	return jazz;



}











function UserName() {



	



	var jazz = 0;



	var username = $.trim($('#username').val());



	if(username == '') {		



		$('#username').addClass('input_error'); jazz = 1;



		$('#usernameErrorMsg').fadeIn().html('Please enter your username');



		$('#username').focus();



	} else {		



		$('#username').removeClass('input_error');



		$('#error_msg_username').fadeOut();



	}



	return jazz;



}







function Description() {



	



	var jazz = 0;



	var username = $.trim($('#description').val());



	if(username == '') {		



		$('#description').addClass('input_error'); jazz = 1;



		$('#description').focus();



	} else {		



		$('#description').removeClass('input_error');



	}



	return jazz;



}











 



function EmailKeyUp() {



	var email = $('#email').val();



	if(email != '') {	



		$('#email').removeClass('input_error');



		$('#emailErrorMsg').hide();



	}



}



function RagisterEmail() {



	var email = $('#registration_email').val();



	if(email == '') {	



		$('#registration_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#registration_email').removeClass('input_error');



		} else {



			$('#registration_email').addClass('input_error');



		}



	}



}







function InvoiceEmail() {



	var email = $('#invoice_email').val();



	if(email == '') {	



		$('#invoice_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#invoice_email').removeClass('input_error');



		} else {



			$('#invoice_email').addClass('input_error');



		}



	}



}







function InterestEmail() {



	var email = $('#interest_email').val();



	if(email == '') {	



		$('#interest_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#interest_email').removeClass('input_error');



		} else {



			$('#interest_email').addClass('input_error');



		}



	}



}







function DocumentsEmail() {



	var email = $('#documents_email').val();



	if(email == '') {	



		$('#documents_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#documents_email').removeClass('input_error');



		} else {



			$('#documents_email').addClass('input_error');



		}



	}



}







function AnnouncementsEmail() {



	var email = $('#announcements_email').val();



	if(email == '') {	



		$('#announcements_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#announcements_email').removeClass('input_error');



		} else {



			$('#announcements_email').addClass('input_error');



		}



	}



}







function ContactEmail() {



	var email = $('#contact_email').val();



	if(email == '') {	



		$('#contact_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#contact_email').removeClass('input_error');



		} else {



			$('#contact_email').addClass('input_error');



		}



	}



}







function ContactAdminEmail() {



	var email = $('#contact_admin_email').val();



	if(email == '') {	



		$('#contact_admin_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#contact_admin_email').removeClass('input_error');



		} else {



			$('#contact_admin_email').addClass('input_error');



		}



	}



}







function FeedbackEmail() {



	var email = $('#feedback_email').val();



	if(email == '') {	



		$('#feedback_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#feedback_email').removeClass('input_error');



		} else {



			$('#feedback_email').addClass('input_error');



		}



	}



}







function LeadsEmail() {



	var email = $('#leads_email').val();



	if(email == '') {	



		$('#leads_email').addClass('input_error');



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		if(filter.test(email)){



			$('#leads_email').removeClass('input_error');



		} else {



			$('#leads_email').addClass('input_error');



		}



	}



}







function Email() {	



	var jazz = 0;	



	var email = $('#email').val();



	if(email == '') {	



		$('#email').addClass('input_error'); jazz = 1;



		$('#emailErrorMsg').fadeIn().html('Please enter your email address');



		$('#email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#email').removeClass('input_error');



			$('#emailErrorMsg').hide();



		} else {



			$('#email').addClass('input_error'); jazz = 1;



			$('#emailErrorMsg').fadeIn().html('Please enter your correct email address');



			$('#email').focus();



		}



	}



	return jazz;



}







function RegEmail() {	



	var jazz = 0;	



	var email = $('#registration_email').val();



	if(email == '') {	



		$('#registration_email').addClass('input_error'); jazz = 1;



		$('#registration_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#registration_email').removeClass('input_error');



		} else {



			$('#registration_email').addClass('input_error'); jazz = 1;



			$('#registration_email').focus();



		}



	}



	return jazz;



}







function InvoEmail() {	



	var jazz = 0;	



	var email = $('#invoice_email').val();



	if(email == '') {	



		$('#invoice_email').addClass('input_error'); jazz = 1;



		$('#invoice_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#invoice_email').removeClass('input_error');



		} else {



			$('#invoice_email').addClass('input_error'); jazz = 1;



			$('#invoice_email').focus();



		}



	}



	return jazz;



}







function IntEmail() {	



	var jazz = 0;	



	var email = $('#interest_email').val();



	if(email == '') {	



		$('#interest_email').addClass('input_error'); jazz = 1;



		$('#interest_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#interest_email').removeClass('input_error');



		} else {



			$('#interest_email').addClass('input_error'); jazz = 1;



			$('#interest_email').focus();



		}



	}



	return jazz;



}







function DocEmail() {	



	var jazz = 0;	



	var email = $('#documents_email').val();



	if(email == '') {	



		$('#documents_email').addClass('input_error'); jazz = 1;



		$('#documents_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#documents_email').removeClass('input_error');



		} else {



			$('#documents_email').addClass('input_error'); jazz = 1;



			$('#documents_email').focus();



		}



	}



	return jazz;



}







function AnnEmail() {	



	var jazz = 0;	



	var email = $('#announcements_email').val();



	if(email == '') {	



		$('#announcements_email').addClass('input_error'); jazz = 1;



		$('#announcements_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#announcements_email').removeClass('input_error');



		} else {



			$('#announcements_email').addClass('input_error'); jazz = 1;



			$('#announcements_email').focus();



		}



	}



	return jazz;



}







function ConEmail() {	



	var jazz = 0;	



	var email = $('#contact_email').val();



	if(email == '') {	



		$('#contact_email').addClass('input_error'); jazz = 1;



		$('#contact_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#contact_email').removeClass('input_error');



		} else {



			$('#contact_email').addClass('input_error'); jazz = 1;



			$('#contact_email').focus();



		}



	}



	return jazz;



}







function ConAdmEmail() {	



	var jazz = 0;	



	var email = $('#contact_admin_email').val();



	if(email == '') {	



		$('#contact_admin_email').addClass('input_error'); jazz = 1;



		$('#contact_admin_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#contact_admin_email').removeClass('input_error');



		} else {



			$('#contact_admin_email').addClass('input_error'); jazz = 1;



			$('#contact_admin_email').focus();



		}



	}



	return jazz;



}







function FeedEmail() {	



	var jazz = 0;	



	var email = $('#feedback_email').val();



	if(email == '') {	



		$('#feedback_email').addClass('input_error'); jazz = 1;



		$('#feedback_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#feedback_email').removeClass('input_error');



		} else {



			$('#feedback_email').addClass('input_error'); jazz = 1;



			$('#feedback_email').focus();



		}



	}



	return jazz;



}







function LeadEmail() {	



	



	var jazz = 0;	



	var email = $('#leads_email').val();



	if(email == '') {	



		$('#leads_email').addClass('input_error'); jazz = 1;



		$('#leads_email').focus();



	} else {		



		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;



		//if it's valid username



		if(filter.test(email)){



			$('#leads_email').removeClass('input_error');



		} else {



			$('#leads_email').addClass('input_error'); jazz = 1;



			$('#leads_email').focus();



		}



	}



	return jazz;



}







/************** Title **************/



















function TitleBlur() {



	var title = $.trim($('#title').val());



	if(title == '') {	



		$('#title').addClass('input_error');



		$('#error_msg_title').fadeIn().html('Please enter title');



	} else {	



		$('#title').removeClass('input_error');



		$('#error_msg_title').hide();



	}



}







function TitleKeyUp() {



	var title = $.trim($('#title').val());



	if(title == '') {	



		$('#title').addClass('input_error');



		$('#error_msg_title').fadeIn().html('Please enter title');



	} else {	



		$('#title').removeClass('input_error');



		$('#error_msg_title').hide();



	}



}







 



/************** First Name **************/



function FirstNameBlur() {



	var first_name = $.trim($('#first_name').val());



	if(first_name == '') {	



		$('#first_name').addClass('input_error');



		$('#first_nameErrorMsg').fadeIn().html('Please enter your first name');



	} else {	



		$('#first_name').removeClass('input_error');



		$('#first_nameErrorMsg').hide();



	}



}







function FirstNameKeyUp() {



	var first_name = $.trim($('#first_name').val());



	if(first_name != '') {	



		$('#first_name').removeClass('input_error');



		$('#first_nameErrorMsg').hide();



	}



}







function FirstName() {



	var first_name = $.trim($('#first_name').val());



	var jazz = 0;



	if(first_name == '') {		



		$('#first_name').addClass('input_error'); jazz = 1;



		$('#first_nameErrorMsg').fadeIn().html('Please enter your first name');



		$('#first_name').focus();



	} else {



		$('#first_name').removeClass('input_error');



		$('#first_nameErrorMsg').hide();



	}



	return jazz;



}







/************** Last Name **************/



function LastNameBlur() {



	var last_name = $.trim($('#last_name').val());



	if(last_name == '') {	



		$('#last_name').addClass('input_error');



		$('#last_nameErrorMsg').fadeIn().html('Please enter your last name');



	} else {	



		$('#last_name').removeClass('input_error');



		$('#last_nameErrorMsg').hide();



	}



}







function LastNameKeyUp() {



	var last_name = $.trim($('#last_name').val());



	if(last_name != '') {	



		$('#last_name').removeClass('input_error');



		$('#last_nameErrorMsg').hide();



	}



}







function LastName() {







	var jazz = 0;



	var last_name = $.trim($('#last_name').val());



	if(last_name == '') {		



		$('#last_name').addClass('input_error'); jazz = 1;



		$('#last_nameErrorMsg').fadeIn().html('Please enter your last name');



		$('#last_name').focus();



	} else {



		$('#last_name').removeClass('input_error');



		$('#last_nameErrorMsg').hide();



	}



	return jazz;



}







/************** Mobile **************/



function MobilePhoneBlur() {



	var mobile = $.trim($('#mobile').val());



	if(mobile != ''){



		



		if (mobile.length >= 11) { 



			$('#mobile').removeClass('input_error');



			SetPhoneNumber();



			$('#mobileErrorMsg').hide();



		}



	}



}



function MobilePhoneKeyUp() {



	var mobile = $.trim($('#mobile').val());



	if(mobile != '') {	



		$('#mobile').removeClass('input_error');



		$('#mobileErrorMsg').hide();



	}



}



function MobilePhone() {



	var jazz = 0;



	var mobile = $.trim($('#mobile').val());



	if(mobile == '') {	



		$('#mobile').addClass('input_error'); jazz = 1;



		$('#mobileErrorMsg').fadeIn().html('Please enter your phone number');



		$('#mobile').focus();



	} else {		



		if (mobile.length >= 11) { 



			$('#mobile').removeClass('input_error');



			SetPhoneNumber();



		} else {



			$('#mobile').addClass('input_error'); jazz = 1;



			$('#mobileErrorMsg').fadeIn().html('Please enter your correct phone number');



			$('#mobile').focus();



		}



	}



	return jazz;



}











function OfficeMobilePhoneBlur() {



	var mobile = $.trim($('#office_phone').val());



	if(mobile == '') {	



		$('#office_phone').addClass('input_error');



	} else {		



		if (mobile.length >= 11) { 



			$('#office_phone').removeClass('input_error');



			SetOfficePhoneNumber();



		} else {



			$('#office_phone').addClass('input_error');



		}



	}



}



function OfficeMobilePhoneKeyUp() {



	var mobile = $.trim($('#office_phone').val());



	if(mobile == '') {	



		$('#office_phone').addClass('input_error');



	} else {		



		if (mobile.length >= 11) { 



			$('#office_phone').removeClass('input_error');



		} else {



			$('#office_phone').addClass('input_error');



		}



	}



}







function PhoneBlur(id) {



	id = '#'+id;



	var mobile = $.trim($(id).val());



	



	if(mobile == '') {	



		$(id).addClass('input_error');



	} else {



			



		if (mobile.length >= 11) { 



			$(id).removeClass('input_error');



			SetExtraPhoneNumber(id);



		} else {



			$(id).addClass('input_error');



		}



	}



}



function PhoneKeyUp(id) {



	id = '#'+id;



	var mobile = $.trim($(id).val());



	if(mobile == '') {	



		$(id).addClass('input_error');



	} else {		



		if (mobile.length >= 11) { 



			$(id).removeClass('input_error');



		} else {



			$(id).addClass('input_error');



		}



	}



}







function SetExtraPhoneNumber(id) {	



	var mobile = $.trim($(id).val());



	$(id).mask("(999) 9999-9999");



	$(id).removeClass('input_error'); 



}







function OfficeMobilePhone() {



	var jazz = 0;



	var mobile = $.trim($('#office_phone').val());



	if(mobile == '') {	



		$('#office_phone').addClass('input_error'); jazz = 1;



		$('#office_phone').focus();



	} else {		



		if (mobile.length >= 11) { 



			$('#office_phone').removeClass('input_error');



			SetOfficePhoneNumber();



		} else {



			$('#office_phone').addClass('input_error'); jazz = 1;



			$('#office_phone').focus();



		}



	}



	return jazz;



}







function SetPhoneNumber() {	



	



	var mobile = $.trim($('#mobile').val());



	$("#mobile").mask("9999 999 9999");



	$('#mobile').removeClass('input_error'); 







}







function SetOfficePhoneNumber() {		



	var mobile = $.trim($('#office_phone').val());



	$("#office_phone").mask("(999) 9999-9999");



	$('#office_phone').removeClass('input_error'); 



}







/************** City **************/



function CityBlur() {



	var city = $.trim($('#city').val());



	if(city == '') {	



		$('#city').addClass('input_error');



		$('#cityErrorMsg').fadeIn().html('Please enter your city');



	} else {		



		$('#city').removeClass('input_error');



		$('#cityErrorMsg').hide();



	}



}



function CityKeyUp() {



	var city = $.trim($('#city').val());



	if(city != '') {	



		$('#city').removeClass('input_error');



		$('#cityErrorMsg').hide();



	}



}



function City() {



	var jazz = 0;



	var city = $.trim($('#city').val());



	if(city == '') {	



		$('#city').addClass('input_error'); jazz = 1;



		$('#city').focus();



		$('#cityErrorMsg').fadeIn().html('Please enter your city');



	} else {



		$('#city').removeClass('input_error');	



	}



	return jazz;



}















/************** Zip Code **************/



function ZipCodeBlur() {



	var zip_code = $.trim($('#zip_code').val());



	if(zip_code=='') {	



		$('#zip_code').addClass('input_error');



		$('#zip_codeErrorMsg').fadeIn().html('Please enter your zip code');



	} else {		



		if($('#country_id').val() == '1') {	



			if (zip_code.length == 6) { 



				$('#zip_code').removeClass('input_error');



				$('#zip_codeErrorMsg').hide();



			} else {



				$('#zip_code').addClass('input_error');



				$('#zip_codeErrorMsg').fadeIn().html('Please enter your correct zip code');



				



			}



		} else {



			if (zip_code.length == 6) { 



				$('#zip_code').removeClass('input_error');



				$('#zip_codeErrorMsg').hide(); 



			} else {



				$('#zip_code').addClass('input_error');



				$('#zip_codeErrorMsg').fadeIn().html('Please enter your correct zip code');



			}



		}



	}



}



function ZipCodeKeyUp() {



	var zip_code = $.trim($('#zip_code').val());



	if(zip_code!='') {	



		$('#zip_code').removeClass('input_error');



		$('#zip_codeErrorMsg').hide(); 



	}



}



function ZipCode() {



	var jazz = 0;



	var zip_code = $.trim($('#zip_code').val());



	if(zip_code == '') {		



		$('#zip_code').addClass('input_error'); jazz = 1;



		$('#zip_code').focus();



		$('#zip_codeErrorMsg').fadeIn().html('Please enter your zip code');



	} else {		



			if (zip_code.length == 6 || zip_code.length == 5) { 



				$('#zip_code').removeClass('input_error'); 



			} else {



				$('#zip_code').addClass('input_error'); jazz = 1;



				$('#zip_codeErrorMsg').fadeIn().html('Please enter your correct zip code');



			}	



	}



	return jazz;



}







/************** Password **************/



function OldPasswordKeyUp() {



	var password = $.trim($('#old_password').val());



	if(password != '') {		



		$('#old_password').removeClass('input_error');



		$('#old_passwordErrorMsg').hide();



	}



}







function PasswordBlur(){



	var password = $.trim($('#password').val());



	if(password == '') {		



		$('#password').addClass('input_error');



		$('#passwordErrorMsg').fadeIn().html('Please enter your password');



	} else {



		var getResponse = CheckStrength(password);



		if(getResponse == 'TooShort') {



			var setText = 'Minimum 10 characters';



			$('#password').addClass('input_error');



		} else if(getResponse == 'Weak') {



			var setText = 'Weak';



			$('#password').addClass('input_error');



		} else if(getResponse == 'Good') {



			var setText = 'Good';



			$('#password').addClass('input_error');



		} else if(getResponse == 'Strong') {



			var setText = '';



			$('#password').removeClass('input_error');



		}	



		$('#result').html(setText);



		$('#passwordErrorMsg').hide();



	}



}







function PasswordKeyUp() { 







	var password = $.trim($('#password').val());



	



	if(password != '') {		



		$('#password').removeClass('input_error');



		$('#passwordErrorMsg').hide();



		



		var getResponse = CheckStrength(password);



		if(getResponse == 'TooShort') {



			var setText = 'Minimum 10 characters';



			$('#password').addClass('input_error');



		} else if(getResponse == 'Weak') {



			var setText = 'Weak';



			$('#password').addClass('input_error');



		} else if(getResponse == 'Good') {



			var setText = 'Good';



			$('#password').addClass('input_error');



		} else if(getResponse == 'Strong') {



			var setText = '';



			$('#password').removeClass('input_error');



		}	



		$('#result').html(setText);



		$('#passwordErrorMsg').hide();



	}







}







function Password(){



	var jazz = 0;



	var password = $.trim($('#password').val());



	if(password == '') {



				



		$('#password').addClass('input_error'); jazz = 1;



		$('#passwordErrorMsg').fadeIn().html('Please enter your password');



		$('#password').focus();



		



	} else {



		



		var getResponse = CheckStrength(password);



		



		if(getResponse == 'TooShort') {



			var setText = 'Minimum 10 characters';



			$('#password').addClass('input_error'); jazz = 1;



			$('#password').focus();



		} else if(getResponse == 'Weak') {



			var setText = 'Weak';



			$('#password').addClass('input_error'); jazz = 1;



			$('#password').focus();



		} else if(getResponse == 'Good') {



			var setText = 'Good';



			$('#password').addClass('input_error'); jazz = 1;



			$('#password').focus();



		} else if(getResponse == 'Strong') {



			var setText = '';



			$('#password').removeClass('input_error');



		}



		$('#result').html(setText);



	}



	return jazz;		



}



function PasswordHome(){

	var jazz = 0;

	var password = $.trim($('#password').val());

	if(password == '') {

		$('#password').addClass('input_error'); jazz = 1;
		$('#password_msg').fadeIn().html('Please enter your password');

	} else {

		var getResponse = CheckStrength(password);

		if(getResponse == 'TooShort') {
			
			var setText = 'Minimum 10 characters';
			$('#password').addClass('input_error'); jazz = 1;

		} else if(getResponse == 'Weak') {

			var setText = 'Weak';
			$('#password').addClass('input_error'); jazz = 1;

		} else if(getResponse == 'Good') {

			var setText = 'Good';
			$('#password').addClass('input_error');


		} else if(getResponse == 'Strong') {

			var setText = '';
			$('#password').removeClass('input_error');

		}

		$('#password_msg').html(setText);

	}



	return jazz;		



}



function TutorPasswordHome(){
	var jazz = 0;
	var password = $.trim($('#tutor_password').val());
	if(password == '') {
		$('#tutor_password').addClass('input_error'); jazz = 1;
		$('#tutor_password_error').fadeIn().html('Please enter your password');
	} else {
		var getResponse = CheckStrength(password);
		if(getResponse == 'TooShort') {
			var setText = 'Minimum 10 characters';
			$('#tutor_password').addClass('input_error'); jazz = 1;

		} else if(getResponse == 'Weak') {
			var setText = 'Weak';
			$('#tutor_password').addClass('input_error'); jazz = 1;
		} else if(getResponse == 'Good') {
			var setText = 'Good';
			$('#tutor_password').addClass('input_error');

		} else if(getResponse == 'Strong') {
			var setText = '';
			$('#tutor_password').removeClass('input_error');
		}
		$('#tutor_password_error').fadeIn().html(setText);
	}
	return jazz;		
}


function ChangeNewPassword(){
	var jazz = 0;
	var password = $.trim($('#new_password').val());
	if(password == '') {
		$('#new_password').addClass('input_error'); jazz = 1;
		$('#new_password_msg').fadeIn().html('Please enter your password');
	} else {
		var getResponse = CheckStrength(password);
		if(getResponse == 'TooShort') {
			var setText = 'Minimum 10 characters';
			$('#new_password').addClass('input_error'); jazz = 1;

		} else if(getResponse == 'Weak') {
			var setText = 'Weak';
			$('#new_password').addClass('input_error'); jazz = 1;
		} else if(getResponse == 'Good') {
			var setText = 'Good';
			$('#new_password').addClass('input_error');

		} else if(getResponse == 'Strong') {
			var setText = '';
			$('#new_password').removeClass('input_error');
		}
		$('#new_password_msg').fadeIn().html(setText);
	}
	return jazz;		
}




function CheckStrength(password){





    //initial strength

    var strength = 0



  



    //if the password length is less than 6, return message.



    if (password.length <= 9) {

        $('#result').removeClass()

        $('#result').addClass('short')



        return 'TooShort'



    }



  



    //length is ok, lets continue.



  



    //if length is 8 characters or more, increase strength value



    if (password.length > 9) strength += 1



  



    //if password contains both lower and uppercase characters, increase strength value



    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1



  



    //if it has numbers and characters, increase strength value



    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1



  



    //if it has one special character, increase strength value



    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1



  



    //if it has two special characters, increase strength value



    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) strength += 1



  



    //now we have calculated strength value, we can return messages



  



    //if value is less than 2



    if (strength < 2 ) {



        $('#result').removeClass()



        $('#result').addClass('weak')



        return 'Weak'



    } /*else if (strength == 2 ) {



        $('#result').removeClass()



        $('#result').addClass('good')



        return 'Good'



    }*/ else {



        $('#result').removeClass()



        $('#result').addClass('strong')



        return 'Strong'



    }



}











/************** Confirm Password **************/







function ConfirmPasswordBlur(){



	var confirm_password = $.trim($('#cpass').val());



	var password = $.trim($('#password').val());



	if(confirm_password == ''){	



		$('#cpass').addClass('input_error');



		$('#error_msg_cpass').fadeIn().html('Please enter your confirm password');



	}else{		



		if(confirm_password != password){		



			$('#cpass').addClass('input_error');



			$('#confirmPasswordSpan').fadeIn().html('Passwords did not match');



		}else{			



			$('#cpass').removeClass('input_error');



			$('#confirmPasswordSpan').fadeOut();



		}



		$('#error_msg_cpass').hide();



	}



}



function ConfirmPasswordKeyUp(){



	var confirm_password = $.trim($('#confirmPassword').val());



	var password = $.trim($('#password').val());



	if(confirm_password != ''){	



		$('#confirmPassword').removeClass('input_error');



		$('#confirmPasswordErrorMsg').fadeOut();



	}



}



function ConfirmPassword(){	



	var jazz = 0;



	var confirm_password = $.trim($('#confirmPassword').val());



	var password = $.trim($('#password').val());	



	if(confirm_password == ''){		



		$('#confirmPassword').addClass('input_error'); jazz = 1;



		$('#confirmPasswordErrorMsg').fadeIn().html('Please enter your confirm password');



		$('#cpass').focus();



	}else{		



		if(confirm_password != password){			



			$('#confirmPassword').addClass('input_error'); jazz = 1;



			$('#confirmPasswordErrorMsg').fadeIn().html('Passwords did not match');



			$('#confirmPassword').focus();



		}else{			



			$('#confirmPassword').removeClass('input_error');



		}



	}



	return jazz;



}







/************** Fax Number **************/



function FaxNumberBlur() {



	var fax_number = $.trim($('#fax_number').val());



	if(fax_number != '') {



		if (fax_number.length >= 10) { 



			$('#fax_number').removeClass('input_error');



			SetFaxNumber();



			$('#fax_numberErrorMsg').hide();



		}



	}



}



function FaxNumberKeyUp() {



	var fax_number = $.trim($('#fax_number').val());



	if(fax_number != '') {



		if (fax_number.length >= 10) { 



			$('#fax_number').removeClass('input_error'); 



			$('#fax_numberErrorMsg').hide();



		} else {



			$('#fax_number').addClass('input_error');



			$('#fax_numberErrorMsg').fadeIn().html('Please enter your correct fax number');



		}



	}



}



function FaxNumber() {



	var jazz = 0;	



	var fax_number = $.trim($('#fax_number').val());



	if(fax_number != '') {	 



		if (fax_number.length >= 10) {		



			$('#fax_number').removeClass('input_error'); 



			SetFaxNumber();



		} else {		



			$('#fax_number').addClass('input_error'); jazz = 1;



			$('#fax_number').focus();



			$('#fax_numberErrorMsg').fadeIn().html('Please enter your correct fax number');



		}



	}else{



		$('#fax_number').addClass('input_error'); jazz = 1;



		$('#fax_number').focus();



		$('#fax_numberErrorMsg').fadeIn().html('Please enter your fax number');



	} 



	return jazz;



}



function SetFaxNumber() {
	var fax_number = $.trim($('#fax_number').val());
	$("#fax_number").mask("9999 999 9999");
	$('#fax_number').removeClass('input_error'); 
}

function SetEnqiryPhoneNumber() {
	var subject_enq_phone = $.trim($('#subject_enq_phone').val());
	$("#subject_enq_phone").mask("(999) 999-9999");
	$('#subject_enq_phone').removeClass('input_error'); 
}





/************** Country **************/



function CountryOnChange() {	



	var country_id = $('#country_id').val();	



	if(country_id != '') {		



		$('#country_id').removeClass('input_error');



		$('#country_idErrorMsg').hide();



	}



}



function Country() {



	var jazz = 0;	



	var country_id = $('#country_id').val();



	if(country_id == '') {	



		$('#country_id').addClass('input_error'); jazz = 1;



		$('#country_id').focus();



		$('#country_idErrorMsg').fadeIn().html('Please select country');



	} else {		



		$('#country_id').removeClass('input_error'); 



	}



	return jazz;



}











/************** State **************/



function StateOnChange() {



	var state_id = $('#state_id').val();



	if(state_id != '') {		



		$('#state_id').removeClass('input_error');



		$('#state_idErrorMsg').hide();



	}



}



function State() {



	var jazz = 0;	



	var state_id = $('#state_id').val();



	if(state_id == '') {		 



		$('#state_id').addClass('input_error'); jazz = 1;



		$('#state_id').focus();



		$('#state_idErrorMsg').fadeIn().html('Please select state');



	} else {		



		$('#state_id').removeClass('input_error'); 



	}



	return jazz;



}











/************** Security Question **************/



function SecurityQuestionOnChange() {



	var security_question_id = $.trim($('#security_question_id').val());



	if(security_question_id != '') {		



		$('#security_question_id').removeClass('input_error');



		$('#security_question_idErrorMsg').hide();



	}



	  



}



function SecurityQuestion() {	



	var jazz = 0;	



	var security_question_id = $.trim($('#security_question_id').val());



	if(security_question_id == '') {		



		$('#security_question_id').addClass('input_error'); jazz = 1;



		$('#security_question_id').focus();



		$('#security_question_idErrorMsg').fadeIn().html('Please select security question');



	} else {		



		$('#security_question_id').removeClass('input_error'); 



	}



	return jazz;



}











/************** Security Question Answer **************/



function SecurityQuestionAnswerBlur() {



	var security_question_answer = $.trim($('#security_question_answer').val());



	if(security_question_answer == '') {		



		$('#security_question_answer').addClass('input_error');



		$('#security_question_answerErrorMsg').fadeIn().html('Please enter security answer');



	} else {		



		$('#security_question_answer').removeClass('input_error');



		$('#security_question_answerErrorMsg').hide();



	}



}



function SecurityQuestionAnswerKeyUp() {



	var security_question_answer = $.trim($('#security_question_answer').val());



	if(security_question_answer != '') {		



		$('#security_question_answer').removeClass('input_error');



		$('#security_question_answerErrorMsg').hide(); 



	}



}



function SecurityQuestionAnswer() {	



	var jazz = 0;



	var security_question_answer = $.trim($('#security_question_answer').val());



	if(security_question_answer == '') {		



		$('#security_question_answer').addClass('input_error'); jazz = 1;



		$('#security_question_answer').focus();



		$('#security_question_answerErrorMsg').fadeIn().html('Please enter security answer');



	} else {		



		$('#security_question_answer').removeClass('input_error'); 



	}



	return jazz;



}







/************** Admin Section Messages **************/







function WelcomeMessage() {



	



	var jazz = 0;



	var message = $.trim($('#welcome_admin_message').val());



	if(message == '') {		



		$('#welcome_admin_message').addClass('input_error'); jazz = 1;



		$('#welcome_admin_message').focus();



	} else {		



		$('#welcome_admin_message').removeClass('input_error');



	}



	return jazz;



}







function FooterContent() {



	



	var jazz = 0;



	var message = $.trim($('#footer_contant').val());



	if(message == '') {		



		$('#footer_contant').addClass('input_error'); jazz = 1;



		$('#footer_contant').focus();



	} else {		



		$('#footer_contant').removeClass('input_error');



	}



	return jazz;



}







/*********************universal error check*******************************/



function checkError(id){



	$('#'+id+'ErrorMsg').hide().html('');



}



function setMask(id){



	$("#"+id).mask("9999 999 9999");

}