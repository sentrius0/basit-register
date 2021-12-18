const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  

   
       /* const mapping = {
            " ": "",
            "0": ayarlar.sıfır,
            "1": ayarlar.bir,
            "2": ayarlar.iki,
            "3": ayarlar.üç,
            "4": ayarlar.dört,
            "5": ayarlar.beş,
            "6": ayarlar.altı,
            "7": ayarlar.yedi,
            "8": ayarlar.sekiz,
            "9": ayarlar.dokuz,
        };*/
  
    if(!message.member.roles.cache.has(ayarlar.registeryetkili)) return message.channel.send("Bu komutu Kullaya Yetkin Yetmiyor").then(x => x.delete({ timeout: 10000 }));

        var tag = ayarlar.tag//tagınızı yazınız
        var etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "0000").size;
        var toplamAile = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0000").size;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag)).size
       /* var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
        var emotag = `${tag}`.split("").map(c => mapping[c] || c).join("")
        var emoses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")
        var emoetiket = `${etiket}`.split("").map(c => mapping[c] || c).join("")
        var emotoplam = `${toplamAile}`.split("").map(c => mapping[c] || c).join("")*/

        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))    
            .setDescription(` 
            \`>\` Sunucuda toplam **${toplamüye}** üye bulunmakta.
            \`>\` Sunucuda **${online}** aktif üye bulunmakta.
            \`>\` Sunucuda toplam tagımızı alan **${tag}** üye bulunmakta.
            \`>\` Sunucuda sesli sohbetlerde toplam **${Sesli}** üye bulunmakta`)
            .setThumbnail(message.author.avatarURL())
        message.channel.send(embed).then(x => x.delete({ timeout: 50000 }));
    }
    
exports.conf = {

enabled: true,

guildOnly: false,

aliases: [],

permLevel: 0

}

exports.help = {

name: "say"

}