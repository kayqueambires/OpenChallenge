import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}

client.once('ready', () => {
  console.log(`Bot logado como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    await interaction.reply({
      content: 'Ocorreu um erro ao executar esse comando.',
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
