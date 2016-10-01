var tmi = require("tmi.js");
var auth = require("./auth.js");
// var date = new Date();

var options = {
    options: {
        debug: true,
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
    client.color("Red");
    client.action("#orientirich", "is came");
    setTimeout(function(){
    client.say("#orientirich", "hello!");
    }, 3000);

});


client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;

    // Do your stuff.
    switch (message) {
        case "!test" : 
            client.action("#orientirich", "is here!");
        break;
        case "!bye" :
         if (userstate.username == auth.author){
               client.say ("#orientirich", "good bye!");
            setTimeout(function(){
                client.disconnect();
            },3000);
         }else{
               client.say ("#orientirich", "You are not my host");
              };
        break;
        case "!help" :
            client.say("#orientirich", "i have only !test now");
        break;
    }
});
