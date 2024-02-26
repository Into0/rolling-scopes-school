export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsApi {
  articles: Article[];
  sources: Source[];
}

export interface LoaderOptions {
  [key: string]: string | number | boolean;
}

export interface EndpointOptions {
  endpoint: string;
  options?: LoaderOptions;
}

export interface CallbackFunction<T> {
  (data: T): void;
}
