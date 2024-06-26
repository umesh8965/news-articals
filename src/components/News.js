import React, { useEffect, useState, ChangeEvent } from "react";
import { ApiHelper } from "../Helpers/Helpers";
import moment from "moment";

interface Category {
  slug: string;
  name: string;
}

interface Source {
  slug: string;
  name: string;
}

interface NewsArticle {
  title: string;
  description: string;
  category: string;
  source: string;
  date: string;
}

interface SearchParams {
  category: string;
  sources: string;
  from: string;
  q: string;
}

function News() {
  const categoryList: Category[] = [
    { slug: "business", name: "Business" },
    { slug: "entertainment", name: "Entertainment" },
    { slug: "health", name: "Health" },
    { slug: "sports", name: "Sports" },
    { slug: "technology", name: "Technology" },
  ];

  const sourceList: Source[] = [
    { slug: "bbc-news", name: "All" },
    { slug: "the-guardian", name: "The Guardian" },
    { slug: "the-new-york-times", name: "The New York Times" },
  ];

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    category: "business",
    sources: "bbc-news",
    from: "",
    q: "",
  });

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchParams.q.trim() !== "") {
      setLoading(true);
      const timeoutId = setTimeout(async () => {
        await getNews();
      }, 500); // Adjust this delay as needed
      setTypingTimeout(timeoutId);
    }

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [searchParams.q]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      switch (searchParams.sources) {
        case "bbc-news":
          const allNewsQuery = {
            q: searchParams.q,
            category: searchParams.category ? searchParams.category : "general",
            from_date: searchParams.from,
          };
          const queryString = Object.entries(allNewsQuery)
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
          const bbcNews = await ApiHelper(
            `${window.env.BBC_NEW_API_URL}?${queryString}`,
            "GET",
            {},
            { "X-Api-Key": window.env.BBC_NEW_API_KEY }
          );
          if (bbcNews?.articles && bbcNews?.articles.length > 0) {
            let bbcNewsArray: NewsArticle[] = [];
            bbcNews?.articles.map((object: any) => {
              let newObj: NewsArticle = {
                title: object?.title,
                description: object?.description,
                category: searchParams?.category,
                source: object?.source?.name,
                date: object?.publishedAt,
              };
              bbcNewsArray.push(newObj);
            });
            setNews(bbcNewsArray);
          }
          setLoading(false);
          break;
        case "the-guardian":
          const theGuardianNewsQuery = {
            q: searchParams.q,
            section: searchParams.category,
            from_date: searchParams.from,
          };
          const theGuardianQueryString = Object.entries(theGuardianNewsQuery)
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
          const theGuardianNews = await ApiHelper(
            `${window.env.THE_GUARDIAN_API_URL}?${theGuardianQueryString}&api-key=${window.env.THE_GUARDIAN_API_KEY}`,
            "GET",
            {},
            {}
          );
          if (
            theGuardianNews?.response?.results &&
            theGuardianNews?.response?.results.length > 0
          ) {
            let theGuardianArray: NewsArticle[] = [];
            theGuardianNews?.response?.results.map((object: any) => {
              let newObj: NewsArticle = {
                title: object?.webTitle,
                description: object?.webTitle,
                category: searchParams?.category,
                source: searchParams?.sources,
                date: object?.webPublicationDate,
              };
              theGuardianArray.push(newObj);
            });
            setNews(theGuardianArray);
          }
          setLoading(false);
          break;
        case "the-new-york-times":
          const theNewYorkTimesNews = await ApiHelper(
            `${window.env.THE_NEW_YORK_TIMES_API_URL}?api-key=${window.env.THE_NEW_YORK_TIMES_API_KEY}&q=${searchParams.q}&fq=${searchParams.category}`,
            "GET",
            {},
            {}
          );
          if (
            theNewYorkTimesNews?.response?.docs &&
            theNewYorkTimesNews?.response?.docs.length > 0
          ) {
            let theNewYorkTimesNewsArray: NewsArticle[] = [];
            theNewYorkTimesNews?.response?.docs.map((object: any) => {
              let newObj: NewsArticle = {
                title: object?.headline?.main,
                description: object?.lead_paragraph,
                category: searchParams?.category,
                source: object?.source,
                date: object?.pub_date,
              };
              theNewYorkTimesNewsArray.push(newObj);
            });
            setNews(theNewYorkTimesNewsArray);
          }
          setLoading(false);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof SearchParams) => {
    setSearchParams((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
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
            onChange={(event) => handleSearchInputChange(event, "q")}
            value={searchParams.q}
            className="w-full dark:bg-gray-800 dark:text-white block px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Search Articles by Keyword..."
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            onChange={(event) => handleSearchInputChange(event, "category")}
            className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchParams.category}
          >
            {categoryList.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
          <select
            onChange={(event) => handleSearchInputChange(event, "sources")}
            className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchParams.sources}
          >
            {sourceList.map((source) => (
              <option key={source.slug} value={source.slug}>{source.name}</option>
            ))}
          </select>
          <input
            type="date"
            className="dark:bg-gray-800 dark:text-white block shadow-md focus:ring focus:ring-blue-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchParams.from}
            onChange={(event) => handleSearchInputChange(event, "from")}
          />
          <button
            className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg border-solid border-2 border-sky-500"
            onClick={() => getNews()}
          >
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
              <div
                key={i}
                className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 shadow-md p-6 border-solid border-2 border-sky-900"
              >
                <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-sky-400">
                  {post.title}
                </h2>
                <p className=" text-slate-100 mb-4">{post.description}</p>
                <span className="text-sm text-gray-300 mr-4">
                  Category: {post.category}
                </span>
                <span className="text-sm text-gray-300 mr-4">
                  {post.source ? `Source: - ${post.source}` : ""}{" "}
                </span>
                <span className="text-sm text-gray-300">
                  Date: {moment(post.date).format("YYYY-MM-DD")}
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
