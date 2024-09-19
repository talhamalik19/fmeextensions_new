import checkoutButtonsClickListner from "@/utils/hooks/checkoutButtonsClickListner";
import React from "react";

export default function Modal({
  openModal,
  setOpenModal,
  setOnconfirm,
}) {
  const overlayBg = {
    backgroundColor: "rgba(228, 113, 67, 0.40)",
  };
  const backGroundGlass = {
    backgroundImage:
      "linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)",
    border: "1px solid #fff",
  };

  const closeModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };

  const handleDelete = () => {
    setOnconfirm(true);
  };
  checkoutButtonsClickListner(handleDelete, 'delete-btn')
  return (
    <>
      {openModal && (
        <div className="dialog_main overlay fixed inset-0 z-20">
          <div
            style={overlayBg}
            className="dialog_size fixed inset-0 w-full h-full"
            onClick={closeModal}
          ></div>
          <div className="dialog_position flex items-center justify-center min-h-screen px-5">
            <div
              style={backGroundGlass}
              className="dialog_block max-w-3xl w-full p-3 rounded-lg relative"
            >
              <div className="bg-secondaryColor py-8 px-8 md:py-10 md:px-10 xl:py-12 xl:px-12 rounded-lg">
              <div className="text-center text-xl text-titleColor">Are you sure you want to remove?</div>
              <div className="dialog_cta flex flex-wrap items-center justify-center gap-5 mt-6">
                <button className='text-base md:text-lg xl:text-xl min-w-[10em] bg-transparent text-textColor border-solid border-[1px] border-textColor rounded-full text-center py-2 px-4 hover:bg-textColor hover:text-secondaryColor transition-all cursor-pointer'
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Cancel
                </button>
                <div className='delete-btn text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all cursor-pointer'>Yes</div>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
