var tmi = require("tmi.js");
var auth = require("./auth.js");
// var date = new Date();
var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "bjiastbot",
        password: auth.key
    },
    channels: ["#orientirich"]
};

var client = new tmi.client(options);

// Connect the client to the server..
client.connect();
client.on("connected", function (address, port) {
   
});


client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;

    // Do your stuff.
    switch (message) {
        case "!test" : 
            client.action(channel, "is here!");
        break;
        case "!channels":
            var arr = client.getChannels(),
            mess = "";
            for (i = 0; i < arr.length; i++){
                mess += arr[i] + ", ";
            };
            client.say(channel, mess);
        break;
        case "!joinme" :
            var chan = "#" + userstate['username'];
            if (channel == chan){
            client.say(channel, "hey,i`m here!");
            }else {
                client.join(userstate['username']);
                client.say(channel, "I have joined to " + userstate['display-name'] + "`s channel");
           };
        break;
        case "!help" :
            client.say(channel, "i have only !test now");
        break;
    }
});

client.on("join", function (channel, username, self) {
    if (self) {
        client.color("Red");
        client.action(channel, "is came");
        setTimeout(function(){
        client.say(channel, "hello!");
        }, 3000);
    };

});

// Admin control

client.on("chat", function (channel, userstate, message, self) {
    
    if (self) return;
     if (userstate.username == auth.author){

        switch (message) {
          case "!bye" :
          console.log("=========[Father authentification success!]===========");
            client.say (channel, "good bye!");
            setTimeout(function(){
                client.disconnect();
            },3000);
        break
        }
    }else{
            client.say (channel, "You are not my host");
               
    };
});
