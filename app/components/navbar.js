"use client"

export default function Navbar(){
    const mainItems = Array(3).fill(null);
    const navMenus = Array(8).fill(null);

    return (
        <div className="w-full h-32 bg-amber-400">
            <div className="w-full h-6 bg-blue-600">

            </div>

            {/* mobile mode */}
            <div className="w-full h-full bg-red-400 sm:hidden">

            </div>

            {/* desktop mode */}
            <div className="sm:flex flex-col w-full h-full bg-green-400 hidden">
                <div className="flex flex-row justify-between px-10 w-full h-[72%] bg-gray-400">
                    {mainItems.map((_, index) => (
                        <div key={index} className="w-[30%] h-full bg-black">

                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-center gap-5 px-10 w-full h-[28%] bg-pink-400">
                    {navMenus.map((_, index) => (
                        <div key={index} className="w-[10%] h-full bg-purple-400">
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}