var App = function(){
	var self = this;
	self.cards = [];
	self.init();
}

App.prototype = {};

App.prototype.init = function(){
	var self = this;
	self.renderCards();
	self.addCard();
	$(".tasks-detail .list-heading").on("click",function(){
		var $paneContainer = $(this).parent().find(".task-cards");
		if($paneContainer.height() === 0 || $paneContainer.is(":hidden")){
		    $(".task-cards").addClass("hidden-xs hidden-sm");
		    $paneContainer.removeClass("hidden-xs hidden-sm");
		}else{
		    $paneContainer.addClass("hidden-xs hidden-sm");
		}
	});

}

App.prototype.renderCards = function(){
	var self = this;
	var data = '{"cards": [{"description": "Improve the contrast to make Jared Happy :D","flow": "red","block": false,"category": "ideas"},{"description": "Header illustration","flow": "green","block": false,"category": "ideas"},{"description": "Icons for the dashboard","flow": "green","block": false,"category": "ideas"},{"description": "Design new illustrations for the app onboarding screens using Slack as inspiration","flow": "red","block": false,"category": "ideas"},{"description": "Slider animation","flow": "orange","block": false,"category": "ideas"},{"description": "Onboarding screens","flow": "orange","block": true,"category": "inprogress"},{"description": "Login error","flow": "green","block": false,"category": "inprogress"},{"description": "Create a new logo for the web app","flow": "green","block": true,"category": "inprogress"},{"description": "Improve the contrast to make Jared Happy :D","flow": "red","block": false,"category": "inprogress"},{"description": "Header illustration","flow": "green","block": false,"category": "inprogress"},{"description": "Icons for the dashboard","flow": "green","block": false,"category": "inprogress"},{"description": "The account settings screen needs to be mocked up","flow": "green","block": false,"category": "review"},{"description": "Replace dashboard icons with more colorful ones","flow": "red","block": false,"category": "review"},{"description": "Header illustration","flow": "green","block": false,"category": "review"},{"description": "Icons for the dashboard","flow": "orange","block": false,"category": "review"},{"description": "The account settings screen needs to be mocked up","flow": "green","block": false,"category": "approved"},{"description": "Replace dashboard icons with more colorful ones","flow": "red","block": false,"category": "approved"},{"description": "Design new illustrations for the app onboarding screens using Slack as imspiration","flow": "red","block": false,"category": "approved"},{"description": "Slider animation","flow": "orange","block": false,"category": "approved"}]}';
	$.ajax({
	    type: "GET",
	    url: "https://hubstaff-b010e.firebaseio.com/cards.json",
	    success: function(responseData){
	        self.cards = responseData.cards;
	        $.each(self.cards,function(index,card){
	        	var icon = card.block ? "fa fa-square sqr" : "fa fa-play play";
		        var content = '<div class="task-list pane-card ' + card.flow + '">'+
		        				'<div class="user"><img src="img/img1.png" class="img-responsive"></div>'+
		                        '<p class="card-content">' + card.description + '</p>'+
		                        '<i class="' + icon + '"></i>'+
		                      '</div>';
		        $("." + card.category + "-container .task-cards").append(content);
		    });

	    }
	});
};

App.prototype.addCard = function(){
	var self = this;
	$("body").on("click",".delete-card",function(){
		$(this).parent().find("input").val("");
		$(this).parent().find("input").focus();
	});
	$("body").on("click",".add-card",function(){
		self.cards.push({
			"description": $(this).parent().find("input").val(),
			"category": $(this).data("category"),
			"flow": "green",
			"block": true
		});
		console.log($(this).data("category"));
		$(this).parent().find("input").val("");
		$.ajax({
		    type: "PUT",
		    data: JSON.stringify({
		    	"cards": self.cards
		    }),
		    url: "https://hubstaff-b010e.firebaseio.com/cards.json",
		    success: function(responseData){
		        self.cards = responseData.cards;
		        var card = self.cards[self.cards.length - 1];
		        var content = '<div class="task-list pane-card ' + card.flow + '">'+
		                      '<p class="card-content">' + card.description + '</p>'+
		                      '</div>';
		        $("." + card.category + "-container .task-cards").append(content);
		    }
		});
	});
}