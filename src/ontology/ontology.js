var tools = Tools || require('../tools.js');


var Ontology = {};
Ontology.extend(VGDLSprite || require('./vgdl-sprite.js'),
				AvatarModule ||require('./avatar.js'),
				PhysicsModule || require('./physics.js'),
				ResourceModule || require('./resource.js'),
				TerminationModule || require('./termination.js'),
				ConditionalModule || require('./conditional.js'),
				Effect || require('./effect.js'))	

try {
	module.exports = Ontology;
} catch (e) {
	
}