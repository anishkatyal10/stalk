import Firebase from './firebaseConfig';

export const SignInUser = async (email, password) => {
  try {
    return await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );
  } catch (error) {
    return error;
  }
};
