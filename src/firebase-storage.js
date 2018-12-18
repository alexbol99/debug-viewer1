import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDMUAcjgolAlapdpFmPEz8SaId1DZw7MpQ",
    authDomain: "debug-viewer.firebaseapp.com",
    databaseURL: "https://debug-viewer.firebaseio.com",
    projectId: "debug-viewer",
    storageBucket: "debug-viewer.appspot.com",
    messagingSenderId: "736075300479"
};
firebase.initializeApp(config);
const storage = firebase.storage();

export default storage;
