const getAllCustomer = async (req, res) => {
  res.send("Get all user");
};

const getSingleCustomer = async (req, res) => {
  res.send("Get single user");
};

const getCurrentCustomer = async (req, res) => {
  res.send("Get current user");
};

const updateCustomer = async (req, res) => {
  res.send("Update user");
};

const updateCustomerPassword = async (req, res) => {
  res.send("Update password user");
};

const customerContollers = {
    getAllCustomer,
    getSingleCustomer,
    getCurrentCustomer,
    updateCustomer,
    updateCustomerPassword,
};

export default customerContollers
  
