
export function AuthPage({ isSignin }: {
    isSignin: boolean
}) {
    return <div className="flex justify-center items-center w-screen h-screen">
        <div className="p-2 m-2 bg-white/80 rounded-lg">
            <input type="text" placeholder="Enter username" />
            <input type="password" placeholder="Enter password" />

            <button
                onClick={() => {
                    
                }}
                >{isSignin ? "Sign-in" : "Sign-up"}</button>
        </div>
    </div>
}