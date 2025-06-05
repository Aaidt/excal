"use client"
export function AuthPage({ isSignin }: {
    isSignin: boolean
}) {
    return <div className="flex justify-center items-center w-screen h-screen text-black">
        <div className="p-6 m-2 bg-white/80 rounded-lg">
            <div className="p-2">
                <input className="p-1" type="text" placeholder="Enter username" />
            </div>
            <div className="p-2">
                <input type="password" className="p-1" placeholder="Enter password" />
            </div>

            <div className="pt-3 flex justify-center items-center">
                <button
                    onClick={() => {

                    }}
                >{isSignin ? "Sign-in" : "Sign-up"}</button>
            </div>
        </div>
    </div>
}