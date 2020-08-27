import firebase from '../../plugins/firebase';

export const firebaseLogin = async (email, password) => {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserIdToken = async () => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    // console.log(token);
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const firebaseLogout = async () => {
  try {
    const data = await firebase.auth().signOut();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const firebaseSignUp = async (email, password) => {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

firebase.auth().onAuthStateChanged((authUser) => {
  authUser
    ? localStorage.setItem('authUser', JSON.stringify(authUser))
    : localStorage.removeItem('authUser');
});
