import { useCallback, useEffect, useState } from "react"
import { MessageInfoType, messageType } from "../../api/types/ResponseType"
import { useAppSelector } from "../../redux/store"
import { firebase } from "@react-native-firebase/firestore"

export const useChatMessageHook = ({ discussionId }: { discussionId: string }) => {
    const [loader, setLoader] = useState(false)
    const [chatMessages, setChatMessages] = useState<messageType[]>([])
    const [lastDoc, setLastDoc] = useState<any>(null)
    const userDetails = useAppSelector(state => state.userreducer.userDetails)

    const MessageLimit = 20
    const db = firebase.firestore()
    const getMessages = useCallback(async () => {
        if (!discussionId || !lastDoc) return;
        try {
            const snapshot = await db
                .collection("Discussion")
                .doc(discussionId)
                .collection("messages")
                .orderBy("sentAt", "desc")
                .startAfter(lastDoc)
                .limit(MessageLimit)
                .get();

            const moreMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMessages(prev => [...prev, ...moreMessages]); // Append to existing list

            if (snapshot.docs.length > 0) {
                setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            }
        } catch (error) {
            console.error("Error loading more messages:", error);
        } finally {
        }
    }, [discussionId, userDetails?.uid]);

    useEffect(() => {
        const userId = userDetails?.uid;
        if (!userId || !discussionId) return;
        let query = db
            .collection("Discussion")
            .doc(discussionId)
            .collection("messages")
            .orderBy("sentAt", "desc")
            .limit(MessageLimit);

        if (lastDoc) {
            query = query.startAfter(lastDoc);
        }

        const unsubscribe = query.onSnapshot(
            snapshot => {
                const messages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('messages', messages)
                if (!lastDoc && snapshot.docs.length > 0) {
                    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
                }

                setChatMessages(messages);
            },
            error => {
                console.error("Error fetching messages:", error);
            }
        );
        return () => unsubscribe();
    }, [discussionId, userDetails?.uid]);

    const removeUnreadCount = useCallback(async () => {
        db.collection("Discussion")
            .doc(discussionId)
            .update({
                [`participants.${userDetails.uid}.UnreadCount`]: 0,
                [`participants.${userDetails.uid}.lastSeenAt`]: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                console.log("Unread count removed successfully!");
            })
            .catch(error => {
                console.error("Error removing unread count:", error);
            });
    }, [discussionId, userDetails?.uid])

    const updateUnreadCountForOthers = useCallback(async (discussionId: string, senderId: string) => {
        const db = firebase.firestore();

        try {
            const docRef = db.collection("Discussion").doc(discussionId);
            const docSnap = await docRef.get();

            if (!docSnap.exists) return;

            const participants = docSnap.data()?.participants || {};
            const updateObj: Record<string, any> = {};

            Object.keys(participants).forEach(participantId => {
                if (participantId !== senderId) {
                    updateObj[`participants.${participantId}.UnreadCount`] = firebase.firestore.FieldValue.increment(1);
                }
            });

            await docRef.update(updateObj);
            console.log("Unread count updated for all other participants.");
        } catch (error) {
            console.error("Error updating unread counts:", error);
        }
    }, [discussionId, userDetails?.uid])

    const sendMessage = useCallback(async (message: string) => {
        db
            .collection("Discussion")
            .doc(discussionId)
            .collection("messages")
            .add({
                sentBy: userDetails?.uid,
                message,
                sentAt: firebase.firestore.FieldValue.serverTimestamp(),
                "isDelete": false,
                "messageType": message,
                "edited": false,
                "editedAt": firebase.firestore.FieldValue.serverTimestamp(),
                "media": null
            })
            .then(async () => {
                console.log("Message sent successfully!");
                db.collection("Discussion").doc(discussionId).update({ last_message: message })
                await updateUnreadCountForOthers(discussionId, userDetails?.uid)
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });

    }, [discussionId, userDetails?.uid])

    const deleteMessage = async () => {

    }

    return { loader, chatMessages, removeUnreadCount, getMessages, sendMessage, deleteMessage }
}