const file = 'tweets.csv';
const fs = require('fs');
const csv = require('csv');

const parser = csv.parse({trim:true}, function(error, data) {

    //�ϊ���̔z����i�[
    let newData = [];

    //���[�v���Ȃ���P�s������
    data.forEach((element) => {
        let row = [];
        if(element[6] === "" && element[1] === "" && element[2] === ""){
          row.push(element[5]);
        //�V����1�s���̔z��(row)���쐬���A�V�z��(newData)�ɒǉ��B
        newData.push(row);
        }

    })

    csv.stringify(newData,(error,output)=>{
        fs.writeFile('out.csv',output,(error)=>{})
    })
})
//�ǂݍ��݂Ə��������s
fs.createReadStream(file).pipe(parser);

//�Q�ƁFhttps://qiita.com/zaburo/items/f7f091c13a69c3b8f935
