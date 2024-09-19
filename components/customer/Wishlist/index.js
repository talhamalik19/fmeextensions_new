import React from "react";

export default function Wishlist() {
  return (
    <>
      <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
        <h2 className="text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1">
          Wishlist
        </h2>
        <p>My Wish List content goes here.</p>
      </div>
    </>
  );
}
