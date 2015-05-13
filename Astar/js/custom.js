$(document).ready(function(){
	console.log("Ready");

	$(".basic").click(function(){
		$(this).attr("id","0");
		$(this).attr("data-val","0");
		$(this).addClass("visited start");
		bx = $(this).data("x");
		by = $(this).data("y");
		start = [bx,by];
		mainProcess();
	});

	aX = $(".end").data("x");
	aY = $(".end").data("y");
	goal = [aX,aY];
	


}); 

function mainProcess(){
	alert("Start");
	visited = [bx+""+by];
	cameFrom = [];
	cameFromFullList = [];
	// obstacles = [34,44,35,54,55] ;
	// visited.push("34");visited.push("44");visited.push("35");visited.push("54");visited.push("55");
	var j = 1;
    for(i=0;i<36;i++){

	    var a = getAdjacents(i);
	    sortArray(a);
	    $.each(a , function(index, value){
	    	if((visited.indexOf(value)) == -1){
				visited.push(value);
				console.log(visited);
				cameFromFullList[value] = cameFrom[0]+""+cameFrom[1];
		    	var y = $("[data-x="+cameFrom[0]+"][data-y="+cameFrom[1]+"]").attr("data-val");
		    	y = parseInt(y) + 1;   

			    $("[data-x="+value[0]+"][data-y="+value[1]+"]").attr("data-val",y);
			    $("[data-x="+value[0]+"][data-y="+value[1]+"]").html("<span>"+y+"</span>");
			    $("[data-x="+value[0]+"][data-y="+value[1]+"]").attr("id",j++).addClass("visited");

			    if(value[0] == goal[0] && value[1] == goal[1]){
			    	drawPath();
			    }else{}
		    }else{}
	    });
	}
}

function getAdjacents(i){
	var adjCells = [];
	var x = $("#"+i).data("x");
	var y = $("#"+i).data("y");
	cameFrom = [x,y];
	adjCells = [(x-1)+""+y,x+""+(y-1),(x+1)+""+y,x+""+(y+1)];
	// adjCells = [(x-1)+""+y,(x+1)+""+y,x+""+(y+1),x+""+(y-1)];
	return adjCells.filter(isSqOnGrid);
}

function isSqOnGrid(sq) {
	var height = 6;
	var width = 6;
    var x = sq[0], 
        y = sq[1];
    return x >= 1 && x <= width && y >= 1 && y <= height;
}

function drawPath(){
	var xy = cameFromFullList[goal[0]+""+goal[1]];
	var xzy = xy.split("");
	$("[data-x="+xzy[0]+"][data-y="+xzy[1]+"]").addClass("path");
	for(c=0;c<15;c++){
		var e = cameFromFullList[xy];
		var ee = e.split("");
		$("[data-x="+ee[0]+"][data-y="+ee[1]+"]").addClass("path");
		xy = e;
	}
	alert("Done");    	
}

function sortArray(v){
	
}

// function isVisited(a,visited){
// 	$.each(a , function(index, value){
// 		if((visited.indexOf(value)) == -1){

// 		}
// 		else{
// 			var b = a.splice(index, 1);

// 		}
// 	});
// 	return a;
// }

