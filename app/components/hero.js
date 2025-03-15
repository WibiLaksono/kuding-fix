"use client"

export default function Hero (){
    return (
        <div 
            className="relative w-full h-screen bg-cover bg-center" 
            style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1600&q=80')"
            }}
        >
            {/* Shadow Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-start px-20 h-full text-white text-4xl font-bold">
                <div className="w-[40rem]">Halo, Mari beli barang bekas mu! atau jual barangmu</div>
            </div>
        </div>
    )
}
