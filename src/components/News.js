import React, { useEffect, useState } from "react";
import { ApiHelper } from "../Helpers/Helpers";

function News() {
  const categoryList = [
    { slug: "business", name: "Business" },
    { slug: "technology", name: "Technology" },
    { slug: "sports", name: "Sports" },
  ];
  const sourceList = [
    { slug: "bbc-news", name: "BBC News" },
    { slug: "cnn", name: "CNN" },
    { slug: "the-new-york-times", name: "The New York Times" },
  ];
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const moment = require("moment");

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchTerm.trim() !== "") {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        getNews();
      }, 500); // Adjust this delay as needed
      setTypingTimeout(timeoutId);
    } else {
      getNews();
    }

    return () => clearTimeout(typingTimeout);
  }, [searchTerm]);

  const getNews = async () => {
    try {
      /*const res = await ApiHelper("https://api.worldnewsapi.com/search-news?text=tesla&language=en&apikey=c63a89ac149f4c75b1d25fc6aa2d06dc", "GET", {});
      setNews(res.response.results);
      setLoading(false);*/

      /** New York Times */
      const urlNYTApi = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=nCM6qEAwiPdvOd15okls02NdoeBkTLBK";

      /** Guardian */
      const urlGuardianApi = "https://content.guardianapis.com/search?api-key=f25fc3f6-df87-4aa5-801f-5b5068704610";

      /** NewsAPI */
      const url = "https://newsapi.org/v2/everything?q=sport";
      const apiKey = "c5dcd1f88d0042f29ebec1c7d6598a1c";

      

      fetch(url, {
        method: "GET",
        headers: {
          /** x-api-key param only applicable for NewsAPI, No need for other API source*/
          "x-api-key": apiKey,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.articles)
          setNews(data.articles);
          setLoading(false);
        })
        .catch((error) =>
          console.error("There was a problem with the fetch operation:", error)
        );
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="max-w-screen-lg container mx-auto ">
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Article Search and Filtering
        </h1>
        <div className="mb-4">
          <input
            type="text"
            onChange={handleSearchInputChange}
            value={searchTerm}
            className="w-full dark:bg-gray-800 dark:text-white block px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Search Articles by Keyword..."
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <select className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="">Select Category</option>

            {categoryList.map(function (category, i) {
              return <option value="{category.slug}">{category.name}</option>;
            })}
          </select>
          <select className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
            <option value="">Select Source</option>
            {sourceList.map(function (source, i) {
              return <option value="{source.slug}">{source.name}</option>;
            })}
          </select>
          <input
            type="date"
            className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg border-solid border-2 border-sky-500">
            Apply Filters
          </button>
        </div>
        {loading && (
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900">
            Loading....
          </div>
        )}
        {news.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {news.map((post, i) => (
              <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900">
                <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-sky-400">
                  {post.type}
                </h2>
                <p className=" text-slate-100 mb-4">{post.webTitle}</p>
                <span className="text-sm text-gray-300 mr-4">
                  Category: {post.sectionName}
                </span>
                <span className="text-sm text-gray-300 mr-4">Source: - </span>
                <span className="text-sm text-gray-300">
                  Date:{" "}
                  {moment(post.webPublicationDate, "YYYY-MM-DD H:i:s").format(
                    "YYYY-MM-DD"
                  )}
                </span>
              </div>
            ))}
          </div>
        )}

        {news.length == 0 && !loading && (
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900">
            No Records Found
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
