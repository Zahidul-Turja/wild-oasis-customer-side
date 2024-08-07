"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) {
    return {
      error: "You must be logged in",
    };
    // throw new Error("You must be logged in");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (nationalID && !/^[a-zA-Z0-9]{6,19}$/.test(nationalID)) {
    return {
      error: "Please provide a valid nation ID",
    };
    // throw new Error("Please provide a valid nation ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    return {
      error: "Guest could not updated",
    };
  }

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session)
    return {
      error: "You must be logged in",
    };
  // throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data, error } = await supabase.from("bookings").insert([newBooking]);

  if (error)
    return {
      error: "Booking could not be created",
    };
  // throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    return {
      error: "You are not allowed to delete this booking",
    };
    // throw new Error("You are not allowed to delete this booking");
  }

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error)
    return {
      error: "Booking could not be deleted",
    };
  // throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    return {
      error: "You are not allowed to update this booking",
    };
    // throw new Error("You are not allowed to update this booking");
  }

  // 3) Building the data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error Handling
  if (error)
    return {
      error: "Booking could not be updated",
    };

  // throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  const res = await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  const res = await signOut({ redirectTo: "/" });
  console.log("SIGN-OUT:", res);
}
