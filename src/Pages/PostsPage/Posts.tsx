import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import FPost, { IFPost } from '../../components/FPost';
import { useNavigate } from 'react-router-dom';

interface IPosts{
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

interface myDict {
   [key: string]: string;
}

function Posts ( props: IPosts ){

   const navigate = useNavigate();
   const [posts, setPosts] = useState<IFPost[] | null>(null);
   const [users, setUsers] = useState<IUserData[] | null>(null);
   const usernameDict: myDict = {};

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then((posts: IFPost[]) => {
         setPosts(() => posts);
      })
   }, []);

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then((users: IUserData[]) => {
         setUsers(() => users);
      })
   }, []);

   users?.map((user: IUserData, index: number) => {
      usernameDict[""+user.id] = user.username;
   })

   console.log(usernameDict);

   const showPosts = () => {
      return <>{
         posts?.map((post: IFPost, index: number) => {
            return <FPost title={post.title} body={post.body} username={usernameDict[post.userId!]} />
         })
      }</>
   }

   return (
      <>
         <div className='
         bg-gradient-to-br
         from-neutral-300
         to-neutral-500
         p-6
         scroll-smooth
         z-10
         '>
            <span className='uppercase tracking-widest text-zinc-700 font-semibold text-3xl filter drop-shadow-[2px_2px_3px_rgba(0,0,0,0.4)]'>All Posts</span>
            <div className='flex bg-zinc-400 glass flex-col rounded-2xl shadow-lg border mt-6 border-zinc-400'>
                     {
                        posts ? showPosts():<></>
                     }
            </div>
            <input type='button' value="Back To Profile" className='
            mt-6
            border-2
            border-zinc-700
            text-zinc-700
            uppercase
            font-semibold
            py-2
            px-4
            rounded-md
            transition
            hover:bg-zinc-700
            hover:text-zinc-200
            hover:scale-105
            hover:shadow-glow
            hover:shadow-zinc-700
            ' onClick={() => navigate('/profile')}/>
         </div>
      </>
   );
}

export default Posts




/*

*/