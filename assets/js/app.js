var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
var currentdate =  new Date();
console.log(currentdate)
var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]; 
var dayNames= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
var day = currentdate.getDay();
var currentDay = currentdate.getDate();
var month = currentdate.getMonth()+1;
var year = currentdate.getFullYear();
var hr = currentdate.getHours();
var min = currentdate.getMinutes();
var sec = currentdate.getSeconds();
console.log(dayNames[currentdate.getDay()] + " " + currentdate.getDate() + ' ' + monthNames[currentdate.getMonth()] + ' ' + currentdate.getFullYear())

$(".date-container").append("<span>"+dayNames[day]+ ", " + monthNames[month] + " " + day + "</span>")

$(document).on("click",".sidebar-toggle",function(){
	if($(".wrapper").hasClass("active")){
		$(".wrapper").removeClass("active")
	}else{		
		$(".wrapper").addClass("active")
	}
})
$(document).on("click",".nav-dropdown",function(){
	$(".nav-dropdown").find(".ul-dropdown").stop().hide(300)
	$(this).find(".ul-dropdown").stop().slideToggle("slow")
})

$(document).on("click",".header-color",function(){
	console.log($(this))
	var color = $(this).attr("data-color");
	$(this).closest(".smart-widget").removeAttr("class").attr("class","smart-widget")
	$(this).closest(".smart-widget").addClass(color)
})
$(document).on("click",".bl-btn-toggle",function(){
	$(".bl-dropdown-menu").hide(100)
	$(this).find(".bl-dropdown-menu").stop().toggle()
})
$(document).ready(function(){
  $(".smart-widget-toggle").click(function(){
  	$(this).find("i").toggleClass("fa-chevron-up fa-chevron-down");
    $(this).closest(".smart-widget").find(".smart-widget-body").stop().slideToggle("slow");
  });

  $(".color-toggle").click(function(){
    $(this).closest(".smart-widget").find(".smart-widget-color").stop().slideToggle("slow");
  });
});

$(document).mouseup(function (e) {
	if (!$(".bl-dropdown-menu").is(e.target)&& $(".bl-dropdown-menu").has(e.target).length === 0){
    $(".bl-dropdown-menu").hide(100)
  }
  if (!$(".ul-dropdown").is(e.target)&& $(".ul-dropdown").has(e.target).length === 0){
    $(".ul-dropdown").stop().hide(300)
  }  	
})

$(document).on("click","#btn-notif",function(){
	console.log($(this))
})

$(document).on("click",".side-drop", function(e){
  $(this).toggleClass("active not-active");
})

$(document).on("click","button[notify='true']",function(){
  var bg_color;
  var position;
  var messag;
  var closable = "";
  var notif = "";
  if ($(this).attr("data-color") != undefined) {
    bg_color = $(this).attr("data-color");
  }else if($(this).attr("data-color")  == '' || $(this).attr("data-color") == undefined){
    bg_color = "primary";
  }
  if ($(this).attr("position") != undefined) {
    position = $(this).attr("position");
  }else if($(this).attr("position")  == '' || $(this).attr("position") == undefined){
    position = "top-middle";
  }
  if ($(this).attr("message") != undefined) {
    message = $(this).attr("message");
  }else if($(this).attr("message")  == '' || $(this).attr("message") == undefined){
    message = "This is a alert message";
  }
  if ($(this).attr("closable") != undefined) {
    if($(this).attr("closable")=='true'){
      closable = "notif-closable"
    }
  }
  if (!$(".notify-"+position+"").is(":visible")) {
    var ul_notif = '<ul class="alert-notify notify-'+position+'"></ul>'
  }
  notif = '<li>'
  notif +='<div class="notif-message bg-'+bg_color+'">'
  notif += '<div class="progressBar"><div></div></div>'
  notif += '<div class="notif-content '+closable+'">'
  notif += '<span>'
  notif += ''+message+''
  notif += '</span>'
  notif += '<i class="fa fa-times-circle notif-close"></i>'
  notif += '</div>'
  notif += '</div></li>'

if (!$(".notify-"+position+" li").is(":visible")) {    
  $("body").append(ul_notif);
  $(".notify-"+position+"").empty();
  $(".notify-"+position+"").append(notif);
  $(".notify-"+position+" li").show(300);
  if (closable == '' ) {
    let dur = 5e3;
    let el = $('.notify-'+position+' .progressBar');
    setTimeout(() => {
      let progress_w = el.width();
      let speed = Math.floor(dur / progress_w);

      let prog = setInterval(() => {
        progress_w = progress_w -1;
        el.width(progress_w);
      },speed)

      setTimeout(() => {
        clearInterval(prog);
        $(".notify-"+position+" li").hide(300);
      },dur)
    },1e3)
  }}
})

