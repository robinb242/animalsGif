

//var authkey = KmR0wZXokil38TbxyRAbUJFTm94HgMOB

$(function(){
	populateButtons(topicsArray, 'searchButton', '#buttonsArea')

})
//create an array of strings save it to a variable called topics.
	var topicsArray = [
	'Aardvark',
	'Bear',
	'Cat',
	'Dog',
	'Elephant',
	'Horse',
	'Lion',
	'Tiger',
	'Ostrich'
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

//When the user clicks the button the page should gather 10 STATIC, NON-ANIMATED Gifs from from the API.
$(document).on('click', '.searchButton', function(){
	var type = $(this).data('type');
	console.log (type);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=KmR0wZXokil38TbxyRAbUJFTm94HgMOB&limit=10";
		console.log(queryURL);
//appends the HTML for each item in the array with the query response data.
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

//changes the state of the GIF from static to animated and back
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

//should append the array with user input...doesn't
$('#addSearch').on('click',function(){
	var newSearch = $('input').eq(0).val();
	topicsArray.push(newSearch);
	populateButtons(topicsArray, 'searchButton', '#buttonsArea');
//stop page from reloading and clearing out the added button
	return false;

})






















