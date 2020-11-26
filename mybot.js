const Discord = require("discord.js");
//const message = new Discord.Message();
//const presence = new  Discord.Presence();
const client = new Discord.Client();
const config = require ("./config.json");
const prefix = config.prefix;


client.on("ready", () => {
   console.log(`He conectado con ${client.user.tag}!`);
   client.user.setPresence({
     status: "online",
     game: 
     {
       name: '-help | Estoy aqui para ayudar :D',
       type: "PLAYING"
     }
   });
});

//Bienvenida

client.on("guildMemberAdd", (member) => 
{
  console.log(`Nuevo usuario: ${member.user.username} se ha unido a ${member.guild.name}.`);
  var canal = client.channels.get('755184848792191007');
  canal.send(`${member.user}, por fin llegas mai frien, te estabamos esperando, pasala bien :D`);
})


//Deteccion de fallas

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.debug(e));

//action bot

client.on("message", (message) => {

  //actions arg

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase().slice(prefix);

  let texto = args.join(" ");
  if(command === 'decir'){
      if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);
      message.channel.send(texto);
      
  }

  if(command === '8ball'){
    const user = message.author;
    var rpts = ["Sí", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente?", " ¡Claro! "," Sí "," No "," Por supuesto! "," Por supuesto que no "];
    var respu = rpts[Math.floor(Math.random() * rpts.length)];
    if (!texto) return message.reply(`Escriba una pregunta.`);
    message.channel.send(`**${user}**`+' a su pregunta `'+texto+'` mi respuesta es: `'+ `**${respu}**` +'`');

}

switch (command){
  case "ping": 
      message.channel.send('Pong!');
      break;
  case "decir": 
      if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);
      message.channel.send(texto);
      break;
}

if(command === 'kick' ){

  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');
  
  //if (user) console.log(mentions.id);
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
  if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
  if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
  if (message.mentions.users.equals(null)) return message.reply('El usuario no existe en este servidor.').catch(console.error);
   
  message.guild.member(user).kick(razon);
  message.channel.send(`**${user.username}**, fue pateado del servidor, razón: ${razon}.`);

}

const msg = message.content.includes('caca');

if (msg) {
  
  const user = message.author;

  return message.channel.send(`**${user}**, no digas eso bro :)`);
  message.channel.fetch("755184848792191008").then(message => message.delete).catch(console.error);

}

// Avatar la leyenda de aang
/*
if(command === 'avatar'){

      let img = message.mentions.users.first()
      if (!img) {

          const embed = new Discord.RichEmbed()
          .setImage(`${message.author.avatarURL}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
          message.channel.send({ embed });

      } else if (img.avatarURL === null) {

          message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

      } else {

          const embed = new Discord.RichEmbed()
          .setImage(`${img.avatarURL}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
          message.channel.send({ embed });

      };

  }
*/
// Ban

if(command === 'ban'){
    
  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');

  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
  if(!razon) return message.channel.send('Escriba un razón, `-ban @username [razón]`');
  if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
  

  message.guild.member(user).ban(razon);
  message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);

}

//Server

if(command === 'server'){
  var server = message.guild;

  const embed = new Discord.MessageEmbed()
  .setThumbnail(server.iconURL)
  .setAuthor(server.name, server.iconURL)
  .addField('ID', server.id, true)
  .addField('Region', server.region, true)
  .addField('Creado el', server.joinedAt.toDateString(), true)
  .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
  .addField('Miembros', server.memberCount, true)
  .addField('Roles', server.roles.size, true) //no messirve 
  .setColor(0x66b3ff)
  
 message.channel.send({ embed });

}

//User

