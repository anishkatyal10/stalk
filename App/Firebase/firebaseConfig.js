import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBYoqgoJ8d1hemOWCapbgJPbkT3JM8uDHs",
    databaseURL: "https://stalk-9ec4e-default-rtdb.firebaseio.com/",
    projectId: "stalk-9ec4e",
    appId: "1:970762741663:android:cead4257df8ef844857faa"
}
export default Firebase.initializeApp(firebaseConfig)