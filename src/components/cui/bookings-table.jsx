import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BookingTableComponent = ({ heading, data }) => {
  console.log("data", data);

  return (
    <Card className="p-4">
      <h2 className="text-xl text-center font-semibold text-muted-foreground mb-4">
        {heading}
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Pickup Location</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow>
              <TableCell className="font-medium">
                {item?.bookingDetails?.date}
              </TableCell>
              <TableCell>{item?.service?.location}</TableCell>
              <TableCell>{item?.addressDetails?.location}</TableCell>
              {/* <TableCell className="text-right">
      {!item?.service?.status ? (
        <span className="text-green-500">Done</span>
      ) : (
        <span className="text-primary">Upcoming</span>
      )}
    </TableCell> */}
              <TableCell className="text-right">
                {heading === "Past Bookings" ? (
                  <span className="text-green-500">Done</span>
                ) : (
                  <span className="text-primary">Upcoming</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default BookingTableComponent;
