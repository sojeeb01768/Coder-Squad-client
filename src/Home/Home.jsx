import { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";

import { IoLogOutOutline } from "react-icons/io5";
import TaskCard from '../Components/TaskCard/TaskCard';

const Home = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className=' h-screen bg-[#597a67] lg:pt-20 '>
            <div className='max-w-5xl h-full lg:h-[492px] relative mx-auto bg-[#35413c]'>
                <div className='flex justify-between items-center px-6 pt-6'>
                    <div className='flex space-x-4 items-center'>
                        <div>
                            <h1 className='text-base lg:text-lg font-bold text-slate-100' >Nafiz Al Turabi</h1>
                            <button className='border text-xl mt-2 px-5 py-1 rounded-md bg-slate-600 hover:bg-slate-700 text-white duration-300 '><IoLogOutOutline /></button>
                        </div>
                    </div>
                    <div>
                        <button className='text-white text-5xl flex items-center' onClick={toggleForm}><CiCirclePlus />
                            <span className='text-lg uppercase hidden md:block font-semibold'>Add Task</span>
                        </button>
                    </div>
                </div>
                <hr className='border-1 mt-5' />
                {showForm && (
                    <div className="max-w-5xl absolute top-0 w-full mx-auto bg-[#35413c] p-6">
                        <h2 className="text-xl font-bold mb-4 text-white">Add Task</h2>
                        <form>
                            <div className="mb-4">
                                <textarea id="description" name="description" className="resize-none mt-1 p-2 border text-white font-semibold w-full h-[582px] md:h-[866px] lg:h-[336px] bg-transparent"></textarea>
                            </div>
                            <button type="submit" className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md">Save</button>
                            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md ml-2" onClick={toggleForm}>Cancel</button>
                        </form>
                    </div>
                )}

                {/* Added Task Will show here... */}
                <div className='mt-5 px-6 space-y-3'>
                    <TaskCard></TaskCard>
                    <TaskCard></TaskCard>
                </div>
            </div>

        </div>
    );
};

export default Home;