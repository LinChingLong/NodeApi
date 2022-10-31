const {createReadSteam} = require('fs');
const parse = require('csv-parse');

const rows = [];
createReadSteam('../test.csv')
    .pipe(parse())
    .on('data',function(row){
        console.log(row);
        rows.push(row)
    })
    .on('end',function(){
        console.log(rows);       
    });