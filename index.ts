// Any code in here that is a comment, could be future updates to this package

import * as Discord from 'discord.js';
import { Database } from 'quickmongo';
import * as ms from 'parse-ms';
import { Message } from 'discord.js';

const db = new Database(
	'mongodb+srv://MrDiscord1YouTube:baw2xHHfw6FvWiOn@cluster0.xz4ql.mongodb.net/MrDiscord1YouTube?retryWrites=true&w=majority'
);
//Really confused why you have a monogoDb connection url here
module.exports = {
	/**
        @param {Discord.Message} message The message the user sends
        @param {Discord.Client} client The discord bot/client
     **/

	// Starting the Economy
	async start(client, message: Message) {
		if (await db.has(`profile_${message.guild.id}_${message.author.id}`)) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Error!')
					.setColor('#FC2847')
					.setDescription(
						`You already have a profile in ${message.guild.name}!`
					)
			);
		} else {
			await db.set(
				`profile_${message.guild.id}_${message.author.id}`,
				`profile`
			);

			let joinEco = new Discord.MessageEmbed()
				.setTitle('Done!')
				.setDescription('You joined the economy!')
				.setColor('#66ff00');

			message.channel.send(joinEco);
		}
	},

	// Your daily bonus
	async daily(client, message: Message) {
		if (!(await db.has(`profile_${message.guild.id}_${message.author.id}`))) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#FC2847')
					.setTitle('Error!')
					.setDescription("You don't have a profile yet!")
			);
		} else {
			let timeout = 86400000;
			let amount = 100;

			let daily = await db.fetch(
				`daily_${message.guild.id}_${message.author.id}`
			);

			if (daily != null && timeout - (Date.now() - daily) > 0) {
				let time = ms(timeout - (Date.now() - daily));

				return message.channel.send(
					new Discord.MessageEmbed()
						.setColor('#FC2847')
						.setTitle('Error!')
						.setDescription(
							`You already claimed your daily reward! Come back in ${time.hours} Hours, ${time.minutes} Minutes, ${time.seconds} Seconds`
						)
				);
			} else {
				await db.add(
					`money_${message.guild.id}_${message.author.id}`,
					parseInt(amount.toString())
				);
				await db.set(
					`daily_${message.guild.id}_${message.author.id}`,
					Date.now()
				);

				message.channel.send(
					new Discord.MessageEmbed()
						.setColor('#66ff00')
						.setTitle('Done!')
						.setDescription(
							`You have successfully claimed your daily reward! +$${amount}`
						)
				);
			}
		}
	},

	// The users balance
	async balance(client, message: Message) {
		if (!(await db.has(`profile_${message.guild.id}_${message.author.id}`))) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Error!')
					.setColor('#FC2847')
					.setDescription("You don't have a profile!")
			);
		} else {
			let money = await db.fetch(
				`money_${message.guild.id}_${message.author.id}`
			);
			//let bank = await db.fetch(`bankMoney_${message.guild.id}_${message.author.id}`);

			//if (bank == null) bank = 0;
			if (money == null) money = 0;

			message.channel.send(
				new Discord.MessageEmbed()
					.setColor('66ff00')
					.setTitle('Balance For: ' + message.author.username)
					.addField(`Cash`, `$${money}`, true)
					//.addField("Money In Bank", bank)
					.setThumbnail(
						message.author.displayAvatarURL({
							dynamic: true,
						})
					)
			);
		}
	},

	async work(client, message: Message) {
		if (!(await db.has(`profile_${message.guild.id}_${message.author.id}`))) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Error!')
					.setColor('66ff00')
					.setDescription("You don't have a profile!")
			);
		}

		let timeout = 300000;
		let person = await db.fetch(
			`worked_${message.guild.id}_${message.author.id}`
		);

		if (person !== null && timeout - (Date.now() - person) > 0) {
			let time = ms(timeout - (Date.now() - person));
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('66ff00')
					.setTitle('Error!')
					.setDescription(
						`You recently worked! Come back in ${time.minutes} minutes and ${time.seconds} seconds`
					)
			);
		} else {
			let amount = Math.floor(Math.random() * 50);
			await db.add(`money_${message.guild.id}_${message.author.id}`, amount);
			await db.set(
				`worked_${message.guild.id}_${message.author.id}`,
				Date.now()
			);

			message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Done!')
					.setColor('66ff00')
					.setDescription(
						`You worked and earned $${amount}, <@${message.author.id}>`
					)
			);
		}
	},

	async leaderboard(client, message: Message) {
		try {
			if (!(await db.has(`profile_${message.guild.id}_${message.author.id}`))) {
				return message.channel.send(
					new Discord.MessageEmbed()
						.setTitle('Error!')
						.setColor('66ff00')
						.setDescription("You don't have a profile!")
				);
			} else {
				let infoArray = [];
				client.users.cache.forEach((user) => {
					infoArray.push(user);
				});

				let memberLength = infoArray.length;
				let people = 0;
				let showing = 10;
				let mes = [];

				for (let i = 0; i < memberLength; i++) {
					let money = await db.fetch(
						`money_${message.guild.id}_${infoArray[i].id}`
					);
					if (money == null) continue;

					mes.push({
						name: infoArray[i].username,
						amount: money,
					});
				}

				let lbArray: string[];
				mes.sort((a, b) => b.amount - a.amount);
				for (let k = 0; k < mes.length; k++) {
					people++;

					if (people >= showing) continue;
					lbArray.push(
						`${mes.indexOf(mes[k]) + 1}.${mes[k].name} - $${mes[k].amount}`
					);
				}

				const lb = lbArray.join('\n');

				let leaderboardEmbed = new Discord.MessageEmbed();
				if (people == 0) {
					leaderboardEmbed.setDescription(
						`There is no people on the leaderboard for: ${message.guild.name} `
					);
					leaderboardEmbed.setColor('RANDOM');
					leaderboardEmbed.setTitle(`Leaderboard for: ${message.guild.name} `);
					leaderboardEmbed.setThumbnail(
						message.guild.iconURL({
							dynamic: true,
						})
					);
				} else {
					leaderboardEmbed.setTitle(`Leaderboard for: ${message.guild.name} `);
					leaderboardEmbed.setDescription(lb);
					leaderboardEmbed.setThumbnail(
						message.guild.iconURL({
							dynamic: true,
						})
					);
					leaderboardEmbed.setColor('RANDOM');
				}

				message.channel.send(leaderboardEmbed);
			}
		} catch (error: unknown) {
			console.log(error);
		}
	},
};
