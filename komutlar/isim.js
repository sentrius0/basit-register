const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');


exports.run = async (client, message, args) => {
  
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('BLACK').setThumbnail(message.author.avatarURL);
  
  
  if(!message.member.roles.cache.has(ayarlar.registeryetkili)) return message.channel.send(embed.setDescription("Bu komutu Kullaya Yetkin Yetmiyor"))


  
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))

   
    let name = args[1]
    let age = args[2]
    if (!name || !age) return message.channel.send(embed.setDescription(`Geçerli bir isim ve yaş belirtmelisin!`))
        .then(x => x.delete({ timeout: 10000 }));


    if (member.id === message.author.id) {
message.channel.send(embed.setDescription(`Kendi İsminizi Değiştiremessiniz!`))
return;
};



        message.guild.members.cache.get(member.id).setNickname(`${ayarlar.tag} ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (İSİM DEĞİŞTİRME)`);
        message.channel.send(embed.setDescription(`${member} adlı kullanıcının ismi \`${name} | ${age}\` olarak değiştirildi`)
                  

  ).then(x => x.delete({ timeout: 30000 }));
  
}
                             

exports.conf = {

enabled: true,

guildOnly: false,

aliases: ["isim","isim-değiştir","isimdeğiştir","i"],

permLevel: 0

}

exports.help = {

name: "nick"
}