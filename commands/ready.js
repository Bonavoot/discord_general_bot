const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("r")
    .setDescription("Starts a ready check for the bois!"),

  async execute(interaction) {
    // Select a game embed buttons

    const row = new MessageActionRow()
      // Forknife
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
    let usernames = ["Me "];

    await interaction.reply({
      content: "Pick a game fucko",
      components: [row],
      ephemeral: true,
    });

    const embedReadyCheck = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`READY UP FOR `)

      .addField("Current Roster:", `${usernames}`)
      .setTimestamp();

    const collector = interaction.channel.createMessageComponentCollector({});

    collector.on("interactionCreate", (interaction) => {
      if (!interaction.isButton()) return;

      const btn_id = interaction.customId;
      console.log(btn_id);
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "ready") {
        if (usernames.includes(" " + interaction.user.username + " ")) return;

        usernames.push(" " + interaction.user.username + " ");

        // Add Names to Embed

        const newEmbedWithNames = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`READY UP FOR `)
          .addField("Current Roster:", `${usernames}`)

          .setTimestamp();

        interaction.update({ embeds: [newEmbedWithNames] });
      } else if (interaction.customId === "unready") {
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
