import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateSavingsHomepage = () => {
  const navigate = useNavigate();

  const handleStartNowClick = (item) => {
    navigate("/savings-target-calculation", {
      state: { selectedItem: item },
    });
  };
  return (
    <>
      <div className="mt-5 mb-8">
        <h1 className="text-[19px] text-textDark dark:text-[#fff] font-bold">
          Create a savings target.
        </h1>
        <h2 className="text-[15px] text-secondarySubtitleLight ">
          What's the dream you hope to achieve?
        </h2>
      </div>
      <div className="savings_target_cards mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cardColorLight dark:bg-cardColorDark px-2 py-3 pb-4 rounded-lg flex flex-col justify-center items-center">
            <div className="bg-[#f6e5dc8c] dark:bg-[#2a2a2ae8] h-[54px] w-[54px] rounded-[50%] p-[10px] mb-1 flex justify-center items-center">
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1098 0.404669C15.1191 0.404703 16.0558 0.911684 16.6091 1.74521L16.7145 1.91629L18.7079 5.40467L19.8705 5.4047C20.0637 5.40465 20.225 5.54179 20.2623 5.72404L20.2704 5.80469L20.2704 6.28008C20.2704 6.61045 20.068 6.9027 19.7679 7.02273L19.6407 7.06213C20.0153 7.84003 20.1824 8.7022 20.1248 9.56451L20.0973 9.85178L19.3722 15.6528C19.2537 16.6009 18.4839 17.3249 17.5455 17.3985L17.3876 17.4047L16.2704 17.4047C15.2161 17.4047 14.3522 16.5888 14.2758 15.5539L14.2704 15.4047L6.27038 15.4047C6.27039 16.459 5.45455 17.3229 4.41971 17.3992L4.27043 17.4047L3.15322 17.4047C2.19765 17.4047 1.38372 16.7305 1.19433 15.8086L1.16865 15.6528L0.443511 9.85176C0.335882 8.9906 0.454599 8.12001 0.78289 7.32436L0.900113 7.06212L0.876388 7.05619C0.55589 6.97611 0.321429 6.70883 0.277764 6.3886L0.270419 6.28006L0.27042 5.80468C0.270413 5.61139 0.407536 5.45011 0.589795 5.41281L0.670429 5.40468L1.83297 5.40466L3.82633 1.91626C4.32707 1.03996 5.23202 0.478185 6.23026 0.411386L6.43111 0.404662L14.1098 0.404669ZM18.0296 8.44021C17.5361 8.97892 16.8423 9.34483 16.0296 9.398L15.824 9.4047L4.71672 9.40466C3.81549 9.40468 3.04582 9.02378 2.51121 8.4402C2.42887 8.74119 2.39368 9.05434 2.408 9.36824L2.42805 9.60365L3.15319 15.4047L4.27041 15.4047L4.27042 14.4047C4.27044 13.8919 4.65644 13.4691 5.15377 13.4114L5.27043 13.4047L15.2705 13.4047C15.7833 13.4047 16.2059 13.7907 16.2637 14.288L16.2704 14.4047L16.2704 15.4047L17.3876 15.4047L18.1128 9.6037C18.1617 9.2117 18.1326 8.8165 18.0296 8.44021ZM4.00802 10.303L6.75066 11.784C7.12368 11.9854 6.96821 12.5525 6.54462 12.5357L4.23044 12.4431C3.69411 12.4215 3.27043 11.9806 3.27043 11.4439L3.27042 10.7429C3.27041 10.3643 3.67483 10.123 4.00802 10.303ZM17.2704 10.7429L17.2704 11.4439C17.2705 11.9806 16.8467 12.4216 16.3104 12.4431L13.9962 12.5357C13.5726 12.5525 13.4172 11.9855 13.7902 11.784L16.5328 10.303C16.866 10.1231 17.2704 10.3643 17.2704 10.7429ZM14.1098 2.40471L6.43111 2.40466C6.07223 2.40467 5.74088 2.59696 5.56282 2.90854L3.84855 5.90855C3.46797 6.57515 3.94911 7.40472 4.71674 7.4047L15.824 7.40466C16.5919 7.40471 17.0733 6.57521 16.6923 5.90858L14.978 2.9085C14.8 2.59697 14.4686 2.40468 14.1098 2.40471Z"
                  fill="#FC5800"
                />
              </svg>
            </div>
            <h2 className="text-textDark dark:text-[#fff] text-[16px] text-lg font-bold text-center mb-[2px] tracking-wide">
              Save for a car.
            </h2>
            <p className="text-secondarySubtitleLight dark:text-secondarySubtitleDark font-normal text-[13px] tracking-wide text-wrap text-center mb-3 w-[181px] h-[39px] px-1">
              Hoping to ride your dream car?
            </p>
            <button
              onClick={() => {
                handleStartNowClick("Car");
              }}
              className="bg-primaryAmigo text-[#fff] text-[14px] px-2 py-1 rounded font-light"
            >
              Start now
            </button>
          </div>
          <div className="bg-cardColorLight dark:bg-cardColorDark px-2 py-3 pb-4 rounded-lg flex flex-col justify-center items-center">
            <div className="bg-[#f6e5dc8c] dark:bg-[#2a2a2ae8] rounded-[50%] h-[54px] w-[54px] p-[10px] mb-1 flex justify-center items-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7778 8.77778V19C18.7778 20.1046 17.8823 21 16.7778 21H5.22222C4.11765 21 3.22222 20.1046 3.22222 19V8.77778M21 11L11 1L1 11"
                  stroke="#FF5500"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-textDark dark:text-[#fff] text-[16px] text-lg font-bold text-center mb-[4px] tracking-wide">
              Save for a house.
            </h2>
            <p className="text-secondarySubtitleLight dark:text-secondarySubtitleDark font-normal tracking-wide text-wrap text-[13px] text-center mb-3 w-[181px] h-[39px] px-1 ">
              Hoping to live in your dream house?
            </p>
            <button
              onClick={() => {
                handleStartNowClick("House");
              }}
              className="bg-primaryAmigo text-[#fff] text-[14px] px-2 py-1 rounded font-light"
            >
              Start now
            </button>
          </div>
        </div>

        <div className="mt-4 bg-cardColorLight dark:bg-cardColorDark p-6 rounded-lg h-[140px] grid grid-cols-12 gap-4 ">
          <div className="bg-[#f6e5dc8c] dark:bg-[#2a2a2ae8]  col-span-3 h-[54px] w-[54px] rounded-[50%] p-[10px]  m-auto flex justify-center items-center">
            <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1098 0.404669C15.1191 0.404703 16.0558 0.911684 16.6091 1.74521L16.7145 1.91629L18.7079 5.40467L19.8705 5.4047C20.0637 5.40465 20.225 5.54179 20.2623 5.72404L20.2704 5.80469L20.2704 6.28008C20.2704 6.61045 20.068 6.9027 19.7679 7.02273L19.6407 7.06213C20.0153 7.84003 20.1824 8.7022 20.1248 9.56451L20.0973 9.85178L19.3722 15.6528C19.2537 16.6009 18.4839 17.3249 17.5455 17.3985L17.3876 17.4047L16.2704 17.4047C15.2161 17.4047 14.3522 16.5888 14.2758 15.5539L14.2704 15.4047L6.27038 15.4047C6.27039 16.459 5.45455 17.3229 4.41971 17.3992L4.27043 17.4047L3.15322 17.4047C2.19765 17.4047 1.38372 16.7305 1.19433 15.8086L1.16865 15.6528L0.443511 9.85176C0.335882 8.9906 0.454599 8.12001 0.78289 7.32436L0.900113 7.06212L0.876388 7.05619C0.55589 6.97611 0.321429 6.70883 0.277764 6.3886L0.270419 6.28006L0.27042 5.80468C0.270413 5.61139 0.407536 5.45011 0.589795 5.41281L0.670429 5.40468L1.83297 5.40466L3.82633 1.91626C4.32707 1.03996 5.23202 0.478185 6.23026 0.411386L6.43111 0.404662L14.1098 0.404669ZM18.0296 8.44021C17.5361 8.97892 16.8423 9.34483 16.0296 9.398L15.824 9.4047L4.71672 9.40466C3.81549 9.40468 3.04582 9.02378 2.51121 8.4402C2.42887 8.74119 2.39368 9.05434 2.408 9.36824L2.42805 9.60365L3.15319 15.4047L4.27041 15.4047L4.27042 14.4047C4.27044 13.8919 4.65644 13.4691 5.15377 13.4114L5.27043 13.4047L15.2705 13.4047C15.7833 13.4047 16.2059 13.7907 16.2637 14.288L16.2704 14.4047L16.2704 15.4047L17.3876 15.4047L18.1128 9.6037C18.1617 9.2117 18.1326 8.8165 18.0296 8.44021ZM4.00802 10.303L6.75066 11.784C7.12368 11.9854 6.96821 12.5525 6.54462 12.5357L4.23044 12.4431C3.69411 12.4215 3.27043 11.9806 3.27043 11.4439L3.27042 10.7429C3.27041 10.3643 3.67483 10.123 4.00802 10.303ZM17.2704 10.7429L17.2704 11.4439C17.2705 11.9806 16.8467 12.4216 16.3104 12.4431L13.9962 12.5357C13.5726 12.5525 13.4172 11.9855 13.7902 11.784L16.5328 10.303C16.866 10.1231 17.2704 10.3643 17.2704 10.7429ZM14.1098 2.40471L6.43111 2.40466C6.07223 2.40467 5.74088 2.59696 5.56282 2.90854L3.84855 5.90855C3.46797 6.57515 3.94911 7.40472 4.71674 7.4047L15.824 7.40466C16.5919 7.40471 17.0733 6.57521 16.6923 5.90858L14.978 2.9085C14.8 2.59697 14.4686 2.40468 14.1098 2.40471Z"
                fill="#FC5800"
              />
            </svg>
          </div>
          <div className="col-span-6 flex flex-col justify-center items-start ">
            <h2 className="text-textDark dark:text-[#fff] text-[16px] text-lg font-bold mb-[4px] tracking-wide">
              Save for something else.
            </h2>
            <p className="text-secondarySubtitleLight dark:text-secondarySubtitleDark font-light tracking-wide text-wrap text-[13px]">
              Have other dreams in mind?
            </p>
          </div>
          <div className=" font-light text-2xl col-span-3 flex justify-end items-center  text-center m-auto w-full h-full mr-3">
            <Link to={"/create-savings-target-for-something-else"}>
              {" "}
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-secondarySubtitleLight dark:stroke-secondarySubtitleDark"
              >
                <path
                  d="M11 1V21"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 11H21"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSavingsHomepage;
