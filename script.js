var i = 1;
var init = true;
var choice = false;
my_url = "text.json";

var day = {
    "name" : "lundi",
    "hour" : [8,12,14,17],
};



var text;
$.getJSON(my_url, function(json) {
  text = json;
});

function clock() {
  var now = new Date();
var h = now.getHours();
var m = now.getMinutes();
var s = now.getSeconds();
m = checkTime(m);
s = checkTime(s);
   $('#clock').html(h + ":" + m + ":" + s);
    var t = setTimeout(clock, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function display_schedule() {
  for (day in schedule) {
  html = schedule(day).name;
}
}

function piscine_check(){
  i = 666;
}


function clock_reveal(){
  $('#clock').css('display' , 'block');
  next();
}

function next(){
  if (init) {$('#main').html(""); init=false}
  current = text[i];
  if (!choice) {
    i++;
    if (current.type=="text") {add_text(current.html)}
    if (current.type=="choice") {add_text(current.html); add_choice(current) }
    if (current.type=="event") {eval(current.event)}
    if (current.goto != null) {i =current.goto };
  }
}


function add_text(div_text){
  elem = document.createElement('div');
  $(elem).html(div_text)
  .attr('id', "div" + i);
  $(elem).css('display', 'none');
  $(elem).appendTo($('#main'));
  $(elem).fadeIn(1000);
}

function erase(elem) {
  elem.parent().css('display', 'none')
}

function add_choice (choices) {
  choice = true;
  choice_div = document.createElement('div');
  j=0;
  for (choice in choices.choice) {
    elem = document.createElement('span');
    $(elem).html(choices.choice[choice].text)
    .attr('id', "choice" +  j)
    .attr('onclick' , 'i=' + choices.choice[choice].goto+';choice=false; next(); erase($(this))')
    .addClass('choice, btn')
    j++;
    $(elem).appendTo($(choice_div))
    .css('display', 'none')
    .fadeIn(3000);
  }
  $(choice_div).appendTo($('#main'));


}
