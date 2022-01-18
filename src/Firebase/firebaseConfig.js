import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyCQ4uLn-1v2t1gQb_z9S9d0bWbCXtkhqnM",
    databaseURL: "https://stalk-b1a12-default-rtdb.firebaseio.com/",
    projectId: "stalk-b1a12",
    appId: "1:64519171575:android:bad53a717f9b6f00fb12f2"
}
export default firebase.initializeApp(firebaseConfig)