import React from "react";

function News() {
  return (
    <div className="max-w-screen-lg container mx-auto ">
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Article Search and Filtering
        </h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full dark:bg-gray-800 dark:text-white block px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Search Articles by Keyword..."
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <select className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="">Select Category</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
          </select>
          <select className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="">Select Source</option>
            <option value="bbc-news">BBC News</option>
            <option value="cnn">CNN</option>
            <option value="the-new-york-times">The New York Times</option>
          </select>
          <input
            type="date"
            className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg border-solid border-2 border-sky-500">
            Apply Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-sky-400">Article Title</h2>
            <p className=" text-slate-100 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <span className="text-sm text-gray-300 mr-4">Category: Business</span>
            <span className="text-sm text-gray-300 mr-4">Source: BBC News</span>
            <span className="text-sm text-gray-300">Date: 2022-10-05</span>
          </div>
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-sky-400">Article Title</h2>
            <p className=" text-slate-100 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <span className="text-sm text-gray-300 mr-4">Category: Business</span>
            <span className="text-sm text-gray-300 mr-4">Source: BBC News</span>
            <span className="text-sm text-gray-300">Date: 2022-10-05</span>
          </div>
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-sky-400">Article Title</h2>
            <p className=" text-slate-100 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <span className="text-sm text-gray-300 mr-4">Category: Business</span>
            <span className="text-sm text-gray-300 mr-4">Source: BBC News</span>
            <span className="text-sm text-gray-300">Date: 2022-10-05</span>
          </div>
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-sky-400">Article Title</h2>
            <p className=" text-slate-100 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <span className="text-sm text-gray-300 mr-4">Category: Business</span>
            <span className="text-sm text-gray-300 mr-4">Source: BBC News</span>
            <span className="text-sm text-gray-300">Date: 2022-10-05</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
