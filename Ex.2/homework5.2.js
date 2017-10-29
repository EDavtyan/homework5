const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const rand = function(num) {
	return Math.floor(Math.random() * num);
};



const colors = ["rgb(3, 23, 39)", "rgb(18, 104, 114)", "rgb(11, 135, 125)", "rgb(24, 194, 156)", "rgb(136, 249, 212)"];

const points = []

const createPoints = function(count, canvasWidth, canvasHeight) {
	canvasHeight = canvas.height;
	canvasWidth = canvas.width;


	const helper = function(index){
		if (index === count) {
			return;
		}		

		
		points[index] = {
			x: rand(canvasWidth - 35),
			y: rand(canvasHeight - 35),
			width: 35,
			height: 35,
			color: colors[rand(10)],
			xDelta: rand(20) +1,
			yDelta: rand(10) +1
		}


		helper(index+1)
	};
	helper(0)
	return points 
};
createPoints(35 , 850, 600);



const forEach = function(arr, func) {
	const helper = function(index) {
		if(index === arr.length) {
			return
		}
		func(arr[index]);

		helper(index + 1);
	};

	helper(0);
};


const draw = function() {
	context.fillStyle = "rgba(255, 255, 255, .2";
	context.fillRect(0,0,canvas.width, canvas.height);
	forEach(points, function(point) {

		context.fillStyle = point.color;
		context.fillRect(point.x, point.y, point.width, point.height);
	
	});
};



const updateData = function() {
	forEach(points, function(point) {
		if (point.x >= canvas.width-point.width || point.x <= 0){
			point.color = colors[rand(10)];
			point.xDelta = -point.xDelta;
		}

		if (point.y >= canvas.height-point.height || point.y <= 0){
			point.color = colors[rand(10)];
			point.yDelta = -point.yDelta;
		}
	});
	forEach(points, function(point) {
	point.x += point.xDelta;
	point.y += point.yDelta;
});
};



const loop = function(){
	draw();
	updateData();
	requestAnimationFrame(loop);
};
loop();

















