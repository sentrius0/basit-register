// BU BOT TAMAMEN Sentrius#1704 TARAFINDAN KODLANMIŞTIR EN BASİT REGİSTER ALTYAPISIDIR BİR HATA ALIRSANIZ HESABIMA YAZABİLİRSİNİZ




const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const db = require("quick.db");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);


//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " PİNGLENDİ ");
  response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;




////---SES
client.on("ready", () => {
  client.channels.cache.get(ayarlar.ses).join();
 
})


///--SESS SON


  const moment = require("moment")
  require("moment-duration-format")
  
  client.on("guildMemberAdd", async (member) => {
    moment.locale("tr");
    let kanal = client.channels.cache.get(ayarlar.kayıtkanal)
    await kanal.send(` ${member} **Sunucumuza Hoş Geldin!**
    **Seninle Birlikte ${member.guild.memberCount} Kişiyiz** `)
    member.roles.add(ayarlar.unreg)
    member.setNickname(ayarlar.otoisim)
    }); 


    
////---TAG KOMUTU BAŞI
client.on('message', msg => {
    if (msg.content.toLowerCase() === 'tag') {
        msg.channel.send("TAGINIZ");
  }
  });
    
  client.on('message', msg => {
    if (msg.content.toLowerCase() === '.tag') {
        msg.channel.send("TAGINIZ");
  }
  });
    
  client.on('message', msg => {
    if (msg.content.toLowerCase() === '!tag') {
        msg.channel.send("TAGINIZ");
  }
  });
  ////---TAG KOMUTU SONU
  


client.login(ayarlar.token);




  ///==========komutlar==========\\\




//------------------REGİSTER-------------///
  
  
  /////---TAG ROL BAŞI
  
  //TAGLI KATILDI BAŞI
  
   
      client.on('guildMemberAdd', (member) => {
      if (member.user.username.includes(ayarlar.tag)) {
          member.roles.add(ayarlar.taglırol)
          const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('Sentrius was here');
          client.channels.cache.get(ayarlar.taglog).send(embed.setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde __**${ayarlar.tag}**__ bulunuyor.`))
      }
  });  
     
  //--TAGLIO KATIOLDI SONU
  
  //--TAG ALDI BAŞI
  
  client.on("userUpdate", async function(oldUser, newUser) { 
      const guildID = ayarlar.sunucuıd//sunucu
      const roleID = ayarlar.taglırol
      const tag = ayarlar.tag//tag
      const chat = ayarlar.chat// chat
      const log2 = ayarlar.taglog // log kanalı
    
      const guild = client.guilds.cache.get(guildID)
      const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
      const member = guild.members.cache.get(newUser.id)
      const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('BLACK')
      if (newUser.username !== oldUser.username) {
          if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
              member.roles.remove(roleID)
              client.channels.cache.get(ayarlar.taglog).send(embed.setDescription(` ${newUser} isminden \`tag\` çıkartarak ailemizden ayrıldı!`))
          } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
              member.roles.add(roleID)
              client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`tag\` alarak ailemize katıldı`))
          }
      }
  
    })
  
  ///---TAGLI ALDI SONU
