import { MdOutlineDeleteOutline } from "react-icons/md";

const TaskCard = () => {
    return (
        <div className='bg-slate-600/50 cursor-pointer border-y border-slate-800 text-white flex justify-between items-center p-3'>
            <h1>Card title......</h1>
            <button className="text-2xl text-red-500 hover:text-red-600 duration-300 px-5 p-1"><MdOutlineDeleteOutline /></button>
        </div>
    );
};

export default TaskCard;