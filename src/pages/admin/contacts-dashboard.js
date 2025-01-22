import React, { useEffect, useState } from "react";
import AdminWrapper from "./_app";
import ContactsList from "@/components/admin/contacts-list";
import { getContacts } from "@/features/getContacts";

const ContactsDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getContacts();
      setUsers(fetchedUsers);
    };

    fetchData();
  }, []);

  const headings = ["Name", "Email", "Message", "Mobile No", "Created At"];
  return (
    <AdminWrapper>
      <div className="text-2xl font-semibold mb-4">Contacts List</div>
      <ContactsList headings={headings} data={users} />
    </AdminWrapper>
  );
};

export default ContactsDashboard;
