export const userColumns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "profile",
    headerName: "Profile",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.url} alt="avatar" />
          {params.row.url}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },


];

//temporary data
