import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';

config();

const commands = [];
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔁 Registrando comandos (slash)...');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();
