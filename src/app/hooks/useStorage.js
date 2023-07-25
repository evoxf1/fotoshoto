import { useState, useEffect } from "react";
import { storage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(storage, file.name);
    const collectionRef = collection(projectFirestore, "images");

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(url);

          // Add data to Firestore with serverTimestamp for createdAt field
          await addDoc(collectionRef, {
            url: url,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          setError(error);
        }
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
