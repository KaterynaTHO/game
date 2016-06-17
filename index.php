<html>
	<head>
		<meta charset="UTF-8">
		<title>Game</title>
		<script src="/game.js"></script>
		<link rel="stylesheet" href="css/style.css">
	</head>

	<body>
		<div id="looseWindow">Try again!
			<input type="button" id="but" onclick="again()" value="Start"/>
			<p>Score</p>
			<input type="text" id="seconds" />
			<input type="button" id="but2" onclick="plane()" value="new plane"/>
			<img src="img/plane2.png">
		</div>
		<canvas id="map" ></canvas>
		<canvas id="player" ></canvas>
		<canvas id="enemy" ></canvas>
		<canvas id="stats"></canvas>
		<input id="drawBtn" type="button" value="Draw"></input>
		<input id="clearBtn" type="button" value="Clear"></input>
	</body>
</html>