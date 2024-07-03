"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";
import toast from "react-hot-toast";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id != bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    const res = await deleteBooking(bookingId);

    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Reservation Deleted Successfully");
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
