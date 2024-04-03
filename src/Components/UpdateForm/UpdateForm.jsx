import React from 'react';

const UpdateForm = ({ isOpen, closeModal,addedTask, setUpdatedTask, handleUpdateTask }) => {
    
    const handleChange = (event) => {
        setUpdatedTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateTask();
    };

    return (
        <div>
            {
                isOpen && (
                    <div className="max-w-5xl fixed top-20 left-64 w-full mx-auto bg-[#94aba1] p-6">
                        <h2 className="text-xl font-bold mb-4 text-white">Update Task</h2>
                        <form onSubmit={handleSubmit}> 
                            <div className="mb-4">
                                <textarea defaultValue={addedTask?.task} onChange={handleChange} name="task" className="resize-none mt-1 p-2 border text-white font-semibold w-full h-[582px] md:h-[866px] lg:h-[336px] bg-transparent"></textarea>
                            </div>
                            <button type="submit" className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md">Save</button>

                        <button onClick={closeModal} type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md ml-2">Cancel</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default UpdateForm;