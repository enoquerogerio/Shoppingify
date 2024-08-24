const Spinner = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-[#C1C1C4] z-[5000] flex justify-center items-center">
      <div className="w-16 h-16 border-8 border-solid border-t-black border-r-transparent border-b-slate-600 border-l-transparent rounded-[50%] animate-spin"></div>
    </div>
  )
}

export default Spinner