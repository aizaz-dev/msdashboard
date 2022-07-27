import "./table.scss";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
const List = ({
  userId,
  mydt,
  data,
  setData,
  edit,
  setEdit,
  isEdit,
  setIsEdit,
  subForm,
  setSubForm,
}) => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    setMyData(mydt);
  }, [mydt]);
  const handleDelete = async (id) => {
    try {
      const res = await setDoc(doc(db, "users", userId), {
        ...data,
        // createdAt: serverTimestamp(),
        subform: myData.filter((item) => item.subId !== id),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    console.log(id, myData);
    setSubForm(myData.find((item) => item.subId === id));
    setIsEdit(true);
  };
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Invoice number</TableCell>
            <TableCell className="tableCell">Invoice Date</TableCell>
            <TableCell className="tableCell">Invoice Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Payment Amount</TableCell>
            <TableCell className="tableCell">Reference</TableCell>
            <TableCell className="tableCell">Vendor</TableCell>
            <TableCell className="tableCell">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myData
            ? myData.map((row, index) => (
                <TableRow key={index}>
                  {/* <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={row.img} alt="" className="image" />
                      {row.product}
                    </div>
                  </TableCell> */}
                  <TableCell className="tableCell">
                    {row.InvoiceNumber}
                  </TableCell>
                  <TableCell className="tableCell">{row.InvoiceDate}</TableCell>
                  <TableCell className="tableCell">
                    {row.InvoiceAmount}
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.paymentMethod}
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.paymentAmount}
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.paymentReference}
                  </TableCell>
                  <TableCell className="tableCell">{row.vendorList}</TableCell>
                  {/* <TableCell className="tableCell">
                    <button
                      className="editButton"
                      onClick={() => handleEdit(row.subId)}
                    >
                      Edit
                    </button>
                  </TableCell> */}
                  <TableCell className="tableCell">
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(row.subId)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            : "Loading"}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
