import Firebase from 'firebase'
import 'firebase/firestore'
var config = {
                apiKey: 'AIzaSyDATz2gJZ1ELZDpMbGcu1qq9jPY1F6TC-A',
                authDomain: 'notice-board-iot.firebaseapp.com',
                databaseURL: 'https://notice-board-iot.firebaseio.com',
                projectId: 'notice-board-iot',
                storageBucket: 'notice-board-iot.appspot.com',
                messagingSenderId: '874859684056'
              };
  var firebaseapp = firebase.initializeApp(config);
  export default firebaseapp.firestore()
  firebaseapp.firestore().settings({ timestampsInSnapshots : true});
