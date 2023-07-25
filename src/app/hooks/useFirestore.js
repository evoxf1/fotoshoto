import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, orderBy, getDocs, onSnapshot } from "firebase/firestore";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    const db = projectFirestore;
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDocs(documents);
      } catch (error) {
        // Handle any errors that may occur during data fetching
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();

    // Subscribe to the Firestore query and store the unsubscribe function
    const unsubscribeFromFirestore = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocs(documents);
    });

    // Save the unsubscribe function in state
    setUnsubscribe(() => unsubscribeFromFirestore);

    // Unsubscribe when the component is unmounted
    return () => {
      // Call the unsubscribe function to stop listening to the Firestore query
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
