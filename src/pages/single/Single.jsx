import "./single.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const Single = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [subForm, setSubForm] = useState({});
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [subForm2, setSubForm2] = useState([]);
  const [option, setOptions] = useState([]);
  // const [date, setDate] = useState(new Date());
  // const [second,setSecond]=useState(0);
  // let fireBaseTime = new Date(
  //   data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1000000
  // );
  // console.log(date);
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
          list.push(doc.data().name);
        });
        setOptions(list);
        console.log(option);
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
    setSubForm({
      ...subForm,
      subId: Math.random(),
      [name]: value,
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    if (isEdit === true) {
      try {
        const res = await setDoc(doc(db, "users", userId), {
          ...data,
          subform: [subForm, ...data.subform],
        });
        setSubForm({});
        setIsEdit(false);
        console.log("Editting Data");
        // window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // const res = await createUserWithEmailAndPassword(
        //   auth,
        //   data.email,
        //   data.password
        // );
        const res = await setDoc(doc(db, "users", userId), {
          ...data,
          // createdAt: serverTimestamp(),
          subform: [subForm, ...data.subform],
        });
        setSubForm({});
        console.log("Adding Data");
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(option);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link
              to={`/users/update/${userId}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={data.url} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
              </div>
            </div>
          </div>
          <div className="right">
            <form>
              <div style={{ display: "flex" }}>
                <label htmlFor="">Invoice Number</label>
                <input
                  type="number"
                  placeholder="Invoice Number"
                  onChange={handleChange}
                  name="InvoiceNumber"
                  className="formInput"
                  value={subForm.InvoiceNumber}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label htmlFor="">Invoice Date</label>
                <input
                  type="text"
                  placeholder="Invoice Date"
                  onChange={handleChange}
                  name="InvoiceDate"
                  value={subForm.InvoiceDate}
                  className="formInput"
                />
              </div>
              <div style={{ display: "flex" }}>
                <label htmlFor="">Invoice Amount</label>
                <input
                  type="text"
                  placeholder="Invoice Amount"
                  onChange={handleChange}
                  name="InvoiceAmount"
                  value={subForm.InvoiceAmount}
                  className="formInput"
                />
              </div>
              <div style={{ display: "flex" }}>
                <label htmlFor="">Payment Method</label>
                <select name="paymentMethod" onChange={handleChange}>
                  <option value="Cash">Cash</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Credit Card">Debit Card</option>
                  <option value="Chequee">Chequee</option>
                </select>
              </div>
              <div style={{ display: "flex" }}>
                <label htmlFor="">Vendor</label>
                <select name="vendorList" onChange={handleChange}>
                  {option.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={{ display: "flex" }}>
                <label htmlFor="">Amount</label>
                <input
                  type="text"
                  className="formInput"
                  placeholder="PaymentAmount"
                  name="paymentAmount"
                  onChange={handleChange}
                  value={subForm.paymentAmount}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label htmlFor="">Reference</label>
                <input
                  type="text"
                  placeholder="Payment Reference"
                  name="paymentReference"
                  className="formInput"
                  onChange={handleChange}
                  value={subForm.paymentReference}
                />
              </div>
              <div style={{ display: "flex" }}>
                <button onClick={handleAdd}>{isEdit ? "EDIT" : "ADD"}</button>
              </div>
            </form>
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List
            userId={userId}
            mydt={data.subform}
            data={data}
            setData={setData}
            edit={edit}
            setEdit={setEdit}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            subForm={subForm}
            setSubForm={setSubForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Single;
