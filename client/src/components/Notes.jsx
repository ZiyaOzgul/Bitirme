import React, { useEffect } from "react";
import {
  UilTrashAlt,
  UilEditAlt,
  UilSpinner,
  UilPlus,
  UilCheck,
  UilTimesCircle,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotesAsync,
  getNotesAsync,
  notes,
} from "../redux/plannerSlice/plannerSlice";
const Notes = () => {
  const dispatch = useDispatch();
  //useEffect
  const isLoading = useSelector((state) => state.planner.isLoadingNotes);
  // const handleDelete = (id) => {
  //   dispatch(deleteNotesAsync(id));
  // };
  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);
  const allNotes = useSelector(notes);

  console.log(allNotes);
  if (allNotes == "" || allNotes == null) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="font-bold text-6xl text-white">
          Loading
          <UilSpinner className="animate-spin w-10 h-10 inline-block"></UilSpinner>
        </h1>
      </div>
    );
  } else {
    return (
      <div className="w-1/3 h-screen overflow-y-auto   mx-1 flex flex-col justify-start items-center space-y-4 relative">
        <h1 className=" w-5/6 px-4 py-2 border-b border-b-blue-500 text-white font-semibold text-base">
          Today's Notes
        </h1>
        {/* Notes Card */}
        <div className="w-full h-full flex flex-col items-center justify-start">
          {allNotes.map((item) => {
            <div className="w-5/6 h-1/5 bg-slate-800 border rounded-3xl border-slate-900  flex flex-col items-center justify-start text-white relative group">
              <h1 className="font-bold text-2xl px-1 my-4">Note Title</h1>
              <p className="font-medium text-sm px-1 my-4">
                Note Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit, ducimus.
              </p>
              <p className="absolute bottom-2 right-4 text-sm font-medium">
                Created At : <i>21.6.2023</i>
              </p>
              <UilEditAlt
                // onClick={() => handleEdit()}
                className={` opacity-0  absolute w-8 h-8 cursor-pointer top-2  right-10 text-blue-600 hover:text-slate-900 hover:scale-105 duration-500 ease-in-out transition-all group-hover:opacity-100  `}
              ></UilEditAlt>
              <UilTrashAlt
                // onClick={() => handleDelete()}
                className={`opacity-0 absolute w-8 h-8 cursor-pointer top-2 right-2 text-blue-600 hover:text-red-600 hover:scale-105 duration-500 ease-in-out transition-all  group-hover:opacity-100`}
              ></UilTrashAlt>
            </div>;
          })}
        </div>
      </div>
    );
  }
};

export default Notes;
