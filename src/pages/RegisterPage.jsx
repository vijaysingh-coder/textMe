import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Add from '../images/addAvatar.png';
import { auth, storage, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const RegisterPage = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = e.target.file.files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(async () => {
        const downloadURL = await getDownloadURL(storageRef);
        try {
          // Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          // Create user on firestore with online status initially set to false
          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
            online: false, // Add the online field with initial value false
          });

          // Create empty user chats on firestore
          await setDoc(doc(db, 'userChats', res.user.uid), {});
          navigate('/');
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
      });
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="display name"
            name="displayName"
          />
          <input required type="email" placeholder="email" name="email" />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
          />
          <input
            required
            style={{ display: 'none' }}
            type="file"
            name="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && 'Uploading and compressing the image, please wait...'}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
