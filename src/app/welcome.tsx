export default function Welcome() {
    return (
        <div
            className="h-screen w-full bg-[url('/background.jpg')] bg-cover bg-center"
        >
            <div className="-mt-24 flex flex-col items-center">
                <img src="./Logo.webp" className="scale-50" alt="Logo" />
                <div className="text-white text-3xl mt-36">
                    Press Space
                </div>
            </div>
        </div>
    );
}
