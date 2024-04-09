const Loading = ({ message }: { message: string }) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[50]">
      <div className="bg-white border py-8 px-12 rounded-lg shadow-lg flex flex-col items-center">
        <p className="text-lg text-gray-800 mb-4">{message}</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    </div>
  );
};

export default Loading;
