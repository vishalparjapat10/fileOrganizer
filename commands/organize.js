const fs = require("fs");
const path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}

function organize(srcPath){
    // 1. to check if srcPath is present
    if(srcPath == undefined){
        srcPath = process.cwd();//The process.cwd() method returns the current working directory of the Node.js process.
    }

    // 2. to create a directory by the name of organized_files
    // let organizedFiles = srcPath + "/" + "organized_files";
    // OR
    let organizedFiles = path.join(srcPath,"organized_files");// this will join organized-files folder to the srcPath and will return the path

    // checking if there is already folder available or not, if it is not then only we can make folder otherwise it will give error if we again make folder with the same name
    if(!fs.existsSync(organizedFiles)){
        fs.mkdirSync(organizedFiles);// this will create the folder at newly created/joined path
    }
    else{
        console.log("Folder already exists");
    }
    // 3. scan the enire srcPath(downloads folder in our case) 

    let allFiles = fs.readdirSync(srcPath);// reads the content of the directory (inside downloads folder in our case) i.e reads the names of files present inside downloads folder

    // 4. traverse over all the files and classify them on the basis of their extension(.pdf,.mp3 etc.)

    for(let i = 0;i < allFiles.length;i++){

        let fullPathOfFile = path.join(srcPath,allFiles[i]);
        // lstatSync gives the info regarding the link provided 
        
        // 1. Check if it is a file or folder
        let isFile = fs.lstatSync(fullPathOfFile).isFile();
        if(isFile){
            // 1.1 get ext name
            let ext = path.extname(allFiles[i]).split(".")[1];
            // 1.2 get folder name from extension
            let folderName = getFolderName(ext);
            // 1.3 copy from src folder(srcPath) and paste in dest folder (folder_name e.g document,media etc.)
            // srcPath - the path from where the file to be copied
            // fullPathOfFile - the full path file file which is to be copied
            // folderName - destination folder where file is to be paste
            copyFileToDest(srcPath,fullPathOfFile,folderName);
        }
            
    }
}

function getFolderName(ext){
    for(let key in types){
        for(let i = 0;i < types[key].length ;i++){
            if(types[key][i] == ext){
                return key;
            }
        }
    }
    return "miscellaneous";// in case there is a special or undefined extension which is not mentioned in "types"
}

function copyFileToDest(srcPath,fullPathOfFile,folderName){
    // 1. first we will have to make folderName path
    let destFolderPath = path.join(srcPath,"organized_files",folderName);
    // 2 check folder, if exists,if it does not,then make folder
    if(!fs.existsSync(destFolderPath)){
        fs.mkdirSync(destFolderPath);
    }
    // 3. copy file from src folder to dest folder
    let fileName = path.basename(fullPathOfFile);//Returns the last portion of a path
    let destFileName = path.join(destFolderPath,fileName);
    fs.copyFileSync(fullPathOfFile,destFileName)
}
// let srcPath = "C:\\Users\\Vishal\\Downloads\\PepCoding\\Course Projects\\fileOrganizer\\downloads";


module.exports = {
    organize:organize
}