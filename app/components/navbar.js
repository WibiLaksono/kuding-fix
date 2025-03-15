"use client"

export default function Navbar(){
    const navMenus = Array(8).fill(null);

    return (
        <div className="fixed top-0 left-0 w-full h-32 bg-white shadow-lg z-50">
            <div className="w-full h-[15%] bg-blue-600 flex justify-center">
                <p className="text-white font-light">LIMITED OFFER: 30% OFF. Use RABBIT30 at Checkout.</p>
            </div>

            {/* mobile mode */}
            <div className="w-full h-full bg-red-400 sm:hidden"></div>

            {/* desktop mode */}
            <div className="sm:flex flex-col w-full h-[85%] bg-white hidden">
                <div className="flex flex-row justify-center gap-16 px-10 w-full h-20 shadow-md">
                    <div className="flex justify-start items-center px-2 w-[30%] h-full">
                        <a href="#" className="text-red-600 text-2xl font-bold font-sans">Kuding</a>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 w-[30%] h-full">
                        <input placeholder="ketikkan sesuatu" className="bg-white border-1 px-5 border-gray-400 w-[80%] h-[60%]  rounded-2xl">
                        
                        </input>
                        <button type="button" name="search" id="search" className="flex items-center justify-center bg-blue-300 w-[20%] h-[60%] rounded-full cursor-pointer">
                            cari
                        </button>
                    </div>
                    <div className="flex flex-row justify-end items-center px-2 gap-2 w-[30%] h-full ">
                        <div className="w-[80%] h-[60%] border-r-1 flex items-center justify-end px-5">
                            Kosmas Rio Legowo
                        </div>
                        <div className="w-[20%] h-[60%] bg-amber-200 flex items-center justify-center rounded-full" >
                            Notif
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-5 px-10 w-full h-10">
                    {navMenus.map((_, index) => (
                        <div key={index} className="w-[10%] h-full flex items-center justify-center">Menu List {index}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
