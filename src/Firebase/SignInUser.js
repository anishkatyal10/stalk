import Firebase from './firebaseConfig';
import auth from '@react-native-firebase/auth'

export const SignInUser = (email, password) => {
  try {
    return auth().signInWithEmailAndPassword(
      email,
      password
    );
  } catch (error) {
    return error;
  }
};
