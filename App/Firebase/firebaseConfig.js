import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyDe8NHlF8KL5RrvpqELCUZ4MrfGKqPNM5o",
    databaseURL: "https://sstalk-64300-default-rtdb.firebaseio.com/",
    projectId: "sstalk-64300",
    appId: "1:836338275732:android:d415f23d2f469c5296eb81"
}
export default firebase.initializeApp(firebaseConfig)