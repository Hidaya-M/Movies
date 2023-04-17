import "./App.css"
import SearchIcon from "./search.svg"
import { useEffect , useState } from "react"
import MovieCard from "./MovieCard"
// we use hook cause we use function
//  aceb8800  bring the code from your email
const API_URL = "https://www.omdbapi.com?apikey=aceb8800"
const App = () => {
    const [searchTerm, setSearchTerm] = useState("Batman");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true)
  
    useEffect(() => {
      searchMovies();
    }, []);
  
    const searchMovies = async (query = null) => {
      console.log(searchTerm)
      setIsLoading(true);
      const response = await fetch(`${API_URL}&s=${searchTerm}&page=${page}`).then((res) => {
        setIsLoading(false)
        return res.json()
      });
      const data = response;
      if (data.Search) {
        setMovies(data.Search);
      }
    };

    const searchMoviesMore = async () => {
      setIsLoadingMore(true);
      setPage(page+1)
      console.log(page)
      const response = await fetch(`${API_URL}&s=${searchTerm}&page=${page}`).then((res) => {
        setIsLoading(false)
        setIsLoadingMore(false)
        return res.json()
      });

      const allMovies = movies.concat(response.Search)
      if (response.Search) {
        setMovies(allMovies)
      }else {
        setHasMore(false)
      }


    }

    const onChangeSearch = (e) => {
      setSearchTerm(e.target.value);
      setPage(1);
    }
  
    return (
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => onChangeSearch(e)}
            placeholder="Search for movies"
          />
          {!isLoading ? (
            <img
              src={SearchIcon}
              alt="search"
              onClick={() => searchMovies(searchTerm) | setHasMore(true)}
            />
          ) : (
            <svg
              className="animate-spin"
              aria-hidden="true"
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="#f9d3b4"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M18.364 5.636L16.95 7.05A7 7 0 1019 12h2a9 9 0 11-2.636-6.364z"></path>
            </svg>
          )}
        </div>

        {movies?.length > 0 ? (
          <div>
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
            {hasMore ? (
              <div className="load-more" onClick={searchMoviesMore}>
                <button>
                  {isLoadingMore ? (
                    <svg
                      className="animate-spin"
                      aria-hidden="true"
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="#f9d3b4"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M18.364 5.636L16.95 7.05A7 7 0 1019 12h2a9 9 0 11-2.636-6.364z"></path>
                    </svg>
                  ) : null}
                  Load More
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    );
  };

export default App;
