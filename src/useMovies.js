//use a named export not a default 
import { useState, useEffect } from "react"

const KEY = "5d0a7cf1";

export function useMovies(query) 
{

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            // callback?.()
          const controller = new AbortController();
    
          //define it here, let it async run
          async function fetchMovies() {
            try {
              setIsLoading(true);
              setError("");
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
    
              if (!res.ok) throw new Error("sumting wong");
    
              const data = await res.json();
    
              if (data.Response == "False") {
                throw new Error("Movie not found");
              }
              setMovies(data.Search);
              setError("");
            } catch (err) {
              console.log(err.message);
              //takes the throw new Error messag and displays it
    
              //to stop the clean up function setting errors
              if (err.name !== "AbortError") {
                setError(err.message);
              }
            } finally {
              setIsLoading(false);
            }
          }
    
          //fixing race conditions firing
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
    
        //   handleCloseMovie();
          fetchMovies();
    
          return function () {
            controller.abort();
          };
        },
        [query]
      );

    return {movies, isLoading, error}
}