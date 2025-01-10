import { useEffect, useState } from "react";
import { db as rdb, storage } from "../firebase/firebaseConfig";
import { child, get, ref, set, update, onValue } from "firebase/database";
import {
  deleteObject,
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  UserCredential,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const useFirebase = (params = {}) => {
  const {
    toRead = false,
    dependencies = [],
    condition = true,
    path = null,
    customCallback = async () => {},
    setStore = () => {},
  } = params;

  const [loadingCount, setLoadingCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const { toast } = useToast();

  const setLoading = (isLoading) => {
    setLoadingCount((prevCount) => (isLoading ? prevCount + 1 : prevCount - 1));
  };

  // Error handler with custom messages
  const throwError = (error) => {
    const errorCode = error.code || error.message;
    const errorMessages = {
      "auth/email-already-in-use":
        "This email is already in use. Please try a different one.",
      "auth/invalid-email":
        "The email address is not valid. Please check your input.",
      "auth/weak-password":
        "The password is too weak. Please choose a stronger password.",
      "auth/network-request-failed":
        "Network error. Please check your internet connection and try again.",
      "auth/user-disabled":
        "This user account has been disabled. Please contact support.",
      "auth/user-not-found":
        "No user found with this email address. Please check and try again.",
      "auth/wrong-password":
        "Incorrect password. Please check your credentials.",
      "auth/operation-not-allowed":
        "This operation is not allowed. Please contact support.",
      "auth/too-many-requests": "Too many requests. Please try again later.",
      "auth/unknown": "An unknown error occurred. Please try again later.",
      "auth/invalid-password":
        "The password is invalid. Please check and try again.",
      "auth/invalid-credential":
        "The password is invalid. Please check and try again.",
    };

    const customMessage = errorMessages[errorCode] || error.message;
    throw { state: 400, errorCode, message: customMessage };
  };

  // CRUD operations
  const readData = async (path) => {
    setLoading(true);
    try {
      const snapshot = await get(child(ref(rdb), path));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      throw throwError(error);
    } finally {
      setLoading(false);
    }
  };

  const writeData = async (path, data) => {
    setLoading(true);
    try {
      const dbRef = ref(rdb, path);
      await set(dbRef, data);
      return true;
    } catch (error) {
      console.error(error);
      throw throwError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (updates) => {
    setLoading(true);
    try {
      await update(ref(rdb), updates);
    } catch (error) {
      throw throwError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (path) => {
    try {
      if (!currentUser) {
        console.error("No authenticated user found");
        throw new Error("Authentication required");
      }

      const desertRef = sRef(storage, path);
      await deleteObject(desertRef);
      return true;
    } catch (error) {
      throw throwError(error);
    }
  };

  const syncUpload = (file, path, setPercent) => {
    const storageRef = sRef(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) =>
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (error) => reject(throwError(error)),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      )
    );
  };

  // Reactively fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await (path ? readData(path) : customCallback());
        setStore(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }

    if (toRead && condition) fetchData();
  }, dependencies);

  return {
    crud: {
      readData,
      writeData,
      updateData,
      deleteFile,
      syncUpload,
    },

    loading: loadingCount > 0,
  };
};

export default useFirebase;