if(command === 'user'){
  //const guilder = new Discord.GuildMember();
  let userm = message.mentions.users.first();
  if(!userm){
    var user = message.author;
    //let myrole = guilder.roles.cache.get(`**${user}**`);
    
      const embed = new Discord.MessageEmbed();
      embed.setImage(user.displayAvatarURL());
      embed.setAuthor(user.username+'#'+user.discriminator);
      /*reparar*/embed.addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true);
      embed.addField('ID', user.id, true);
      /*reparar*/embed.addField('Estado', message.author.presence.status);
      embed.addField('Apodo', message.member.nickname, true);
      embed.addField('Cuenta Creada', user.createdAt.toDateString(), true);
      embed.addField('Fecha de Ingreso', message.member.joinedAt.toDateString());
      //reparar/embed.addField('Roles', + message.author.roles(roles => roles.name));
      embed.setColor(0x66b3ff);
      
     message.channel.send({ embed });
  }else{
    const embed = new Discord.MessageEmbed();
    embed.setThumbnail(userm.displayAvatarURL());
    embed.setAuthor(userm.username+'#'+userm.discriminator);
    embed.addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true);
    embed.addField('ID', userm.id, true);
    embed.addField('Estado', userm.presence.status, true);;
    embed.addField('Cuenta Creada', userm.createdAt.toDateString(), true);
    embed.setColor(0x66b3ff);
    
   message.channel.send({ embed });
  }
  
}

// Pingggg

if (command === 'ping') {

  let ping = Math.floor(message.client.ping);
  
  message.channel.send(":ping_pong: Pong!")
    .then(m => {

        m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
    
    });
  
}

//Colecciones

//let servidoresgrandes = client.guilds.filter(g => g.memberCount > 100);

//const servernombres = client.guilds.map(g => g.name).join("/n");

//const tags = client.users.map(u => `${u.username}#${u.discriminator}`).join(", ");

//Combinacion de colecciones

//const serverpequeños = client.guilds.filter(g => g.memberCount < 10).map(g => g.name).join("/n");

//Trabajo con roles

//let mirol = message.guild.roles.get("1234567890");

//let mirol = message.guild.roles.find("name", "Administrador");

//Comprobacion de roles

if(command === 'rol')
{
  if(!args) return message.channel.send('Ingrese nombre del rol');
  let mirol = message.guild.roles.cache.find("name", args.join(" "));
  if(!mirol) return message.channel.send('Rol no encontrado en este server');

  if(message.member.roles.has(mirol.id)) 
  {
    message.channel.send('Si tienes el rol: `'+mirol.name+'`.');
  } else {
    message.channel.send('No tienes el rol: `'+mirol.name+'`.');
  }
}

if(command === 'miembrosrol')
{
  if(!args) return message.channel.send('Ingrese el nombre del rol');
  let rol = message.guild.roles.cache.find("name", args.join(" "));
  if(!rol) return message.channel.send('Rol no encontrado en este server');
  let miembroroles = message.guild.roles.cache.get(rol.id).members;
  message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);
}

//añadir rol


if(command === 'addrol'){

  let miembro = message.mentions.members.first();
  let nombrerol = args.slice(1).join(' ');

  let role = message.guild.roles.cache.find(role => role.name === nombrerol);
  let perms = message.member.hasPermission("MANAGE_ROLES", "MANAGE_ROLES_OR_PERMISSIONS");

  if(!perms) return message.channel.send("`Error` `|` No tienes permisos para usar este comando.");
   
  if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
  if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `-addrol @username [rol]`');
  if(!role) return message.channel.send('Rol no encontrado en el servidor.');
  
  miembro.roles.add(role.id).catch(console.error);
  message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);

}

if (command === 'removerol')
{
  let miembro = message.mentions.members.first();
  let nombrerol = args.slice(1).join(' ');

  let role = message.guild.roles.cache.find(r => r.name === nombrerol);
  let perms = message.member.hasPermission("MANAGE_ROLES", "MANAGE_ROLES_OR_PERMISSIONS");

  if(!perms) return message.channel.send("`Error` `|` No tienes permisos para usar este comando ");

  if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
  if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover, `-removerol @username [rol]`');
  if(!role) return message.channel.send('Rol no encontrado en este server.');

  miembro.roles.remove(role.id).catch(console.error);
  message.channel.send(`El rol **${role.name}** del miembro **${miembro.user.username}** fue removido correctamente`);
}


});//Cerrar todo

client.login(config.token); 

