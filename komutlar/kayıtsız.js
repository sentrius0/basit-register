const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('BLACK').setThumbnail(message.author.avatarURL);
 
 
    if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi")).then(x => x.delete({ timeout: 10000 }));
  
 
    if(!message.member.roles.cache.has(ayarlar.registeryetkili)) return message.channel.send(embed.setDescription("Bu komutu Kullaya Yetkin Yetmiyor")).then(x => x.delete({ timeout: 10000 }));
 
      if (member.id === message.author.id) {
message.channel.send(embed.setDescription(`Kendinizi Kayıtsıza Atamassınız!`))
return;
};


    message.guild.members.cache.get(member.id).setNickname(`${tag} İsim | Yaş`)
    await message.guild.members.cache.get(member.id).roles.set([ayarlar.unreg])
     message.channel.send(embed.setDescription(`${member} Adlı Kullanıcı Kayıtsıza Atıldı`)).then(x => x.delete({ timeout: 30000 }));

}

exports.conf = {

enabled: true,

guildOnly: false,

aliases: ["kayıtsız","unreg"],

permLevel: 0

}

exports.help = {

name: "unregister"
}