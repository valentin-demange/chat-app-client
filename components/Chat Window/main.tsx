import styles from "./styles.module.css";
import ChatHeader from "./chatHeader";
import ChatBody from "./chatBody";
import ChatFooter from "./chatFooter";

export default function ChatWindow() {
  return (
    <div className={styles.chatContainer}>
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}




