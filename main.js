let helpFunc = require('./commands/help');
let orgFun = require("./commands/organize");
let treeFunc = require("./commands/tree")
let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

switch(command){
    case "tree":
        // call tree function
        treeFunc.tree(path);
        break;
    case "organize": 
        // call organize function
        orgFun.organize(path);
        break;
    case "help":
        // call help function
        helpFunc.help();
        break;
    default:
        console.log("command not recognized");
        break;
}