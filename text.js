const file = 'tweets.csv';
const fs = require('fs');
const csv = require('csv');

const parser = csv.parse({trim:true}, function(error, data) {

    //変換後の配列を格納
    let newData = [];

    //ループしながら１行ずつ処理
    data.forEach((element) => {
        let row = [];
        if(element[6] === "" && element[1] === "" && element[2] === ""){
          row.push(element[5]);
        //新たに1行分の配列(row)を作成し、新配列(newData)に追加。
        newData.push(row);
        }

    })

    csv.stringify(newData,(error,output)=>{
        fs.writeFile('out.csv',output,(error)=>{})
    })
})
//読み込みと処理を実行
fs.createReadStream(file).pipe(parser);

//参照：https://qiita.com/zaburo/items/f7f091c13a69c3b8f935
