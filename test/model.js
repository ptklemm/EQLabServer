const fs  = require('fs-extra');
const path = require('path');
const os = require("os");


const zoneName = 'abysmal';
const model = os.EOL + 'PHIL,PHIL'
const filename = path.resolve(__dirname + `/../../files/chr/${zoneName}_chr.txt`);


fs.readFile(filename)
  .then(data => {
    if (!data.includes(model)) {
      data = data.toString();


      let oldNumber = data.match(/\b\d+\b/);
      let newNumber = (parseInt(oldNumber[0], 10) + 1).toString();
      let newData = data.replace(oldNumber, newNumber);
      newData = newData.trim();
      newData = newData.concat(model);

      fs.writeFile(filename, newData)
        .then(() => {
          console.log('success')
        })
        .catch(error => {
          console.log(error);
        })

    }
    
  })
  .catch(error => {
    console.log(error)
  });

fs.readdir(path.resolve(__dirname + '/../../files/chr/'))
  .then(files => {

    for (let i = 0, len = files.length; i < len; i++) {
      let currentFile = files[i];
      if (!!currentFile.match(/(_chr\.txt)/gi)) {
        let filename = path.resolve(__dirname + `/../../files/chr/${currentFile}`);

        fs.readFile(filename)
          .then(data => {
            if (!data.includes(model)) {

              data = data.toString();
              let oldNumber = data.match(/\b\d+\b/);
              let newNumber = (parseInt(oldNumber[0], 10) + 1).toString();
              let newData = data.replace(oldNumber, newNumber);
              newData = newData.trim();
              newData = newData.concat(model);

              fs.writeFile(filename, newData)
                .then(() => {
                  console.log('success')
                })
                .catch(error => {
                  console.log(error);
                })

            }
            
          })
          .catch(error => {
            console.log(error)
          });

      }
    }

  })
  .catch(error => {
    console.log(error);
  })