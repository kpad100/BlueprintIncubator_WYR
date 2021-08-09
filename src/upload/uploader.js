var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function(file) {
    var lastDotIndex = file.lastIndexOf(".");

    var menu = require("./files/" + file);

    menu.forEach(function(obj) {
      // var code = obj.code;
      // let mycode = code.substring(0, code.length-1);

      let mydoc = firestore.collection(file.substring(0, lastDotIndex)).doc(obj.code);
      // if(mydoc)
      //   {
      //     var fields = mydoc.get().then((doc) => {
      //       fields.
      //     })
      //     console.log(fields);
      //   }
      // else{
      firestore
        .collection(file.substring(0, lastDotIndex))
        .doc(obj.code)
        .set(obj)
        .then(function(docRef) {
          console.log("Document written");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      // }
    });
  });
});
