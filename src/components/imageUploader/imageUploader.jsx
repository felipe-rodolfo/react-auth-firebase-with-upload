import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import styles from './imageUploader.module.css';

function ImageUploader({ storage, onUpload }) {
  const [progress, setProgress] = useState(0);

  const handleUpload = (event) => {
    event.preventDefault();

    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          onUpload(url);
        });
      });
  };

  return (
    <form onSubmit={handleUpload} className={styles.form}>

        <label htmlFor='file' className={styles.label}>
          Upload de imagem
        </label>
        <input className={styles.input} type="file" id='file'/>
      
      <button className={styles.btn} type="submit">Enviar</button>
      <progress value={progress} max={100}></progress>
    </form>
  );
}

export default ImageUploader;
