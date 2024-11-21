const message = {
  success: {
    getData: "Successfully get data",
    addData: "Successfully add data",
    editData: "Successfully edit data",
    deleteData: "Successfully delete data",
    upserData: (id: string) =>
      id ? message.success.editData : message.success.addData,
  },
  error: {
    notFound: "Data dosent exist",
  },
};

export default message;
