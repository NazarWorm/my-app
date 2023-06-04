import { title } from 'process';
import React from 'react';

interface IFPost{
   userId?: number,
   username?: string,
   id?: number,
   title?: string,
   body?: string
}

function FPost ( props: IFPost ){

   const getTitle = () => {
      let title = props.title;
      let res = title?.charAt(0).toUpperCase()! + title?.slice(1)!;
      return res;
   }

   return (
    <div className='
    bg-gradient-to-br
    from-zinc-200 to-zinc-400
    border
    border-zinc-400
    border-opacity-50
    filter drop-shadow-[4px_4px_7px_rgba(0,0,0,.3)]
    rounded-lg
    m-5
    py-1
    px-2'>
       <div className='flex flex-row'>
         <span className='font-bold text-zinc-600 text-lg mr-3'>{getTitle()}</span>
         <span className='text-black text-opacity-25'>{props.username}</span>
       </div>
       <p className='text-zinc-500 text-left'>{props.body}</p>
    </div>
   );
}

export default FPost;
export type {IFPost};