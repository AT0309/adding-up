'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
var a=new Map();
rl.on('line', line => {
    if(line.split(',')[0]=='2010'||line.split(',')[0]=='2015'){
        var value=a.get(line.split(',')[1]);
        if(!value){
            value={
                p2010:0,
                p2015:0,
                change:null
            }
        }
        if(line.split(',')[0]=='2010'){
            value.p2010=parseInt(line.split(',')[2])+parseInt(line.split(',')[3]);
        }else{
            value.p2015=parseInt(line.split(',')[2])+parseInt(line.split(',')[3]);
        }
        a.set(line.split(',')[1],value);
    }
});



rl.on('close',() => {
    for(var [key,value] of a){
        value.change=value.p2015/value.p2010;
    }
    const rankingArray = Array.from(a).sort((a,b) => {
        console.log(b[1].change+" "+a[1].change);
        return b[1].change - a[1].change;
    });
    for(var [key,value] of rankingArray){
        console.log(key," ",value.p2010,"==>",value.p2015," ",value.change);
    }
});