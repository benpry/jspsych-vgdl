export var Termination = function () {};

Termination.prototype = {
	isDone: function (game) {
		return [false, null];
	},
};

export var Timeout = function (args) {
	this.limit = args.limit;
	this.win = args.win;
};
Timeout.prototype = Object.create(Termination.prototype);

Timeout.prototype.isDone = function (game) {
	if (game.time >= this.limit) {
		return [true, this.win];
	} else {
		return [false, null];
	}
};

export var SpriteCounter = function (args) {
	Termination.call(this, args);
	this.limit = args.limit || 0;
	this.stype = args.stype;
	this.win = args.win;
};
SpriteCounter.prototype = Object.create(Termination.prototype);

SpriteCounter.prototype.isDone = function (game) {
	if (game.numSprites(this.stype) <= this.limit) {
		console.log(this.stype);
		return [true, this.win];
	} else return [false, null];
};

var MultiSpriteCounter = function (args) {
	Termination.call(this, args);
	this.limit = args.limit;
	this.win = args.win;
	array_args = Object.keys(args);
	this.stypes = array_args
		.filter((arg) => {
			return arg.includes("stype");
		})
		.map((stype) => {
			return args[stype];
		});
};
MultiSpriteCounter.prototype = Object.create(Termination.prototype);

MultiSpriteCounter.prototype.isDone = function (game) {
	if (
		this.stypes
			.map((st) => {
				return game.numSprites(st);
			})
			.reduce((s, n) => {
				return s + n;
			}, 0) == this.limit
	) {
		console.log(this.stypes);
		return [true, this.win];
	} else {
		return [false, null];
	}
};
