import { SlashCommandBuilder } from 'discord.js';
import prisma from '../utils/prisma.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ranking')
    .setDescription('Mostra o ranking dos usuários com mais submissions'),

  async execute(interaction) {
    try {
      const users = await prisma.user.findMany({
        include: { submissions: true },
      });

      const sorted = users
        .sort((a, b) => b.submissions.length - a.submissions.length)
        .slice(0, 10);

      if (sorted.length === 0) {
        return await interaction.reply(
          'Ainda não há usuários com submissions!'
        );
      }

      const ranking = sorted
        .map(
          (user, index) =>
            `**${index + 1}.** ${user.email} — ${
              user.submissions.length
            } submissions`
        )
        .join('\n');

      return await interaction.reply({
        content: `**Ranking dos Top Usuários**\n\n${ranking}`,
        ephemeral: false,
      });
    } catch (err) {
      console.error('Erro no comando /ranking:', err);
      return await interaction.reply({
        content: 'Ocorreu um erro ao obter o ranking.',
        ephemeral: true,
      });
    }
  },
};
