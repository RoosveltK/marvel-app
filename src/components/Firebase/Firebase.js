import app from "firebase/app";

const config = {
  apiKey: "AIzaSyBiUjYNAcAHYIV2yEA-rZ-JQkEU3eytB6M",
  authDomain: "marvel-quiz-app-f813b.firebaseapp.com",
  projectId: "marvel-quiz-app-f813b",
  storageBucket: "marvel-quiz-app-f813b.appspot.com",
  messagingSenderId: "923759599112",
  appId: "1:923759599112:web:5eea1410b8ac854f25fbbd",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
