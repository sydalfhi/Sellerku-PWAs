const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const MapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
);

const TransferIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function Tabbar() {
  return (
    <div className="z-[999] border-t border-[#efecff] bg-white p-3 fixed bottom-0 left-0 right-0 rounded-t-3xl">
      <div className="flex justify-between px-10">
        <div className=" flex flex-col justify-center items-center space-y-1 relative">
          <HomeIcon />
          <p className="text-xs font-semibold text-[#37393d]">Home</p>
          <div className="active absolute -top-1 right-0">
            <div className=" w-2 h-2 rounded-full bg-primary "></div>
          </div>
        </div>
        <div>
          <div className=" flex flex-col justify-center items-center space-y-1 relative">
            <TransferIcon />
            <p className="text-xs font-semibold text-[#37393d]">Produk</p>
            <div className="active absolute -top-1 right-0">
              <div className=" w-2 h-2 rounded-full bg-primary "></div>
            </div>
          </div>
        </div>
        <div>
          <div className=" flex flex-col justify-center items-center space-y-1 relative">
            <MapIcon />
            <p className="text-xs font-semibold text-[#37393d]">History</p>
            <div className="active absolute -top-1 right-0">
              <div className=" w-2 h-2 rounded-full bg-primary "></div>
            </div>
          </div>
        </div>
        <div>
          <div className=" flex flex-col justify-center items-center space-y-1 relative">
            <SettingsIcon />
            <p className="text-xs font-semibold text-[#37393d]">Setting</p>
            <div className="active absolute -top-1 right-0">
              <div className=" w-2 h-2 rounded-full bg-primary "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
