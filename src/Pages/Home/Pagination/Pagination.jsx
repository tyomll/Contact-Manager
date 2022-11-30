import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import "./Pagination.css";

const Pagination = ({
  contactList,
  onePageUserCount,
  setOnePageUserCount,
  setCurrentPage,
  currentPosts,
  firstContactIndex,
  lastContactIndex,
  currentPage,
}) => {
  return (
    <div className="pag">
      <div className="pagination">
        <div className="flex items-center justify-between border-gray-200 px-4 py-3 sm:px-6 ">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{firstContactIndex + 1}</span> to{" "}
              <span className="font-medium">
                {contactList[contactList.length - 1]
                  ? contactList[contactList.length - 1].id !==
                    currentPosts[currentPosts.length - 1].id
                    ? lastContactIndex
                    : contactList.length
                  : null}
              </span>{" "}
              of <span className="font-medium">{contactList.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm ml-5"
              aria-label="Pagination"
            >
              <a
                href="#"
                style={{ display: currentPage === 1 ? "none" : "inline-flex" }}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                onClick={() => {
                  if (currentPage !== 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {contactList.map((contact, i) => {
                let pageCount = Math.ceil(
                  contactList.length / onePageUserCount
                );
                if (i <= pageCount - 1) {
                  return (
                    <a
                      key={i}
                      href="#"
                      aria-current="page"
                      className={`relative z-10 inline-flex items-center border border-gray-200 text-gray-500 hover:bg-gray-50 bg-white px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 ${
                        currentPage === i + 1
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : ""
                      }`}
                      onClick={() => {
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </a>
                  );
                }
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="contacts-count-per-page">
        <span>Contacts Per Page</span>
        <input
          type="number"
          value={onePageUserCount}
          onChange={(e) => {
            console.log(e.target.value);
            if (e.target.value.trim().length !== 0 && e.target.value !== "0") {
              setOnePageUserCount(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
