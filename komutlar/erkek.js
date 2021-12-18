const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('BLACK').setThumbnail(message.author.avatarURL);

  
    if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi")).then(x => x.delete({ timeout: 10000 }));

  
    if(!message.member.roles.cache.has(ayarlar.registeryetkili)) return message.channel.send(embed.setDescription("Bu komutu Kullaya Yetkin Yetmiyor")).then(x => x.delete({ timeout: 10000 }));

  
  if (member.id === message.author.id) {
message.channel.send(embed.setDescription(`Kendinizi Kaydedemessiniz!`))
return;
};

    let name = args[1]
    let age = args[2]
    if (!name || !age) return message.channel.send(embed.setDescription(`Geçerli bir isim ve yaş belirtmelisin!`)).then(x => x.delete({ timeout: 10000 }));

    


    message.guild.members.cache.get(member.id).setNickname(`${tag} ${name} | ${age}`)
    db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (ERKEK)`);
    db.set(`kayıt_${member.id}`, true)
    db.add(`erkek_${message.author.id}`, 1)
    db.add(`toplam_${message.author.id}`, 1)
    await message.guild.members.cache.get(member.id).roles.remove(ayarlar.unreg)
    await message.guild.members.cache.get(member.id).roles.add(ayarlar.erkek)
    message.channel.send(embed.setDescription(`${member} üyesine  rolleri verilerek \`${name} | ${age}\` İsminde kayıt edildi! (ERKEK)`)).then(x => x.delete({ timeout: 10000 }));
}

exports.conf = {

enabled: true,

guildOnly: false,

aliases: ["e","man"],

permLevel: 0

}

exports.help = {
name: "erkek-kayıt",
}