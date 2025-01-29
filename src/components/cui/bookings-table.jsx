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
  return (
    <Card className="p-4">
      <h2 className="text-xl text-center font-semibold text-muted-foreground mb-4">
        {heading}
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Start Date</TableHead>
            <TableHead className="">Destination</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ?.filter((item) => item?.services !== null)
            .map((item, index) => (
              <TableRow>
                <TableCell className="font-medium">
                  {item?.services?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.servicebookings?.start_date}
                </TableCell>
                <TableCell>{item?.services?.location}</TableCell>
                {/* <TableCell className="text-right">
      {!item?.service?.status ? (
        <span className="text-green-500">Done</span>
      ) : (
        <span className="text-primary">Upcoming</span>
      )}
    </TableCell> */}
                <TableCell className="text-center">
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
