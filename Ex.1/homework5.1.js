const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rand = function(num) {
	return Math.floor(Math.random() * num);
};

const colors = ["rgb(71, 181, 255)", "rgb(88, 100, 232)", "rgb(87, 51, 255)", "rgb(24, 16, 33)", "rgb(238, 78, 255)", "rgb(5, 242, 219)", "rgb(242, 169, 34)", "rgb(217, 114, 24)", "rgb(191, 120, 57)", "rgb(115, 80, 50)"];

const createPoints = function(count, canvasWidth, canvasHeight) {
	canvasHeight = canvas.height;
	canvasWidth = canvas.width;

	const points = [

	]

	const helper = function(index){
		if (index === count) {
			return;
		}		

		points[index] = {
			width: 25,
			height: 25,
			x: rand(canvasWidth - 25),
			Y: rand(canvasHeight - 25),
			color: colors[rand(6)]
			xDelta: rand(20),
			yDelta: rand(20),
			
		}

		helper(index+1)
	};
	helper(0)
	return points 
};