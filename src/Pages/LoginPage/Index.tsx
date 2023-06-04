import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IIndex{
}

interface IUserData{
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

function Index ( props: IIndex ){
    const navigate = useNavigate();
    const [isVisible, setVisible] = useState<Boolean>(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [userData, setUserData] = useState<IUserData | null>(null);

    useEffect(() => {
        let usrDataString = localStorage.getItem("USER_AUTH_DATA");
        setUserData(usrDataString ? JSON.parse(usrDataString):null)
     }, []);

    const onClickHandler: MouseEventHandler <HTMLInputElement> = (e) => {
        let usr: string = usernameRef?.current?.value ? usernameRef?.current?.value : '';
        let pass: string = passwordRef?.current?.value ? passwordRef?.current?.value : '';

        try{
            fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then((data: IUserData[]) => {
                data.map(user => {
                if((user.username === usr || user.email === usr) && user.id.toString() === pass){
                        console.log("YESSSSSSSS BLYATTT");
                        localStorage.setItem("USER_AUTH_DATA", JSON.stringify(user));
                        navigate("/profile");
                    }
                    setVisible(true);
                }  
            );
            });
        }catch (error){
            console.log("Fetching Error: ", error);
        }
    }

    const loggedInMenu = () => {
        return (
            <div className='
            flex
            flex-col
            w-[248px]
            bg-neutral-500
            glass
            p-5
            rounded-lg
            border
            border-indigo-200
            border-opacity-50
            shadow-lg
            shadow-zinc-800'>

                <span className='text-4xl
                font-semibold
                text-zinc-700
                filter
                drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)]'>Already Logged-In</span>

                <input type='button' value="View Profile" onClick={() => navigate('/profile')} className='my-4
                border-2
                border-zinc-700
                px-2
                py-1
                rounded-md
                uppercase
                backdrop-blur-md
                bg-zinc-100
                bg-opacity-30
                transition
                hover:bg-zinc-700
                hover:text-zinc-200
                hover:scale-105
                hover:shadow-glow
                hover:shadow-black'/>

            </div>
        );
    }

    const notLoggedInMenu = () => {
        return (
            <div className='
            flex
            flex-col
            w-[248px]
            bg-neutral-500
            glass
            p-5
            rounded-lg
            border
            border-indigo-200
            border-opacity-50
            shadow-lg
            shadow-zinc-500'>

                <input className='
                    rounded-md
                    bg-zinc-400
                    placeholder-black
                    my-2
                    p-2
                    tracking-widest
                    text-sm
                    focus:outline-none focus:shadow-md focus:shadow-neutral-500 focus:-translate-y-1 focus:placeholder-transparent
                    inputFocus
                    transition
                    glass
                    border
                    border-indigo-100
                    border-opacity-30
                    animate-fadeIn'
                type='text' placeholder='Username / Email' ref={usernameRef}></input>

                <input className='
                    rounded-md
                    bg-zinc-400
                    placeholder-black
                    my-2
                    p-2
                    tracking-widest
                    text-sm
                    focus:outline-none
                    focus:shadow-md
                    focus:shadow-neutral-500
                    focus:shadow-neutral-
                    focus:-translate-y-1
                    focus:placeholder-transparent
                    inputFocus
                    transition
                    glass
                    border
                    border-indigo-100
                    border-opacity-30
                    animate-fadeIn'
                type='password' placeholder='Password' ref={passwordRef}></input>

                <input className='
                    animate-fadeIn
                    mt-2
                    py-2
                    rounded-md
                    border-2
                    border-zinc-800
                    text-zinc-800
                    uppercase
                    tracking-widest
                    transition
                    duration-250
                    hover:bg-zinc-800
                    hover:text-zinc-200
                    hover:shadow-glow
                    hover:shadow-black
                    hover:scale-105
                    active:bg-neutral-700
                    active:border-neutral-700'
                type='button' id='loginBTN' value="Log-In" onClick={onClickHandler}></input>

            </div>
        );
    }

    const loadMenu = () => {
        if(userData != null){
            return loggedInMenu();
        }else{
            return notLoggedInMenu();
        }
    }

   return (
        <>
            <img src={require('../../assets/images/bg-image.png')} alt='bg' className='fixed'/>
            <div className="
            bg-vignette
            flex flex-col 
            h-screen
            items-center
            place-content-center">

                {
                    loadMenu()
                }

                {
                    isVisible ? <div className='
                    flex
                    flex-col
                    w-[248px]
                    bg-rose-700
                    glass
                    p-5
                    rounded-lg
                    border
                    border-rose-200
                    border-opacity-50
                    shadow-lg
                    shadow-zinc-500
                    mt-5
                    animate-fadeIn
                    '>
                        <span className='
                        uppercase
                        text-sm
                        text-rose-950'>Invalid Username Or Password</span>
                    </div> : <></>
                }
            </div>
        </>
   );
}

export default Index