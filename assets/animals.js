

//var authkey = KmR0wZXokil38TbxyRAbUJFTm94HgMOB

$(function(){
	populateButtons(topicsArray, 'searchButton', '#buttonsArea')

})
//create an array of strings save it to a variable called topics.
	var topicsArray = [
	"Aardvark",
	"Bear",
	"Cat",
	"Dog",
	"Elephant",
	"Horse",
	"Lion",
	"Tiger",
	"Ostrich"
	];

	function populateButtons(topicsArray,classToAdd, areaToAddTo){
//clears out the input box after a user enters a new animal
	$(areaToAddTo).empty();

//Take the topics in the array and create buttons in the HTML
//Use a loop that appends a button for each string in the array
  for (var i=0; i<topicsArray.length; i++) {
  		var a = $("<button>");
  		//I don't recall how the a.addClass ect works. Is it a JSON shortcut?
  		a.addClass(classToAdd);
  		a.attr("data-type", topicsArray[i]);
  		a.text(topicsArray[i]);
  		$(areaToAddTo).append(a);
  	}
   }


//assign a variable to user input, doesn't necessarily go here 
//var arrayItem = $(topicsArray[i]).val().trim();

//When the user clicks the button the page should gather 10 STATIC, NON-ANIMATED Gifs from from the API.
$(document).on('click', '.searchButton', function(){
	//('#userInput').empty();
	var type = $(this).data('type');

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=KmR0wZXokil38TbxyRAbUJFTm94HgMOB&limit=10";
		console.log(queryURL);

	$.ajax({url:queryURL, method:'GET'})
	.done(function(response){
		for(var i=0; i<response.data.length; i++){
			var searchDiv = $('<div class="search-item">');
			var rating = response.data[i].rating;
			var p = $("<p>").text('Rating ' + rating);
			var animated = response.data[i].images.fixed_height.url;
			var still =  response.data[i].images.fixed_height_still.url;
			var image = $('<img>');
			image.attr('src',still);
			image.attr('data-still', still);
			image.attr('data-animated', animated);
			image.attr('data-state', 'still');
			image.addClass('searchImage');
			searchDiv.append(p);
			searchDiv.append(image);
			$("#searches").append(searchDiv);
		}
		})
	})
$(document).on('click', '.searchImage', function() {
		var state = $(this).attr('data-state');
		if(state == 'still'){
			$(this).attr('src', $(this).data('animated'));
			$(this).attr('data-state', 'animated');
			}
			else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
			}
})

$('#addSearch').on('click',function(){
	var newSearch = $('input').eq(0).val();
	topicsArray.push(newSearch);
	populateButtons(topicsArray, 'searchButton', '#buttonsArea');
//stop page from reloading and clearing out the added button
	return false;

})
//Display the results of the API Search in HTML

//When the user clicks the still image, the GIF will animate. 2nd click stops animation

//display the GIFs Rating under every gif

//Second part
//Add a form to your page that take user input and adds it to your array
//Make a function call that takes each topic in the array and remakes the buttons on the page.

//Example fromm Arnold and Sam Jackson
/* $('#buttonArea').on('click', function(event){

	event.preventDefault();

	var x = $(this).data("search");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=KmR0wZXokil38TbxyRAbUJFTm94HgMOB&limit=10";
		console.log(queryURL);

	$ajax({url:queryURL,method:'GET'})
		.done(function(response){
			console.log(response);
			for(var i=0; i<response.data.length;i++){
				$('GIFarea').prepend("<p>Rating: "+response.data[i].rating+"</p>");
				$('GIFarea').prepend("img src='"+response.data[i].images.downsized.url+"'>"); 
			}
		})
//Clear input area of text

		$("#formGroupUserAnimal").val("");
		*/






















