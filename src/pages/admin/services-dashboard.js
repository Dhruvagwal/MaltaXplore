import React, { useEffect, useState } from "react";
import AdminWrapper from "./_app";
import { getServicesWithTypeandSubType } from "@/features/getServices";
import { getServiceType } from "@/features/getServiceType";
import ServiceList from "@/components/admin/service-list";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getServiceSubType } from "@/features/getServiceSubType";

const ServicesDashboard = () => {
  const [service, setServices] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [serviceSubtype, setServiceSubType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServices = await getServicesWithTypeandSubType();
      setServices(fetchedServices);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServiceTypes = await getServiceType();
      setServiceType(fetchedServiceTypes);
    };

    fetchData();
  }, []);

  const handleSelectChange = async (id) => {
    try {
      const fetchedServiceSubTypes = await getServiceSubType(id);
      setServiceSubType(fetchedServiceSubTypes);
    } catch (error) {
      console.error("Failed to fetch service sub-types:", error);
    }
  };

  console.log("serviceType", serviceType);
  console.log("serviceSubtype", serviceSubtype);

  const headings = [
    "Name",
    "Date",
    "Price",
    "Location",
    // "Type",
    // "Sub-Type",
    "Duration",
    "Max-Size",
    // "Cancellation",
    "Supplier",
    "Status",
    "Created At",
  ];

  return (
    <AdminWrapper>
      <>

      <div className="flex justify-between">
        <div className="text-2xl font-semibold mb-4">Draft Service List</div>
        <div className="flex gap-4">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Service Type</SelectLabel>
                {serviceType?.map((st) => (
                  <SelectItem key={st.id} value={st.id}>{st.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sub Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
              {serviceSubtype?.map((st) => (
                  <SelectItem key={st.id} value={st.id}>{st.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ServiceList headings={headings} data={service} />


      {/* approved list */}
          <div className="text-2xl font-semibold mb-4 mt-16">Approved Service List</div>
        <div className="flex gap-4">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Service Type</SelectLabel>
                {serviceType?.map((st) => (
                  <SelectItem key={st.id} value={st.id}>{st.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Sub Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
              {serviceSubtype?.map((st) => (
                  <SelectItem key={st.id} value={st.id}>{st.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      <ServiceList headings={headings} data={service} />
      </>
    </AdminWrapper>
  );
};

export default ServicesDashboard;
