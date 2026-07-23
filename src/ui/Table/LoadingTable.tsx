import { CubeLoader } from "../CubeLoader";

const LoadingTable = () => {
  return (
    <div className="relative h-70 flex items-center justify-center bg-[#101012] border-x border-t border-[#23252A]">
      <div className="absolute left-[50%] top-[50%] translate-y-[-50%] transform translate-x-[-50%]">
        <CubeLoader />
      </div>
    </div>
  );
};

export { LoadingTable };
