import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    // stars: []
};

const UpdateMovie = props => {
    const [item, setItem] = useState(initialItem);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
          value = parseInt(value, 10);
        }
        setItem({
          ...item,
          [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        // PUT request
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${item.id}`, item)
          .then(res => {
            props.updateList(res.data);
            console.log('history', props.history)
            props.history.push("/movies");
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
          value={item.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
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