import { useState } from 'react'
import ImageUploader from '../components/imageUploader/imageUploader';
import { storage } from '../firebase';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './Upload.module.css';

export const Upload = () => {

  const handleSignOut = () => {
    signOut(auth).then(() => console.log("Sign Out")).catch((error) => console.log(error))
  }

    const [imgUrl, setImgUrl] = useState("");

    const handleUploadSuccess = (url) => {
      setImgUrl(url);
    };

    
    return (
        <section className={styles.uploadSection}>
            <h2>Upload</h2>

            <ImageUploader storage={storage} onUpload={handleUploadSuccess}/>
          {
            imgUrl &&
            <img className={styles.img} src={imgUrl} alt="imagem enviada" />
          }

          <button className={styles.logout} onClick={handleSignOut}>Sair</button>
        </section>
    )
}