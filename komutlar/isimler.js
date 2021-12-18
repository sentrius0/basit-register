const { MessageEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');


exports.run = async (client, message, args) => {
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       
        if (!member) return message.channel.send("Öncellikle Bir Kullanıcı Belirtmelisin.")
  
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcının Daha Öncedenki İsmi Bulunmuyor.")
        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setTimestamp()
        message.channel.send(embed).then(x => x.delete({ timeout: 50000 }));
    }



exports.conf = {

enabled: true,

guildOnly: false,

aliases: ["isimler"],

permLevel: 0

}

exports.help = {

name: "önceki-isimler",

description: "Önceki iSİMLERİ gÖRÜNTÜLEMENİZİ sağlar.",

usage: "isimler"

}