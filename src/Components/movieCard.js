import React from 'react';


const MovieCard = (props) => {
    return (
        
									<div className="movieEntry">
								{props.movie.poster ? (<img src={props.movie.poster} alt={props.movie.title} /> ) : null }
								
							
								<h3>{props.movie.title}</h3>
								<p style={{fontStyle: "italic"}}>{props.movie.rated} {props.movie.year}</p>
								<p>{props.movie.fullplot}</p>
								
								</div>
							
    );
}

export default MovieCard;