import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Fade from "react-reveal/Fade";
import MovieCard from './Components/movieCard'
import './App.css';

const App = function () {
	const starterQuery = {
		titleKeyword: '',
		plotKeyword: '',
		director: ''
	}

	const [movies, setMovies] = useState(null);
	const [searchQuery, setQuery] = useState(starterQuery);
	const [titleKeyword, setTitleKeyword] = useState('');
	const [director, setDirector] = useState('');
	const [plotKeyword, setPlotKeyword] = useState('');
	const [columns, setColumns] = useState(4);

	useEffect(() => {
		axios
			.get("/api/movies")
			.then((movies) => {
				
				setMovies(movies.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const changeTitleKeyword = (event) => {
		setTitleKeyword(event.target.value);
		setQuery({
			...searchQuery,
			titleKeyword: event.target.value
		});
	}

	const changePlotKeyword = (event) => {
		setPlotKeyword(event.target.value);
		setQuery({
			...searchQuery,
			plotKeyword: event.target.value
		});
	}

	const changeDirector = (event) => {
		setDirector(event.target.value);
		setQuery({
			...searchQuery,
			director: event.target.value
		});
	}

	const submitQuery = () => {
		console.log(searchQuery);
		if (plotKeyword === '' && titleKeyword === '' && director === '') {
			alert("Please enter a search term!")
		}
		else {
			setMovies(null);
		axios
			.post("/api/movies", {query: searchQuery})
			.then((response) => {
				switch (response.data.length) {
					case 1: setColumns(1); break;
					case 2: setColumns(2); break;
					case 3: setColumns(3); break;
					default: setColumns(4);
				}
				setMovies(response.data);
				setQuery(starterQuery);
			})
		}
	}

	return (
		<div className="App">
			<h1>MERN Stack Movie Browser</h1>
			<p>Created by <a href="http://patrickvhessman.com/" target="_blank" rel="noreferrer">Patrick Hessman</a> | <a href="https://github.com/PatrickVHessman/mernMovieBrowser/" target="_blank" rel="noreferrer">View Source</a></p>
			<div className="formContainer">
				<div className="formBox">
					<label>Title Keyword</label>
					<input type="text" placeholder="Title Keyword" value={titleKeyword} onChange={changeTitleKeyword}></input>
				</div>
				<div className="formBox">
					<label>Plot Keyword</label>
					<input type="text" placeholder="Plot Keyword" value={plotKeyword} onChange={changePlotKeyword}></input>
				</div>
				<div className="formBox">
					<label>Director</label>
					<input type="text" placeholder="Director" value={director} onChange={changeDirector}></input>
				</div>
			</div>
			<button onClick={submitQuery}>Submit</button>
			
	   <h2>Available movies</h2>
	   <div className="movieContainer" style={{columnCount: columns}}>
			{movies === null ? (
				<div className="loader"></div>
			) : movies.length === 0 ? (
				<p>No movies available</p>
			) : (
				<>
					
					
						{movies.map((movie, index) => {
							return (<Fade bottom key={index}>
							<MovieCard movie={movie} />
							</Fade>)
							
						})}
					
				</>
			)}
			</div>			
			
		</div>
	);
};
export default App