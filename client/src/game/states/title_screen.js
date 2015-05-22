var Fader = require("../util/fader");

function TitleScreen() {};

var titleOffsetX = 55;
var titleOffsetY = 20;

var buttonOffsetX = 40;
var startButtonOffsetY = 275;
var howToButtonOffsetY = 360;

var bombermanOffsetX = 305;
var bombermanOffsetY = 265;

var firstBombOffsetX = bombermanOffsetX + 12;
var firstBombOffsetY = bombermanOffsetY + 57;

var secondBombOffsetX = bombermanOffsetX + 185;
var secondBombOffsetY = bombermanOffsetY + 141;

var cloudRightmostPointX = 700;

var cloudTweenDuration = 80000;

var cloudData = [
	{startingX: 400, startingY: 50, image: "cloud1"},
	{startingX: -150, startingY: 140, image: "cloud1"},
	{startingX: 375, startingY: 200, image: "cloud1"},
	{startingX: 330, startingY: -20, image: "cloud1"},
	{startingX: 110, startingY: 110, image: "cloud2"},
	{startingX: -300, startingY: 140, image: "cloud2"},
	{startingX: -300, startingY: -30, image: "cloud2"},
	{startingX: 0, startingY: 140, image: "cloud3"},
	{startingX: -75, startingY: 200, image: "cloud4"},
	{startingX: 200, startingY: 20, image: "cloud5"},
	{startingX: 100, startingY: -20, image: "cloud5"},
	{startingX: -200, startingY: 250, image: "cloud6"},
	{startingX: 40, startingY: 80, image: "cloud7"},
	{startingX: 200, startingY: 180, image: "cloud1"},
	{startingX: -150, startingY: 20, image: "cloud5"},
	{startingX: 300, startingY: 230, image: "cloud4"}
];

TitleScreen.prototype = {
	create: function() {
		this.showingInstructions = false;
		this.justClickedHowTo = false;
		this.justClickedOutOfHowTo = false;

		this.createClouds();
		this.createButtons();

		var startButtonTween = this.createInitialButtonTween(this.startButton, 200);
		var howToButtonTween = this.createInitialButtonTween(this.howToButton, 400);

		// var title = game.add.image(titleOffsetX, titleOffsetY - 200, "titlescreen_title");

		// var titleTween = game.add.tween(title);
		// titleTween.to({y: titleOffsetY}, 500, Phaser.Easing.Bounce.Out, true, 200).start();

		// var bomberman = game.add.sprite(bombermanOffsetX + 400, bombermanOffsetY, "titlescreen_bomberman");
		// bomberman.animations.add("bomb_animation", [0, 1, 2, 3, 4], 5, true);

		// var bombermanTween = game.add.tween(bomberman).to({x: bombermanOffsetX}, 300, Phaser.Easing.Default, false, 100);
		// bombermanTween.onComplete.addOnce(function() {
		// 	bomberman.animations.play("bomb_animation");
		// });

		// bombermanTween.start();
		startButtonTween.start();
		howToButtonTween.start();
	},

	createInitialButtonTween: function(button, delay) {
		return game.add.tween(button).to({x: buttonOffsetX}, 300, Phaser.Easing.Default, false, delay);
	},

	createClouds: function() {
		var cloudRightmostPoint = game.camera.width;
		var cloudLeftmostPointX = -260;
		var tweenDuration = cloudTweenDuration * (game.camera.width - cloudLeftmostPointX) / game.camera.width;

		game.add.image(0, 75, "titlescreen_bg");

	},

	createButtons: function() {
		this.startButton = game.add.button(buttonOffsetX - 250, startButtonOffsetY, "titlescreen_start", function() {
			if(!this.showingInstructions && !this.justClickedOutOfHowTo) {
				Fader.fadeOut(function() {
					game.state.start("Lobby");
				});
			}
		}, this, 1, 0);
		this.howToButton = game.add.button(buttonOffsetX - 250, howToButtonOffsetY, "titlescreen_howto", function() {
			if(!this.showingInstructions && !this.justClickedOutOfHowTo) {
				this.showingInstructions = true;
				Fader.fadeOut(function() {
					this.howTo = game.add.image(0, 0, "howto");
					this.justClickedHowTo = true;
					Fader.fadeIn();
				}, this);
			}
		}, this, 1, 0);
	},

	update: function() {
		if(!game.input.activePointer.isDown && this.justClickedHowTo) {
			this.justClickedHowTo = false;
		}

		if(!game.input.activePointer.isDown && this.justClickedOutOfHowTo) {
			this.justClickedOutOfHowTo = false;
		}

		if(game.input.activePointer.isDown && this.showingInstructions && !this.justClickedHowTo) {
			this.showingInstructions = false;
			this.justClickedOutOfHowTo = true;
			Fader.fadeOut(function() {
				this.howTo.destroy();
				Fader.fadeIn();
			}, this);
		}
	}
}

module.exports = TitleScreen;