$(document).on("click",".notif-close",function(){
  $(this).closest("li").hide(300);
})

$(document).on("click","button[alert='true']",function(){
  var bg_color;
  var messag;
  var closable = "";
  var icon;
  var alert = ""
  if ($(this).attr("data-color") != undefined) {
    bg_color = $(this).attr("data-color");
  }else if($(this).attr("data-color")  == '' || $(this).attr("data-color") == undefined){
    bg_color = "primary";
  }
  if ($(this).attr("message") != undefined) {
    message = $(this).attr("message");
  }else if($(this).attr("message")  == '' || $(this).attr("message") == undefined){
    message = "This is a "+bg_color+" alert";
  }
  if ($(this).attr("closable") != undefined) {
    if($(this).attr("closable")=='true'){
      closable = "bl-alert-closable"
    }
  }
  if (bg_color == "success") {
    icon = "fa-check-circle"
  }else if(bg_color == "info"){
    icon = "fa-info-circle"
  }else if(bg_color == "danger"){
    icon = "fa-exclamation"
  }else if(bg_color == "warning"){
    icon = "fa-exclamation-triangle"
  }
  
  alert = '<div class="bl-alert-container">'
  alert += '<div class="bl-alert bg-'+bg_color+'">'
  alert += '<div class="progressBar">'
  alert += '<div></div>'
  alert += '</div>'
  alert += '<div class="bl-alert-content '+closable+'">'
  alert += '<i class="fa '+icon+'"></i>'
  alert += '<div>'
  alert += '<span>'+message+'</span>'
  alert += '</div>'
  alert += '<i class="fa fa-times-circle alert-close"></i>'
  alert += '</div>'
  alert += '</div>'
  alert += '</div>'

  if (!$(".bl-alert-container .bg-"+bg_color+"").is(":visible")) {
    $(".bl-alert-container").remove();
    $("body").append(alert);
    $(".bl-alert-container").show(300);
    if (closable == '' ) {
      let dur = 5e3;
      let el = $('.bl-alert-container .bg-'+bg_color+' .progressBar');
      setTimeout(() => {
        let progress_w = el.width();
        let speed = Math.floor(dur / progress_w);
        let prog = setInterval(() => {
          progress_w = progress_w -1;
          console.log(el)
          el.width(progress_w);
        },speed)
        setTimeout(() => {
          clearInterval(prog);
          $(".bl-alert-container .bg-"+bg_color+"").hide(300);
        },dur)
      },1e3)
    }
  }
})
$(document).on("click",".alert-close",function(){
  $(".bl-alert-container").hide(300);
})

$(document).on("click","button[modal-alert='true'],button[modal-confirm='true']",function(){
  if ($(this).attr("data-color") != undefined) {
    bg_color = $(this).attr("data-color");
  }else if($(this).attr("data-color")  == '' || $(this).attr("data-color") == undefined){
    bg_color = "light";
  }
  var modal = $(this).attr("data-target");
  $(modal).find(".bl-modal-header").addClass("bg-"+bg_color+"");
  $(modal).find(".bl-modal-footer button:last-child").addClass("bg-"+bg_color+"");
  $(modal).show();
  $(modal).find(".bl-modal").slideDown()
})

$(document).on("click","button[bl-modal-okay],button[bl-modal-cancel]",function(){
  $(this).closest(".bl-modal").slideUp()
  $(this).closest(".bl-modal-mask").slideUp('slow');
})

$(document).on("click","button[bl-modal-confirm]",function(){
  $(this).closest(".bl-modal").slideUp()
  $(this).closest(".bl-modal-mask").slideUp('slow');
})
// $(function() {
//     on('click', function() {
//       $('#my-confirm').modal({
//         relatedTarget: this,
//         onConfirm: function(e) {
//           var $link = $(this.relatedTarget).prev('a');
//           var msg = $link.length ? 'The ID of deleted link is ' + $link.data('id') :
//             'OK, so what?';
//           alert(msg);
//         },
//         onCancel: function(e) {
//           alert('Fine, fine, fine.');
//         }
//       });
//       $("#modal-confirm")
//     });
// });
