const fs = require('fs');
const msg = fs.readFileSync("newout.csv", {encoding: "utf-8"});

var twitter = require('twitter');
var bot = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

var kuromoji = require('kuromoji');
var builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict'
});

class Markov {
  constructor(n) {
    this.data = {};
  }

  add(words) {
    for(var i = 0; i <= words.length; i++) {
      var now = words[i];
      if(now === undefined) { now = null };
      var prev = words[i - 1];
      if(prev === undefined) { prev = null };

      if(this.data[prev] === undefined) {
        this.data[prev] = [];
      }
      this.data[prev].push(now);
    }
  }

  sample(word) {
    var words = this.data[word];
    if(words === undefined) { words = []; }

    return words[Math.floor(Math.random() * words.length)];
  }

  make() {
    var sentence = [];
    var word = this.sample(null);
    while(word) {
      sentence.push(word);
      word = this.sample(word);
    }
    return sentence.join('');
  }
}

var markov = new Markov();

builder.build(function(err, tokenizer) {
  if(err) { throw err; }

   fs.readFile('newout.csv', 'utf8', function(err, data) {
     if(err) { throw err; }

     var lines = data.split("\n");
     lines.forEach(function(line) {
       var tokens = tokenizer.tokenize(line);

       var words = tokens.map(function(token) {
         return token.surface_form;
       });

       markov.add(words);
     });

     var tweetmsg =  markov.make();
     bot.post('statuses/update',
         { status:tweetmsg},
         function (error, tweet, response) {
             if (!error) {
                 console.log(tweetmsg)
             }
         });
   });
 });
