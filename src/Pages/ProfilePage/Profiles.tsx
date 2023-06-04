import React, {useEffect, useRef, useState} from 'react';
import FPost, {IFPost} from '../../components/FPost';
import {IParallax, Parallax, ParallaxLayer} from '@react-spring/parallax';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';

interface IProfiles{
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

function Profiles ( props: IProfiles ){

   const [posts, setPosts] = useState<IFPost[] | null>(null);
   const [users, setUsers] = useState<IUserData[] | null>(null);
   const [userData, setUserData] = useState<IUserData | null>(null);
   const [loggedIn, setLoggedIn] = useState<boolean>(false);
   const parralaxRef = useRef<IParallax>(null!);

   useEffect(() => {
      try{
         fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then((posts: IFPost[]) => {
            setPosts(() => posts);
         })
      }catch(error){
         console.log("Fetching Error: ", error);
      }
   }, []);

   useEffect(() => {
      try{
         fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then((users: IUserData[]) => {
            setUsers(() => users);
         })
      }catch(error){
         console.log("Fetching Error: ", error);
      }
   }, []);

   useEffect(() => {
      let usrDataString = localStorage.getItem("USER_AUTH_DATA");
      setUserData(usrDataString ? JSON.parse(usrDataString):null)
   }, []);

   useEffect(() => {
      if(userData != null){
         setLoggedIn(true);
      }else{
         setLoggedIn(false);
      }
   });

   const showPosts = () => {
      return <>{
         posts?.map((post: IFPost, index: number) => {
            if(post.userId === userData?.id){
               return <FPost title={post?.title} body={post?.body} username={userData?.username} key={post.id}/>
            }
         })
      }</>
   }

   const userLoggedMenu = () => {
      return (
         <>
            <span className='
               text-zinc-300
               text-1xl
               font-medium
               filter
               drop-shadow-[0px_0px_2px_rgba(0,0,0,0.8)]'>Welcome Back</span>

               <span className='
               z-10
               text-5xl
               font-bold
               text-zinc-200
               filter
               drop-shadow-[0px_0px_15px_rgba(0,0,0,0.8)]
               mb-4'>{userData?.name}</span>

               <input type='button' id='seePostsBTN' value='Posts' className='
               border-2
               border-zinc-200
               text-zinc-200 shadow-lg
               bg-zinc-600
               bg-opacity-30
               backdrop-blur-md
               font-normal
               uppercase
               tracking-widest
               w-fit
               py-1
               px-2
               rounded-md
               transition
               hover:bg-cyan-950
               hover:bg-opacity-30
               hover:backdrop-blur-md
               hover:scale-105' onClick={() => parralaxRef.current.scrollTo(0.4)}/>

               <input type='button' id='seeProfileBTN' value='Profile' className='
               mt-4
               border-2
               border-zinc-200
               text-zinc-200 shadow-lg
               bg-zinc-600
               bg-opacity-30
               backdrop-blur-md
               font-normal
               uppercase
               tracking-widest
               w-fit
               py-1
               px-2
               rounded-md
               transition
               hover:bg-cyan-950
               hover:bg-opacity-30
               hover:backdrop-blur-md
               hover:scale-105' onClick={() => parralaxRef.current.scrollTo(1.2)}/>

            <input type='button' id='logOut' value='logOut' className='
               mt-4
               border-2
               border-zinc-200
               text-zinc-200 shadow-lg
               bg-zinc-600
               bg-opacity-30
               backdrop-blur-md
               font-normal
               uppercase
               tracking-widest
               w-fit
               py-1
               px-2
               rounded-md
               transition
               hover:bg-cyan-950
               hover:bg-opacity-30
               hover:backdrop-blur-md
               hover:scale-105' onClick={() => {
                  localStorage.setItem("USER_AUTH_DATA", "");
                  navigate('/');
               }}/>
         </>
      );
   }

   const userNotLoggedMenu = () => {
      return (
         <>
         <span className='text-3xl font-semibold my-4 text-zinc-200 filter drop-shadow-[0px_0px_5px_rgba(0,0,0,0.7)]'>Not Logged In</span>
         <input type='button' id='log-inBTN' value='Log-In' className='
               border-2
               border-zinc-200
               text-zinc-200 shadow-lg
               bg-zinc-600
               bg-opacity-30
               backdrop-blur-md
               font-normal
               uppercase
               tracking-widest
               w-fit
               py-1
               px-2
               rounded-md
               transition
               hover:bg-cyan-950
               hover:bg-opacity-30
               hover:backdrop-blur-md
               hover:scale-105' onClick={() => navigate('/')}/>
         </>
      );
   }

   const loadMenu = () => {
      if (userData != null){
         return userLoggedMenu();
      }else{
         return userNotLoggedMenu();
      }
   }

   const navigate = useNavigate();

   return (
      <Parallax pages={2} style={{ top: '0', left: '0'}} className='scrollbar-none scroll-smooth' enabled={loggedIn} ref={parralaxRef}>
         
         <ParallaxLayer offset={0} speed={-1}>
            <div className='
            flex
            flex-col
            h-screen
            place-content-center'>
               <img src={require('../../assets/images/background-blue.png')} className='
               blur-sm
               fixed
               z-0
               filter
               scale-150'/>
            </div>
         </ParallaxLayer>

         <ParallaxLayer offset={0} speed={0}>

            <div className='
            flex
            flex-col
            h-screen 
            place-content-center
            items-center'>

               {
                  loadMenu()
               }

            </div>

         </ParallaxLayer>

         <ParallaxLayer offset={0} speed={0.6} className='pointer-events-none'>

            <img src={require('../../assets/images/foreground-cropped.png')} className='
               filter
               grayscale
               brightness-150
               drop-shadow-[0px_0px_15px_rgba(0,0,0,1)]
               pointer-events-none'/>

         </ParallaxLayer>

         <ParallaxLayer offset={0.99} speed={1.75}>

            <div className='
            bg-gradient-to-br
            from-neutral-300
            to-neutral-500
            shadow-[0px_0px_35px_rgba(0,0,0,1)]
            w-screen
            h-fit
            min-h-[1080px]
            p-6
            pb-12
            rounded-t-3xl
            scroll'>

               <h1 className='
               text-neutral-700
               font-semibold
               text-5xl
               filter
               uppercase
               drop-shadow-[4px_4px_5px_rgba(0,0,0,0.3)]'>Your Posts</h1>

               {
                  posts ? showPosts() : <></>
               }

               <input type='button' id='allPostsBTN' value='All Posts' className='
               border-2
               border-zinc-200
               text-zinc-200 shadow-lg
               bg-zinc-600
               bg-opacity-30
               backdrop-blur-md
               font-normal
               uppercase
               tracking-widest
               w-fit
               py-1
               px-2
               rounded-md
               transition
               hover:bg-cyan-950
               hover:bg-opacity-30
               hover:backdrop-blur-md
               hover:scale-105' onClick={() => {
                  navigate('/posts');
               }}/>

            </div>

            <div className='
            bg-gradient-to-l
            from-blue-500
            to-blue-800 saturate-[.25]
            shadow-[0px_0px_35px_rgba(0,0,0,1)]
            w-screen
            flex
            flex-col
            h-fit
            min-h-[1080px]
            p-6
            rounded-t-3xl
            scroll
            -translate-y-6'>

               <h1 className='
               text-zinc-200
               font-semibold
               uppercase
               text-5xl
               filter
               drop-shadow-[4px_4px_5px_rgba(0,0,0,0.3)]'>Your Profile</h1>

               <div className='
               mt-10
               flex
               flex-row
               w-full
               place-content-center'>

                  <div className='
                  flex
                  flex-col
                  w-1/2
                  mx-16
                  place-content-center'>

                     <span className='
                     text-4xl
                     text-zinc-300
                     filter uppercase
                     drop-shadow-[4px_4px_5px_rgba(0,0,0,0.5)]'>Username</span>

                     <span className='
                     text-zinc-300
                     text-opacity-75
                     mt-4 text-xl'>{userData?.username}</span>

                  </div>

                  <div className='
                  flex
                  flex-col
                  w-1/2
                  mx-16
                  place-content-center'>

                     <span className='text-4xl
                     text-zinc-300
                     uppercase
                     filter
                     drop-shadow-[4px_4px_5px_rgba(0,0,0,0.5)]'>Email</span>

                     <span className='
                     text-zinc-300
                     text-opacity-75
                     mt-4
                     text-xl'>{userData?.email}</span>

                  </div>

               </div>

               <div className='
               mt-10
               flex
               flex-row
               w-full
               place-content-center'>

                  <div className='
                  flex 
                  flex-col
                  w-1/2
                  mx-16
                  place-content-center'>

                     <span className='
                     text-4xl
                     text-zinc-300
                     uppercase
                     filter
                     drop-shadow-[4px_4px_5px_rgba(0,0,0,0.5)]'>Company</span>

                     <span className='
                     text-zinc-300
                     text-opacity-75
                     mt-4
                     text-xl'>{userData?.company.name}</span>

                  </div>

                  <div className='
                  flex
                  flex-col
                  w-1/2
                  mx-16
                  place-content-center'>

                     <span className='
                     text-4xl
                     text-zinc-300
                     uppercase
                     filter
                     drop-shadow-[4px_4px_5px_rgba(0,0,0,0.5)]'>Phone</span>

                     <span className='
                     text-zinc-300
                     text-opacity-75
                     mt-4
                     text-xl'>{userData?.phone.split(' ')[0]}</span>

                  </div>

               </div>

               <div className='
               mt-10
               flex
               flex-row
               w-full
               place-content-center'>

                  <div className='flex
                  flex-col
                  mx-16
                  place-content-center'>

                     <span className='
                     text-4xl
                     text-zinc-300
                     uppercase
                     filter
                     drop-shadow-[4px_4px_5px_rgba(0,0,0,0.5)]'>Website</span>

                     <span className='
                     text-zinc-300
                     text-opacity-75
                     mt-4
                     text-xl'>{userData?.website}</span>

                  </div>

               </div>

            </div>

         </ParallaxLayer>

      </Parallax>
   );
}

export default Profiles