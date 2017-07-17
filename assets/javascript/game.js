var characters = {
	"mario":{
		id: "mario",
		healthPoints: 120,
		attackPower: 7,
		counterAttackPower: 22
	},
	"yoshi":{
		id: "yoshi",
		healthPoints: 100,
		attackPower: 12,
		counterAttackPower: 24
	},
	"peach":{
		id: "peach",
		healthPoints: 150,
		attackPower: 4,
		counterAttackPower: 21
	},
	"toad":{
		id: "toad",
		healthPoints: 180,
		attackPower: 5,
		counterAttackPower: 23
	}
};

var characterChosen = 0;
var fightChar1;
var fightChar2;
var healthPointsChar1;
var healthPointsChar2;
var round = 1;
var strike = 1;
var newAttackPowerChar1;
var newHealthPointsChar1;
var newHealthPointsChar2;

function chooseCharacter(id) {
	if (id === "mario") {
		$("#available-enemies").append($("#yoshi, #peach, #toad"));
		fightChar1 = characters.mario;
		$("#yoshi-stats, #peach-stats, #toad-stats").css("background-color", "#4295f4");

	}
	else if (id === "yoshi") {
		$("#available-enemies").append($("#mario, #peach, #toad"));
		fightChar1 = characters.yoshi;
		$("#mario-stats, #peach-stats, #toad-stats").css("background-color", "#4295f4");
	}
	else if (id === "peach") {
		$("#available-enemies").append($("#mario, #yoshi, #toad"));
		fightChar1 = characters.peach;
		$("#yoshi-stats, #mario-stats, #toad-stats").css("background-color", "#4295f4");
	}
	else if (id === "toad") {
		$("#available-enemies").append($("#mario, #yoshi, #peach"));
		fightChar1 = characters.toad;
		$("#yoshi-stats, #peach-stats, #mario-stats").css("background-color", "#4295f4");
	}

	characterChosen++;
	$("#directions").text("now choose an enemy to fight against.")

};

function chooseEnemy(enemy) {
	if (enemy === "mario" || enemy === "yoshi" || enemy === "peach" || enemy === "toad"){
		 $("#current-enemy").append($("#" + enemy));
		 fightChar2 = characters[enemy];
		 $("#" + enemy + "-stats").css("background-color", "red");
		 $("#directions").text("use the attack button to battle.")
		}

};

function outcomeGame(char1, char2, hp1, hp2) {
	if (hp1 <= 0) {
		$("#directions").text("you lost! click restart to play again.");
		$("#restart").css("display","block");
		characterChosen = 0;
	}
	else if (hp2 <= 0) {
		$("#directions").text("you won! choose another character to battle.");
		$("#" + char2).css("display", "none");
		round++; 
		strike = 1;
	}
};


function attack(char1, char2) {
	newAttackPowerChar1 = char1.attackPower * strike;
	if (strike === 1 && round === 1) {
		healthPointsChar1 = char1.healthPoints;
		healthPointsChar2 = char2.healthPoints;
		newHealthPointsChar1 = healthPointsChar1 - char2.counterAttackPower;
		newHealthPointsChar2 = healthPointsChar2 - newAttackPowerChar1;
		$("#directions").html("you attacked " + char2.id + " for " + newAttackPowerChar1 + " damage. <br>" + char2.id + " counter attacked for " + char2.counterAttackPower + " damage.");
		$("#" + char1.id + "-stats").text(newHealthPointsChar1);
		$("#" + char2.id + "-stats").text(newHealthPointsChar2);

	}
	else if (strike > 1 && round === 1) {
		newHealthPointsChar1 = newHealthPointsChar1 - char2.counterAttackPower;
		newHealthPointsChar2 = newHealthPointsChar2 - newAttackPowerChar1;
		$("#directions").html("you attacked " + char2.id + " for " + newAttackPowerChar1 + " damage. <br>" + char2.id + " counter attacked for " + char2.counterAttackPower + " damage.");
		$("#" + char1.id + "-stats").text(newHealthPointsChar1);
		$("#" + char2.id + "-stats").text(newHealthPointsChar2);

	}
	else if (strike === 1 && round > 1) {
		healthPointsChar2 = char2.healthPoints;
		newHealthPointsChar1 = newHealthPointsChar1 - char2.counterAttackPower;
		newHealthPointsChar2 = healthPointsChar2 - newAttackPowerChar1;
		$("#directions").html("you attacked " + char2.id + " for " + newAttackPowerChar1 + " damage. <br>" + char2.id + " counter attacked for " + char2.counterAttackPower + " damage.");
		$("#" + char1.id + "-stats").text(newHealthPointsChar1);
		$("#" + char2.id + "-stats").text(newHealthPointsChar2);

	}
	else if (strike > 1 && round > 1) {
		newHealthPointsChar1 = newHealthPointsChar1 - char2.counterAttackPower;
		newHealthPointsChar2 = newHealthPointsChar2 - newAttackPowerChar1;
		$("#directions").html("you attacked " + char2.id + " for " + newAttackPowerChar1 + " damage. <br>" + char2.id + " counter attacked for " + char2.counterAttackPower + " damage.");
		$("#" + char1.id + "-stats").text(newHealthPointsChar1);
		$("#" + char2.id + "-stats").text(newHealthPointsChar2);
	};

	strike++;

	outcomeGame(char1.id, char2.id, newHealthPointsChar1, newHealthPointsChar2);
};


$("div").click(function(){
	if (this.id === "mario" || this.id === "yoshi" || this.id === "peach" || this.id === "toad"){
		if (characterChosen === 0) {
			chooseCharacter(this.id);
		}
		else if (characterChosen > 0) {
			chooseEnemy(this.id);
		}
}
});

$("#attack").click(function(){
	attack(fightChar1, fightChar2);

});

$("#restart").click(function(){
	characterChosen = 0;
	round = 1;
	strike = 1;
	$(".available-characters").prepend($("#mario, #yoshi, #peach, #toad"));
	$("#directions").text("choose character to begin");
	$("#restart").css("display","none");
	$("#yoshi-stats, #peach-stats, #mario-stats, #toad-stats").css("background-color", "green");
	$("#mario-stats").text(characters.mario.healthPoints);
	$("#yoshi-stats").text(characters.yoshi.healthPoints);
	$("#peach-stats").text(characters.peach.healthPoints);
	$("#toad-stats").text(characters.toad.healthPoints);
	$("#mario, #yoshi, #peach, #toad" ).css("display", "inline-block");

});
