const { MessageEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
        var member = message.mentions.users.first() || message.author;
        let erkek = db.get(`erkek_${member.id}`) || 0
        let kız = db.get(`kız_${member.id}`) || 0
        let toplam = db.get(`toplam_${member.id}`) || 0
        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setTitle("Kayıt Bilgisi")
            .setDescription(`\n \`Toplam: ${toplam}\` \n \`Erkek: ${erkek}\` \n \`Kız: ${kız}\` `)
        message.channel.send(embed).then(x => x.delete({ timeout: 50000 }));
}
  
exports.conf = {

enabled: true,

guildOnly: false,

aliases: ["teyit-say","t-say","kayıtsay"],

permLevel: 0

}

exports.help = {

name: "kayıt-say"
}