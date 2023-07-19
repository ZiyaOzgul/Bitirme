import React, { useEffect, useState } from "react";
import {
  UilTrashAlt,
  UilEditAlt,
  UilSpinner,
  UilPlus,
  UilCheck,
  UilTimesCircle,
} from "@iconscout/react-unicons";
import {
  daysStore,
  deleteNotesAsync,
  getNotesAsync,
  notes,
  postNotesAsync,
} from "../redux/plannerSlice/plannerSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

const AllNotes = () => {
  //
  const [clock, setClock] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [dayName, setDayName] = useState("");
  const dayNames = useSelector(daysStore);
  const dispatch = useDispatch();
  const allNotes = useSelector(notes);
  const [addNote, setAddNote] = useState(false);

  //
  useEffect(() => {
    dispatch(getNotesAsync());
    setInterval(() => {
      const dateobj = new Date();
      setClock(dateobj.toLocaleTimeString());
    }, 1000);
    const date = new Date();
    let currentDate = `${date.getDate()}:${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }:${date.getFullYear()}`;
    setDayName(dayNames[date.getDay()]);
    setDateTime(currentDate);
  }, [dispatch]);

  //
  const formik = useFormik({
    initialValues: {
      noteTitle: "",
      noteBody: "",
    },
    onSubmit: (e) => {
      dispatch(
        postNotesAsync({
          title: e.noteTitle,
          note: e.noteBody,
        })
      );
      setAddNote(false);
      e.noteBody = "";
      e.noteTitle = "";
      e.preventDefault();
    },
  });
  const handleDelete = (id) => {
    dispatch(deleteNotesAsync(id));
  };
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
      <div
        className={`relative w-full overflow-y-scroll h-screen flex items-center px-4 justify-start py-10 flex-col bg-gradient-to-br from-blue-900 to bg-sky-900  shadow shadow-blue-900 `}
      >
        <div className="w-2/3 flex items-center justify-start">
          <h1 className="font-bold text-6xl text-white  mb-20 mt-10">
            Günün Notları
          </h1>
        </div>

        {/* Note Cards */}
        <div className="w-full h-full flex itmes-center justify-center space-x-12 ">
          <div className="w-1/3 h-full flex flex-col items-center  space-y-6 ">
            {allNotes.map((notes) => (
              <div
                key={notes._id}
                className="w-full h-40  bg-slate-800 border rounded-3xl border-slate-900  flex flex-col items-center justify-start text-white relative group mx-6"
              >
                <h1 className="font-bold text-2xl px-1 my-4">{notes.title} </h1>
                <p className="font-medium text-sm px-1 my-4">{notes.note}</p>
                <p className="absolute bottom-2 right-4 text-sm font-medium ">
                  Created At : <i>{notes.createdAt}</i>
                </p>
                {/* <UilEditAlt
                  // onClick={() => handleEdit()}
                  className={` opacity-0  absolute w-8 h-8 cursor-pointer top-2  right-10 text-blue-600 hover:text-slate-900 hover:scale-105 duration-500 ease-in-out transition-all group-hover:opacity-100  `}
                ></UilEditAlt> */}
                <UilTrashAlt
                  onClick={() => handleDelete(notes._id)}
                  className={`opacity-0 absolute w-8 h-8 cursor-pointer top-2 right-2 text-blue-600 hover:text-red-600 hover:scale-105 duration-500 ease-in-out transition-all  group-hover:opacity-100`}
                ></UilTrashAlt>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-start w-1/3 ">
            <h4 className="font-semibold text-4xl text-white mt-16">
              {dayName} | {dateTime}
            </h4>
            <h3 className="font-semibold text-6xl text-white mt-10">{clock}</h3>

            <div
              className="flex items-center justify-center text-white space-x-2 group mt-40 border border-white rounded-lg p-2 cursor-pointer hover:border-blue-500 hover:scale-110 transition-all ease-in-out duration-500"
              onClick={() => setAddNote(true)}
            >
              <p className="font-medium text-xl group-hover:text-blue-500 group-hover:scale-110 transition-all ease-in-out duration-500">
                Not Ekle
              </p>
              <UilPlus className="w-10 h-10 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:scale-110 transition-all ease-in-out duration-500"></UilPlus>
            </div>
          </div>
        </div>
        {/* modal */}
        <div
          className={`fixed top-0 right-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 ${
            addNote ? "block" : "hidden"
          } `}
        >
          <form
            className="relative text-white rounded-2xl p-4 w-1/3 h-auto flex flex-col items-center justify-center border border-slate-600 shadow shadow-slate-400 bg-gradient-to-br from-slate-800 to-gray-800"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="font-medium text-4xl px-2 my-4">Notunuzu Girin</h1>
            <label
              className="w-2/3 text-lg font-medium py-2"
              htmlFor="noteTitle"
            >
              Note İsmi
            </label>
            <input
              type="text"
              className="font-medium text-lg px-4 py-3 w-2/3 rounded-2xl outline-none border border-gray-400 bg-slate-600 hover:bg-slate-800 focus:bg-slate-700 focus:ring-gray-700 focus:border-slate-700 transition-all ease-in-out duration-500 cursor-pointer"
              name="noteTitle"
              id="noteTitle"
              placeholder="Not Başlık..."
              onChange={formik.handleChange}
              value={formik.values.noteTitle}
            />
            <label
              className="w-2/3 text-lg font-medium mt-6 mb-3"
              htmlFor="noteBody"
            >
              Notunuz
            </label>
            <textarea
              name="noteBody"
              id="noteBody"
              cols="30"
              rows="10"
              className="font-medium text-lg px-4 py-3 w-2/3 rounded-2xl outline-none border border-gray-400 bg-slate-600 hover:bg-slate-800 focus:bg-slate-700 focus:ring-gray-700 focus:border-slate-700 transition-all ease-in-out duration-500 cursor-pointer"
              placeholder="Notum..."
              onChange={formik.handleChange}
              value={formik.values.noteBody}
            ></textarea>
            <button
              type="submit"
              className="px-3 py-2 my-4 rounded-xl border-gray-400 bg-slate-500 hover:text-blue-500 hover:scale-110 hover:bg-slate-700 focus:bg-slate-700 focus:ring-gray-700 focus:border-slate-700 transition-all ease-in-out duration-500 flex items-center group"
            >
              Kaydet
              <UilCheck className="w-8 h-8 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:scale-110 transition-all ease-in-out duration-500"></UilCheck>
            </button>
            <UilTimesCircle
              className=" text-red-500 absolute top-4 right-4 w-8 h-8 hover:text-red-600  hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"
              onClick={() => {
                formik.values.noteBody = "";
                formik.values.noteTitle = "";
                setAddNote(false);
              }}
            ></UilTimesCircle>
          </form>
        </div>
      </div>
    );
  }
};

export default AllNotes;
