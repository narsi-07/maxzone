import React from 'react';
import imageCompression from 'browser-image-compression';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';
import {
  getFirestore,
  updateDoc,
  doc,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import app from './firebaseConfig';
import { notificationTypes, userDetailTypes } from './atoms';

interface selectedMediaProps {
  e: any;
  setSelectedMedia: React.Dispatch<React.SetStateAction<File | undefined>>;
  setMediaSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function handleSelectedMedia({
  e,
  setSelectedMedia,
  setMediaSelected,
}: selectedMediaProps) {
  const fileType = e.target.files[0].type;
  const mediaFile = e.target.files[0];

  if (
    fileType === 'image/png' ||
    fileType === 'image/jpg' ||
    fileType === 'image/jpeg' ||
    fileType === 'video/mp4'
  ) {
    setSelectedMedia(mediaFile);
    setMediaSelected(true);
  } else {
    console.log('Please only use .png, .jpg, .jpeg, or .mp4 file types');
  }
}

async function compressImage(inputFile: File): Promise<Blob> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  };

  return await imageCompression(inputFile, options);
}

async function compressVideo(inputFile: File): Promise<Blob> {
  // For video compression, you can use ffmpeg or similar libraries.
  // For simplicity, we'll just return the input video file for now.
  return Promise.resolve(inputFile);
}

interface handleSubmitProps {
  url: string;
  userNotifications: notificationTypes;
  userDetails: userDetailTypes | User;
  caption: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}

async function handleSubmitToDB({
  url,
  userNotifications,
  userDetails,
  caption,
}: handleSubmitProps) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', userNotifications?.username!);
  const userPostDocRef = doc(
    db,
    `${userNotifications?.username}Posts`,
    'userPosts'
  );

  updateDoc(userRef, {
    postCount: userNotifications?.postCount! + 1,
  });

  const postCaption = {
    text: caption,
    avatarURL: userDetails.photoURL,
    username: userDetails.displayName,
    createdAt: new Date().toLocaleDateString(),
  };

  await addDoc(collection(db, `${userNotifications?.username}Posts`), {
    createdAt: serverTimestamp(),
    mediaURL: url,
    likeCount: 0,
    comments: [postCaption],
    postID: '',
    likes: [],
  });

  const q = query(
    collection(db, `${userNotifications?.username}Posts`),
    orderBy('createdAt', 'desc'),
    limit(1)
  );

  let latestPostId: string;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((latestPost: any) => {
    latestPostId = latestPost.id;
  });

  updateDoc(userPostDocRef, {
    postsListArray: arrayUnion(latestPostId!),
  });

  const docRef = doc(db, `${userNotifications?.username!}Posts`, latestPostId!);
  updateDoc(docRef, {
    postID: latestPostId!,
  });
}

interface submitProps {
  userNotifications: notificationTypes;
  userDetails: userDetailTypes | User;
  caption: string;
  selectedMedia: File;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function handleSubmit({
  userNotifications,
  userDetails,
  caption,
  selectedMedia,
  setLoading,
  setAddPost,
}: submitProps) {
  const storage = getStorage();
  setLoading(true);

  const storageRef = ref(storage,
    `posts/${userDetails.displayName}post${userNotifications?.postCount! + 1}`
  );

  let compressedFile: Blob;
  
  if (selectedMedia.type.startsWith('video/')) {
    compressedFile = await compressVideo(selectedMedia);
  } else {
    compressedFile = await compressImage(selectedMedia);
  }

  await uploadBytes(storageRef, compressedFile).then(() => {
    // File uploaded
  });

  getDownloadURL(
    ref(
      storage,
      `posts/${userDetails.displayName}post${userNotifications?.postCount! + 1}`
    )
  )
    .then((url) => {
      setLoading(false);
      setAddPost(false);
      handleSubmitToDB({
        url,
        userNotifications,
        userDetails,
        caption,
        setLoading,
        setAddPost,
      });
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}
