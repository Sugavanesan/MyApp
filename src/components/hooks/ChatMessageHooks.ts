import { useCallback, useEffect, useRef, useState } from "react"
import {  messageType } from "../../api/types/ResponseType"
import { useAppSelector } from "../../redux/store"
import { firebase, getFirestore } from "@react-native-firebase/firestore"

export const useChatMessageHook = ({ discussionId }: { discussionId: string }) => {
    const [loader, setLoader] = useState(false)
    const [chatMessages, setChatMessages] = useState<messageType[]>([])
    const [lastDoc, setLastDoc] = useState<any>(null)
    const [hasmoreData, setHasMoreData] = useState(false)
    const userDetails = useAppSelector(state => state.userreducer.userDetails)

    const db=getFirestore()
    const MessageLimit = 20

    const messageListenersRef = useRef([]);

    const getMessages = useCallback(async () => {
        if (!discussionId || !lastDoc || loader || !hasmoreData) return;

        setLoader(true);

        try {
            const query = db
                .collection("Discussion")
                .doc(discussionId)
                .collection("messages")
                .orderBy("sentAt", "desc")
                .startAfter(lastDoc)
                .limit(MessageLimit);

            const snapshot = await query.get();

            const moreMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            if (moreMessages.length === 0) {
                setHasMoreData(false);
            } else {
                const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
                setLastDoc(newLastDoc);
                setChatMessages(prevMessages => [...prevMessages, ...moreMessages]);

                // 🔁 Add listener for this page
                const unsubscribe = query.onSnapshot(snap => {
                    snap.docChanges().forEach(change => {
                        const data = { id: change.doc.id, ...change.doc.data() };
                        if (change.type === "modified") {
                            setChatMessages(prev =>
                                prev.map(msg => (msg.id === data.id ? data : msg))
                            );
                        }
                    });
                });

                messageListenersRef.current.push(unsubscribe);
            }
        } catch (error) {
            console.error("Error loading more messages:", error);
        } finally {
            setLoader(false);
        }
    }, [discussionId, userDetails?.uid, lastDoc, chatMessages, loader, hasmoreData]);


    useEffect(() => {
        const userId = userDetails?.uid;
        if (!userId || !discussionId || loader) return;
        setLoader(true);
        const fetchInitial = async () => {
            try {
                const snapshot = await db
                    .collection("Discussion")
                    .doc(discussionId)
                    .collection("messages")
                    .orderBy("sentAt", "desc")
                    .limit(MessageLimit)
                    .get();

                const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setChatMessages(messages);
                setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
                setHasMoreData(messages.length === MessageLimit);
            } catch (err) {
                console.error("Initial load failed", err);
            } finally {
                setLoader(false);
            }
        };

        fetchInitial();
    }, [discussionId]);

    useEffect(() => {
        if (!discussionId) return;

        const query = db
            .collection("Discussion")
            .doc(discussionId)
            .collection("messages")
            .orderBy("sentAt", "desc")
            .limit(MessageLimit);

        const unsubscribe = query.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                const data = { id: change.doc.id, ...change.doc.data() };
                if (change.type === "added") {
                    setChatMessages(prev => [data, ...prev]);
                } else if (change.type == 'modified') {
                    setChatMessages(prev => {
                        const index = prev.findIndex(item => item.id === data.id);
                        if (index !== -1) {
                            const updated = [...prev];
                            updated[index] = data;
                            return updated;
                        }
                        return prev;
                    });
                }
            });
        });

        return () => unsubscribe();
    }, [discussionId]);


    const removeUnreadCount = useCallback(async () => {
        db.collection("Discussion")
            .doc(discussionId)
            .update({
                [`participants.${userDetails.uid}.UnreadCount`]: 0,
                [`participants.${userDetails.uid}.lastSeenAt`]: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {

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
        } catch (error) {
            console.error("Error updating unread counts:", error);
        }
    }, [discussionId, userDetails?.uid])

    const sendMessage = useCallback(async (message: string) => {
        const newMessage = {
            sentBy: userDetails?.uid,
            message,
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            "isDelete": false,
            "messageType": "text",
            "edited": false,
            "editedAt": firebase.firestore.FieldValue.serverTimestamp(),
            "media": null
        }
        db
            .collection("Discussion")
            .doc(discussionId)
            .collection("messages")
            .add(newMessage)
            .then(async () => {
                db.collection("Discussion").doc(discussionId).update({ last_message: newMessage, updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
                await updateUnreadCountForOthers(discussionId, userDetails?.uid)
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });

    }, [discussionId, userDetails?.uid])

    const deleteMessage = useCallback(async (message: messageType) => {
        db.collection("Discussion")
            .doc(discussionId)
            .collection("messages")
            .doc(message.id)
            .update({ isDelete: true })
            .then(() => {
                db.collection("Discussion").doc(discussionId).update({
                    "last_message.isDelete": true,
                    "last_message.message": "",
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
            .catch(error => {
                console.error("Error deleting message:", error);
            });

    }, [discussionId, userDetails?.uid])

    return { loader, chatMessages, removeUnreadCount, getMessages, sendMessage, deleteMessage }
}

// export const uploadImage = async (imagePath: string): Promise<string> => {
//   try {
//     const fileName = `images/${Date.now()}_${imagePath.substring(imagePath.lastIndexOf('/') + 1)}`;
//     const reference = storage().ref(fileName);

//     await reference.putFile(imagePath); // 🚀 Native direct upload
//     const downloadURL = await reference.getDownloadURL();

//     return downloadURL;
//   } catch (error) {
//     console.error('Upload error:', error);
//     throw error;
//   }
// };