import database from '@react-native-firebase/database';

export const AddUser = async (name, email, phone, image, uid) => {
  try {
    return await database()
      .ref('users/' + uid)
      .set({
        name: name,
        email: email,
        phone: phone,
        image: image,
        uuid: uid,
      });
  } catch (error) {
    return error;
  }
};

