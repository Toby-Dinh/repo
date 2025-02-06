export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen relative">
            {/* Black overlay with transparent circular cutout */}
            <div className="absolute inset-0 bg-black pointer-events-none"></div>

            {/* Loading circle */}
            <div className="rounded-full"></div>

            {/* Gif */}
            <div className="fixed bottom-0 right-0 w-56 h-56">
            <img
                src="./loader.gif"
                alt="Loading..."
                className="w-full h-full object-contain"
            />
            </div>
        </div>
    );
}