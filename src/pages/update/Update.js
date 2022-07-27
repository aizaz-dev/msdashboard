import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
// import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
const Update = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, url: downloadURL, imageName: name }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  useEffect(() => {
    // =======================================================
    // FETCH DATA WITH FIREBASE
    // =======================================================
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);

    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();
    // FETCH DATA WITH FIREBASE IN REALTIME
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list.find((item) => item.id === userId));
      },

      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // const res = await createUserWithEmailAndPassword(
      //   auth,
      //   data.email,
      //   data.password
      // );
      const res = await setDoc(doc(db, "users", userId), {
        ...data,
        createdAt: serverTimestamp(),
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">{/* <h1>{title}</h1> */}</div>
        <div className="bottom">
          <div className="left">
            {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div>
                {/* <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
                {/* <input
                  className="formInput"
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                /> */}
              </div>

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    onChange={handleInput}
                    placeholder={input.placeholder}
                  />
                </div>
              ))} */}
              <div style={{ display: "flex" }}>
                <label className="add_label">Name</label>
                <input
                  type="text"
                  className="formInput"
                  onChange={handleChange}
                  value={data.name}
                  name="name"
                />
              </div>
              {/* <div style={{ display: "flex" }}>
                <label className="add_label">Father Name</label>
                <input
                  className="formInput"
                  type="text"
                    onChange={handleChange}
                  name="fatherName"
                  value={data.fatherName}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label className="add_label">Phone Number</label>

                <input
                  className="formInput"
                  type="text"
                    onChange={handleChange}
                  value={data.phoneNumber}
                  name="phoneNumber"
                />
              </div>
              <div style={{ display: "flex" }}>
                <label className="add_label">Registration Fee</label>
                <input
                  className="formInput"
                  type="text"
                  onChange={handleChange}
                  value={data.registrationFee}
                  name="registrationFee"
                />
              </div>
              <div style={{ display: "flex" }}>
                <label className="add_label">Fee</label>
                <input
                  className="formInput"
                  type="text"
                  onChange={handleChange}
                  value={data.fee}
                  name="fee"
                />
              </div>
              <div className="gender">
                <label htmlFor="">Gender</label>
              </div>
              <div
                className="gender_values"
                onChange={handleChange}
                value={data.gender}
                name="gender"
              >
                <label htmlFor="" style={{ opacity: 0.6 }}>
                  Male
                </label>
                <input type="radio" name="gender" value="Male" />
                <label htmlFor="" style={{ opacity: 0.6 }}>
                  Female
                </label>
                <input type="radio" name="gender" value="female" id="" />
              </div>
              <div className="gender">
                <label htmlFor="">Time Lap</label>
              </div>
              <div
                className="gender_values"
                onChange={handleChange}
                value={data.time}
                name="time"
              >
                <label htmlFor="" style={{ opacity: 0.6 }}>
                  Day
                </label>
                <input type="radio" name="time" value="Day" />
                <label htmlFor="" style={{ opacity: 0.6 }}>
                  Night
                </label>
                <input type="radio" name="time" value="Night" />
              </div>
              <div className="add_selection">
                <label className="add_label">Course</label>
                <select
                  name="course"
                  id=""
                  onChange={handleChange}
                  value={data.course}
                  className="formSelect"
                >
                  <option value="Amazon">Amazon</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Android Development">
                    Android Development
                  </option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Basic Computer">Basic Computer</option>
                </select>
              </div>
              <div className="add_selection">
                <label className="add_label">Mentor</label>
                <select
                  className="formSelect"
                  name="mentors"
                  onChange={handleChange}
                  value={data.mentors}
                >
                  <option value="Rehan Ahmad">Rehan Ahmad</option>
                  <option value="Muzamil Nawaz">Muzamil Nawaz</option>
                  <option value="Shahid Iqbal">Shahid Iqbal</option>
                  <option value="M Aizaz">M Aizaz</option>
                  <option value="Waseem Abbas">Waseem Abbas</option>
                  <option value="Hassan">Hassan</option>
                  <option value="Hamza">Hamza</option>
                  <option value="Ameer Hamza">Ameer Hamza</option>
                  <option value="Madam Tahira">Madam Tahira</option>
                </select> */}
                {/* <label className="add_label">Profile Image</label>
                <input type="file" onChange={imagehandleChange} /> */}
              {/* </div> */}
              <button
                // disabled={percentage !== null && percentage < 100}
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
