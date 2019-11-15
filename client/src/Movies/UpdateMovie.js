import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    
    title: '',
    director: '',
    metascore: 0,
    // stars: []
};

const UpdateMovie = props => {
    const [movies, setMovies] = useState(initialItem);
    console.log(props);
    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
          value = parseInt(value, 10);
        }
        setMovies({
          ...movies,
          [e.target.name]: value
        });
    };

    useEffect(() => {
        // Solves refresh race condition
        if (props.savedList.length > 0) {
          const newMovie = props.savedList.find(
            thing => `${thing.id}` === props.match.params.id
          );
          setMovies(newMovie);
        }
      }, [props.savedList, props.match.params.id]);

    const handleSubmit = e => {
        // PUT request
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${movies.id}`, movies)
          .then(res => {
            // props.setSavedList(res.data);
            props.history.push(`/`);
          })
          .catch(err => console.log(err));
    };

    if (props.savedList.length === 0) {
        return <h2>Loading data...</h2>;
      }

return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movies.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movies.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movies.metascore}
        />

        {/* <input
          type="array"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={item.stars}
        /> */}

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;