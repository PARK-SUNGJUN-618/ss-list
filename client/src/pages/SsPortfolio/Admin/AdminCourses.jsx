import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "../../../components/SsPortfolio/Snackbar";
import { HideLoading, ShowLoading } from "../../../redux/ssPortfolioSlice";

export default function AdminCourses() {
  const snackbarRef = useRef(null);
  const dispatch = useDispatch();
  const [showModalAddChange, setShowModalAddChange] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const { portfolioData } = useSelector((state) => state.ssPortfolio);
  const [courses, setCourses] = useState(
    portfolioData.filter((data) => data.category === "course")
  );

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handleModalChangeCourse = (course) => {
    setShowModalAddChange(true);
    setSelectedItemForEdit(course);
    setTitle(course.title);
    setImage(course.image);
    setLink(course.link);
    setDescription(course.description);
    console.log("test:", course);
  };

  const handleModalAddCourse = () => {
    setShowModalAddChange(true);
    setSelectedItemForEdit(null);
    setTitle("");
    setImage("");
    setLink("");
    setDescription("");
  };

  const handleSubmitAddCourse = async (e) => {
    console.log("test:", "here!?");
    e.preventDefault();
    if (title === "") return;
    try {
      dispatch(ShowLoading());
      setShowModalAddChange(false);
      const body = {
        title,
        image,
        link,
        description,
      };
      const response = await fetch("/api/ssportfolio/addCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);

      const res = await fetch("/api/ssportfolio/getPortfolioData");
      const taskArrayJson = await res.json();
      setCourses(taskArrayJson.filter((data) => data.category === "course"));
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  const handleSubmitUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const coursesArray = courses.map((course) => {
        if (selectedItemForEdit._id === course._id) {
          return {
            ...course,
            title,
            image,
            link,
            description,
          };
        } else {
          return course;
        }
      });
      setCourses(coursesArray);
      setSelectedItemForEdit({
        ...selectedItemForEdit,
        title,
        image,
        link,
        description,
      });

      const body = {
        title,
        image,
        link,
        description,
      };
      console.log(JSON.stringify(body));
      const response = await fetch(
        `/api/ssportfolio/updateCourse/${selectedItemForEdit._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      setShowModalAddChange(false);
      dispatch(HideLoading());
      snackbarRef.current.show();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmitDeleteCourse = async (_id) => {
    if (!window.confirm("Are you sure you wanna delete?")) return;
    dispatch(ShowLoading());
    setCourses(courses.filter((course) => course._id !== _id));
    try {
      const deleteTask = await fetch(`/api/ssportfolio/deleteCourse/${_id}`, {
        method: "DELETE",
      });
      console.log(deleteTask);
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <>
      <div className="flex justify-end px-10 py-4">
        <button
          className="px-5 py-2 text-white bg-secondary"
          onClick={handleModalAddCourse}
        >
          Add Course
        </button>
      </div>
      <div
        className="grid grid-cols-3 pt-10 pb-20 px-10 gap-10 text-white bg-primary
        sm:flex sm:flex-col sm:pt-3"
      >
        {courses.map((course) => {
          return (
            <div
              key={course._id}
              className="shadow border p-5 border-gray-400 flex flex-col"
            >
              <h1 className="text-tertiary text-xl font-bold pb-3">
                {course.title}
              </h1>
              <hr />
              <div className="grow flex py-3 min-h-96">
                <div className="flex flex-col gap-2 w-full">
                  {course.image && (
                    <div className="flex justify-center py-3">
                      <img
                        className="h-52 sm:h-40"
                        src={course.image}
                        alt=""
                      />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <div className="shrink-0 w-24">Image</div>
                    <div className="break-all">{course.image}</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="shrink-0 w-24">Link</div>
                    <div className="break-all">{course.link}</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="shrink-0 w-24">Description</div>
                    <div className="break-all whitespace-pre-wrap">
                      {course.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-5 mt-5">
                <button
                  className="bg-red-500 text-white px-5 py-2 "
                  onClick={() => handleSubmitDeleteCourse(course._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-tertiary text-white px-5 py-2"
                  onClick={() => handleModalChangeCourse(course)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {showModalAddChange ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-5/6 my-6 mx-auto sm:max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {selectedItemForEdit ? "Edit Course" : "Add Course"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalAddChange(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-4">
                    <label
                      className="text-sm text-gray-700 dark:text-gray-700"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="px-3 py-3 placeholder-slate-300
                        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                        focus:outline-none focus:ring w-full resize-none"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      placeholder="Title"
                    ></input>
                    <label
                      className="text-sm text-gray-700 dark:text-gray-700"
                      htmlFor="image"
                    >
                      Image
                    </label>
                    <input
                      type="text"
                      id="image"
                      className="px-3 py-3 placeholder-slate-300
                        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                        focus:outline-none focus:ring w-full resize-none"
                      onChange={(e) => setImage(e.target.value)}
                      value={image}
                      placeholder="Image"
                    ></input>
                    <label
                      className="text-sm text-gray-700 dark:text-gray-700"
                      htmlFor="link"
                    >
                      Link
                    </label>
                    <input
                      type="text"
                      id="link"
                      className="px-3 py-3 placeholder-slate-300
                        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                        focus:outline-none focus:ring w-full resize-none"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                      placeholder="Link"
                    ></input>
                    <label
                      className="text-sm text-gray-700 dark:text-gray-700"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      className="px-3 py-3 h-32 placeholder-slate-300
                        text-slate-600 relative bg-white rounded text-sm border border-zinc-400 shadow outline-none
                        focus:outline-none focus:ring w-full resize-none"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="w-32 sm:w-1/2 text-red-500 border border-red-500 rounded background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear
                      transition-all duration-150 "
                    type="button"
                    onClick={() => setShowModalAddChange(false)}
                  >
                    Close
                  </button>
                  {selectedItemForEdit ? (
                    <button
                      className="w-32 sm:w-1/2 bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleSubmitUpdateCourse}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="w-32 sm:w-1/2 bg-zinc-500 text-white active:bg-zinc-600 font-bold uppercase text-sm px-6 py-3 rounded shadow active:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleSubmitAddCourse}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <></>
      )}
      <Snackbar
        ref={snackbarRef}
        message="Intro Saved Successfully!"
        type="success"
      />
    </>
  );
}
