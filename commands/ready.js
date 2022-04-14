const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("r")
    .setDescription("Starts a ready check for the bois!"),
  async execute(interaction) {
    // Fortnite button
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("Forknife")
          .setLabel("FORKNIFE")
          .setStyle("PRIMARY")
      )

      //Valorant button
      .addComponents(
        new MessageButton()
          .setCustomId("Valorant")
          .setLabel("VALORANT")
          .setStyle("DANGER")
      )

      // Other button
      .addComponents(
        new MessageButton()
          .setCustomId("Other")
          .setLabel("OTHER")
          .setStyle("SECONDARY")
      );

    // Ready button
    const ready = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("ready")
          .setLabel("READY")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("unready")
          .setLabel("UNREADY")
          .setStyle("DANGER")
      );

    // Select a game embed
    const embedGamePick = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("SELECT A GAME FUCKO!")
      .setDescription("ReadyBoi Beta V69.0.0")
      .setTimestamp();

    await interaction.reply({
      embeds: [embedGamePick],
      components: [row],
      ephemeral: true,
    });

    const embedReadyCheck = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`READY UP FUCKOS!`)
      .setDescription("ReadyBoi Beta V69.0.0")
      .setTimestamp();

    const collector = interaction.channel.createMessageComponentCollector({});
    let usernames = [];
    collector.on("collect", (interaction) => {
      if (interaction.customId === "ready") {
        usernames.push(" " + interaction.user.username + " ");

        // Add Names to Embed

        const newEmbedWithNames = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`READY UP FOR `)
          .addField("Current Roster:", `${usernames}`)
          .setTimestamp();

        interaction.update({ embeds: [newEmbedWithNames] });
      } else if (interaction.customId === "notready") {
        for (let i = 0; i < usernames.length; i++) {
          if (usernames[i] === " " + interaction.user.username + " ") {
            usernames.splice(i, 1);
            i--;
          }
        }

        // remove names from roster
        const newEmbedWithNames = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`READY UP FOR `)
          .addField("Current Roster:", `${usernames}`)
          .setTimestamp();

        interaction.update({ embeds: [newEmbedWithNames] });
      } else {
        interaction.reply({
          ephemeral: false,
          embeds: [embedReadyCheck],
          components: [ready],
        });
      }
    });
  },
};
