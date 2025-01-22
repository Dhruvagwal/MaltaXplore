import React, { useEffect, useState } from "react";
import AdminWrapper from "./_app";
import UserList from "@/components/admin/user-list";
import { getAllUsers } from "@/features/getUser";

const SupplierDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };

    fetchData();
  }, []);

  const headings = ["Name", "Email", "Mobile No", "Created At"];
  return (
    <AdminWrapper>
      <div className="text-2xl font-semibold mb-4">Suppliers List</div>
      <UserList headings={headings} data={users} />
    </AdminWrapper>
  );
};

export default SupplierDashboard;
