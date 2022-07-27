import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState({});
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
      const res = await addDoc(collection(db, "users"), {
        ...data,
        subform: [],
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
        <div className="top">
          <h1>{title}</h1>
        </div>
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
                  value={data.value}
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
                  value={data.value}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label className="add_label">Phone Number</label>

                <input
                  className="formInput"
                  type="text"
                  onChange={handleChange}
                  value={data.value}
                  name="phoneNumber"
                />
              </div>
              <div style={{ display: "flex" }}>
                <label className="add_label">Registration Fee</label>
                <input
                  className="formInput"
                  type="text"
                  onChange={handleChange}
                  value={data.value}
                  name="registrationFee"
                />
              </div>
              <div style={{ display: "flex" }}>
                <label className="add_label">Fee</label>
                <input
                  className="formInput"
                  type="text"
                  onChange={handleChange}
                  value={data.value}
                  name="fee"
                />
              </div>
              <div className="gender">
                <label htmlFor="">Gender</label>
              </div>
              <div
                className="gender_values"
                onChange={handleChange}
                value={data.value}
                name="gender"
              >
                <label htmlFor="" style={{ opacity: 0.6 }}>
                  Male
                </label>
                <input type="radio" name="gender" value="Male" defaultChecked />
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
                value={data.value}
                name="time"
              >
                <label htmlFor="" style={{ opacity: 0.6 }}>
                  Day
                </label>
                <input type="radio" name="time" value="Day" defaultChecked />
                <label htmlFor="" style={{ opacity: 0.6 }}>
                  Night
                </label>
                <input type="radio" name="time" value="Night" />
              </div>
              <div className="add_selection">
                <label className="add_label">Course</label>
                <select
                  name="course"
                  onChange={handleChange}
                  value={data.value}
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
              </div> */}
              <div className="add_selection">
                {/* <label className="add_label">Mentor</label> */}
                {/* <select
                  className="formSelect"
                  name="mentors"
                  onChange={handleChange}
                  value={data.value}
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
              </div>
              <button
                disabled={percentage !== null && percentage < 100}
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

export default New;
