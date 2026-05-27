import io from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth.context";
import { NODE_BASE_URL } from "./api";


const SocketContext = createContext(null);




const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user, token , logout } = useAuth();



    useEffect(() => {
        if (!user) return;
        const newSocket = io(NODE_BASE_URL, {
            auth: { token },
            reconnectionDelayMax: 0,
            reconnectionAttempts: 5


        })
        newSocket.on('connect', () => {
            console.log('connected');
            setSocket(newSocket)
        });


        newSocket.on('error', () => console.log('error connecting to socket'));

        newSocket.on('disconnect', () => console.log('socket disconnected'));
        newSocket.on('forceLogout',({reason})=>{
            console.log(reason,'hello')
            logout()

        })

        return () => newSocket.close()


    }, [user, token]);
    return (
        <SocketContext.Provider value={socket}>
             {children}
        </SocketContext.Provider>

    )
}



export const useSocket = () => {

    const context = useContext(SocketContext);

    if (!context) {
        throw new Error("useSocket must be used within an SocketProvider");
    }

    return context;
};

export default SocketProvider;