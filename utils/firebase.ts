import "firebase/compat/auth";
import { User } from "firebase/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  orderBy,
  limit,
  query,
  getDocs,
  Timestamp,
} from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
});

const auth = app.auth();
const db = app.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

const writeMessage = async (
  chatId: string,
  user: User,
  textMessage: string
) => {
  // Timestamp generation
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Write Message in Database
  await addDoc(collection(db, ["chats", chatId, "messages"].join("/")), {
    profilePicUrl: user.photoURL,
    authorId: user.uid,
    text: textMessage,
    timestamp: timestamp,
  });

  // Update lastMessage info in Database
  const docRef = doc(db, "chats", chatId);
  const docSnap = await getDoc(docRef).then(() =>
    updateDoc(docRef, {
      lastMessage: timestamp,
    })
  );
};

interface message {
  timestamp: Timestamp;
  profilePicUrl: string;
  text: string;
  authorId: string;
}

const checkGilbert = async (chatId: string) => {
  const docRef = doc(db, "chats", chatId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const chatInfo = docSnap.data();
    // If Gilbert, we retrieve all messages data for OpenAi API
    if (chatInfo.private && chatInfo.membersUid[1] === "Gilbert") {
      const messagesQuery = query(
        collection(db, ["chats", chatId, "messages"].join("/")),
        orderBy("timestamp")
      );

      let chatGilbert:message[] = [];
      const querySnapshot = await getDocs(messagesQuery);
      querySnapshot.forEach((doc: any) => chatGilbert.push(doc.data()));
      return chatGilbert;
    }
  }
  return null;
};

export { auth, db, provider, writeMessage, checkGilbert };
export type {message}
