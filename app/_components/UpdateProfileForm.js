"use client";

import SubmitButton from "@/app/_components/SubmitButton";
import { updateGuest } from "../_lib/actions";
import toast from "react-hot-toast";
import Image from "next/image";

function UpdateProfileForm({ guest, children }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      // action={updateGuest}
      action={async (formData) => {
        const result = await updateGuest(formData);
        if (result?.error) {
          toast.error(result.error);
          return;
        }
        toast.success("Profile updated successfully");
      }}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>

          <div
            className={`relative h-8 ${
              nationality === "Nepal" ? "aspect-[5/6]" : "aspect-[7/4]"
            }`}
          >
            {countryFlag ? (
              <Image
                src={countryFlag}
                alt="Country flag"
                width={100}
                height={100}
                className="object-cover rounded-sm"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
