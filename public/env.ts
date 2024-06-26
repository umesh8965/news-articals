enum ApiUrls {
  BBC_NEW_API_URL = "https://newsapi.org/v2/top-headlines/sources",
  THE_GUARDIAN_API_URL = "https://content.guardianapis.com/search",
  THE_NEW_YORK_TIMES_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
}

interface ApiKeys {
  BBC_NEW_API_KEY: string;
  THE_GUARDIAN_API_KEY: string;
  THE_NEW_YORK_TIMES_API_KEY: string;
}

const env: { [key in keyof typeof ApiUrls | keyof ApiKeys]: string } = {
  BBC_NEW_API_URL: ApiUrls.BBC_NEW_API_URL,
  THE_GUARDIAN_API_URL: ApiUrls.THE_GUARDIAN_API_URL,
  THE_NEW_YORK_TIMES_API_URL: ApiUrls.THE_NEW_YORK_TIMES_API_URL,
  BBC_NEW_API_KEY: "c5dcd1f88d0042f29ebec1c7d6598a1c",
  THE_GUARDIAN_API_KEY: "f25fc3f6-df87-4aa5-801f-5b5068704610",
  THE_NEW_YORK_TIMES_API_KEY: "nCM6qEAwiPdvOd15okls02NdoeBkTLBK"
};

window.env = env;
