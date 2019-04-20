const file = 'out.csv';
const fs = require('fs');
const csv = require('csv');

var ws = fs.createWriteStream('new' + file);

var parser = csv.parse({trim:true}, function(err, data) {

    for (var i=0; i<data.length; i++) {
        var outdata = "";
        for (var j=0; j<data[i].length; j++) {

            outdata = outdata + data[i][j].replace(/,/g, "").replace(/(h(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g, "").replace(/#/g, "").replace(/@arc_0x18/g, "");
            if ((j + 1) == data[i].length) {
                outdata = outdata + "\n";
            } else {
                outdata = outdata + ",";
            }
        }
        ws.write(outdata);
    }
}).on('end', () => {
  ws.end();
});

fs.createReadStream(file).pipe(parser);
