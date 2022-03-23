const fs = require("fs");

const path = require("path");

function treeFn(dirPath) {
  if (dirPath == undefined) {
    console.log("Please Enter a Valid Path");
    return;
  }
  let doesExist = fs.existsSync(dirPath);
  if (doesExist == true) {
    treeHelper(dirPath, " ");
  }
}

function treeHelper(targetPath, indent) {
    // checking if it is file at thr targetPath
    let isFile = fs.lstatSync(targetPath).isFile();

     // if it is a file then printing it
    if (isFile == true) {
        let fileName = path.basename(targetPath);
        console.log(indent + "├── " + fileName);
        return;
    }

    // if it is not a file then it will be a directory/folder
    let dirName = path.basename(targetPath);
    console.log(indent + "└──" + dirName);

    // finding all files & folder inside dirName
    let children = fs.readdirSync(targetPath);

    for (let i = 0; i < children.length; i++) {
      let childpath = path.join(targetPath, children[i]);
      treeHelper(childpath, indent + "\t");
    }
}

module.exports = {
  tree: treeFn,
};