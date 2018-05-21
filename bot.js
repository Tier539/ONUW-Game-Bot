
const Discord = require('discord.js');

const client = new Discord.Client();

const token = 'NDQ2ODAxMzMzNzE5NDAwNDUw.Dd-ZBg.mD4MZQum5rtF4kfoLF8nRU6uRhE';

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content.substring(0, 5) === '!game') {
    // Send "pong" to the same channel
    //message.channel.send('pong');
	
	var args = message.content.substring(1).split(' ');
		//let mems = MessageMentions.users;
		//console.log(mems);
        var cmd = args[0];
		//message.channel.send(args);
		args = args.splice(1);
		var numcmd = args.length;
		shuffle(args);
		var msgtext = "Here is your game:\n\nRoles in play:\n";
		var msgtext2 = "";
		var ChosenRoles = [];
		var roles = ['Villager', 'Bodyguard', 'Seer', 'Drunk', 'Robber', 'Witch', 'Troublemaker', 'Insomniac', 'Hunter', 'Revealer', 'Doppelganger', 'Tanner', 'Minion', 'Psycho Ex GF'];
		var pms = ["This is a Villager. It's the vanilla role with no ability. There can be more than one of these in a game. The exact number of them will be specified pre-game.",
		'The bodyguard will protect whoever they think is innocent. If the bodyguard votes to lynch someone and the day ends that person will be spared from death. Instead the person with the second most number of votes will be killed.',
		'Seer can look at the role card of another player. OR they can choose 2 of the 3 unused cards and look at them. Most games have one seer though you could have 2 in a larger game.',
		'The drunk can not remember what role he has. He will exchange his role for one of the 3 unused roles of his choosing but he will not see what the new role is.',
		'The robber will choose a fellow player and switch roles with them. The Robber will then look at the new card they have received and play for whatever team that is. The person who is swapped with becomes the new robber and is thus on the side of the town.',
		"The witch will look at one of the 3 center cards. The witch will then swap that role with any of the players in the game. Placing their role card in the center in it's stead. Any player can be swapped in this way including the witch herself.",
		"The Troublemaker will choose 2 other players in the game and swap their roles but will not know what those roles were or what they currently are. The people who have had their roles swapped will not be notified of this.",
		"The insomniac will have trouble sleeping and at the end of the night will wake up early and check their role. If their role was changed at any point during the night they will be actively aware of their new role. Only use this role in games with a Troublemaker or a Robber",
		"The Hunter is a tough guy with a gun. If he is lynched whoever his lynch vote is on he will kill as well. If it is a werewolf the town wins!",
		"The Revealer will flip over another player's role card. The card he flips over will remain flipped and when the game begins everyone will know the role of said player. Unless the card is a Werewolf (or in the werewolf family) or a Tanner. In which case the card is flipped back over... but the Revealer will have seen the card. It just won't stay revealed. If the revealer sees the Doppelgänger they will leave it face up even if Doppelgänger has become a werewolf/tanner as the revealer will not know what the Doppelgänger has become.",
		"The doppelgänger can copy any other role in the game. This role acts first and chooses another player. The doppelgänger is now that role too. The doppelgänger immediately uses their new role at the start of the night, save for a few exceptions like roles that activate with other roles such as the werewolves/minions or roles that activate at the end of the night like insomniac/revealer.The doppelgänger copies both the role and the alignment of whoever they copy.",
		'The Tanner hates his job and wants to die. If he dies he and only he wins.',
		'The minion is working for the werewolves and know who they are. Though they do not know who he is. If the minion dies and no werewolves die then the werewolves and the minion win the game.',
		'Insert Psycho EX GF PM Here',
		"The werewolves will know who all the other werewolves in the game are. Typically only 2 werewolves per game but if the number of players gets high it'll probably be 3. The werewolves won't be able to speak to each other outside of the game like a typical mafia though.",
		'The mystic wolf is the same as a regular werewolf save for the fact that this wolf will be able to look at the role of one other player. This information will only be shown to the Mystic wolf and not all of the werewolves in play. (This part is true for both kinds of Werewolves) If there is only 1 werewolf in play (which is possible if the 2nd werewolf ends up in the unused pile. Then the single werewolf can choose one of the 3 unused cards and look at it.'];
		var max = [3,1,1,1,1,1,1,1,1,1,1,1,1,1];
		rndwolf = Math.random();
		ChosenRoles.push("Werewolf");
		if(rndwolf >.5){
			ChosenRoles.push("Werewolf");
		} else if (rndwolf <= 0.5) {
			ChosenRoles.push("Mystic Wolf");
		} 
		
		if (numcmd >= 18){
			message.channel.send('TOO MANY!');
		} else {		
		do {
			RandomRoleNum = Math.floor(Math.random() * roles.length);
			var numOfSame = ChosenRoles.filter(function(x){ return x === roles[RandomRoleNum]; }).length;
			if ( numOfSame < max[RandomRoleNum]) {
			ChosenRoles.push(roles[RandomRoleNum]);
			}
		}
		while (ChosenRoles.length < numcmd+3);
		for (var i in ChosenRoles) {
			msgtext += ChosenRoles[i] + '\n';

		}
		var FaceDown = [];
		shuffle(ChosenRoles);
		FaceDown.push(ChosenRoles[ChosenRoles.length-1]);
		FaceDown.push(ChosenRoles[ChosenRoles.length-2]);
		FaceDown.push(ChosenRoles[ChosenRoles.length-3]);
		ChosenRoles.splice(ChosenRoles.length-3, 3);
		for (var i in ChosenRoles) {
			msgtext2 += args[i] + ': '+ i + ' : :' + ChosenRoles[i] + '\n';
			if (ChosenRoles[i] == 'Villager'){
				pmnum=0;
			} else if (ChosenRoles[i] == 'Bodyguard'){
				pmnum=1;
			} else if (ChosenRoles[i] == 'Seer'){
				pmnum=2;
			} else if (ChosenRoles[i] == 'Drunk'){
				pmnum=3;
			} else if (ChosenRoles[i] == 'Robber'){
				pmnum=4;
			} else if (ChosenRoles[i] == 'Witch'){
				pmnum=5;
			} else if (ChosenRoles[i] == 'Troublemaker'){
				pmnum=6;
			} else if (ChosenRoles[i] == 'Insomniac'){
				pmnum=7;
			} else if (ChosenRoles[i] == 'Hunter'){
				pmnum=8;
			} else if (ChosenRoles[i] == 'Revealer'){
				pmnum=9;
			} else if (ChosenRoles[i] == 'Doppelganger'){
				pmnum=10;
			} else if (ChosenRoles[i] == 'Tanner'){
				pmnum=11;
			} else if (ChosenRoles[i] == 'Minion'){
				pmnum=12;
			} else if (ChosenRoles[i] == 'Psycho Ex GF'){
				pmnum=13;
			} else if (ChosenRoles[i] == 'Werewolf'){
				pmnum=14;
			} else if (ChosenRoles[i] == 'Mystic Wolf'){
				pmnum=15;
			} 
			let id = args[i].replace(/[<@!>]/g, '');
			var userobj = client.users.get(id)
			userobj.send(args[i]+' : You are ' + ChosenRoles[i] + '\n' + pms[pmnum]);
		}
		
		


		msgtext += '\nFace down cards are:\n' + FaceDown[0]+ '\n' + FaceDown[1] + '\n' + FaceDown[2];
		message.author.send(msgtext+'\n\n'+msgtext2);
		
		
		

     }
		} else if (message.content.substring(0, 8) === '!results'){
			message.channel.send(msgtext+'\n\n'+msgtext2);
		}
			
  
  
  
  
  
});

// Log our bot in
client.login(token);


function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
