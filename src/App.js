import React from 'react';
import FlagQuestion from './components/FlagQuestion/FlagQuestion';
import Header from './components/Header';

import './App.css';

const Choice = props => {
	return (
		<label>
			{props.name}
			<input type="radio" value={props.name} onClick={this.onClick} />
		</label>
	);
};

const Flag = props => {
	return <img src={props.flag} alt={props.name} style={{ height: '200px', width: '300px' }} />;
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: undefined,
			answerCountry: undefined, // example: { name: USA, flag: 'https://' }
			options: []
		};
	}

	// after component loaded
	componentDidMount = () => {
		// fetch for all countries and save in state (show loading page while waiting)
		// grab one random country and save to this.state.answerCountry
		// grab four random country names
		fetch('https://restcountries.eu/rest/v2/all')
			.then(res => res.json())
			.then(countries => {
				const length = countries.length;
				const answerCountry = generateRandomNum(countries.length - 1);
				const options = _getOptions(answerCountry, countries);
				this.setState({ countries, length, answerCountry, options });
			})
			.catch(err => console.log(err));
	};

	// handle submit

	// set country and dummy options
	handleNext = () => {
		const { countries } = this.state;
		const answerCountry = generateRandomNum(countries.length - 1);
		const options = _getOptions(answerCountry, countries);
		this.setState({ answerCountry, options });
	};

	render() {
		let flag = <div>loading...</div>;
		let { answerCountry, options, countries } = this.state;
		if (answerCountry) {
      const countryFlag = countries[answerCountry].flag;
      const countryName = countries[answerCountry].name;
			flag = <Flag flag={countryFlag} name={countryName} />;
		}

		return (
			<div className="container">
				<Header />
				<FlagQuestion correctOption={this.state.answerCountry} countries={countries} options={options} handleNext={this.handleNext} />
				{flag}
			</div>
		);
	}
}

export default App;

// generate a random number between (0 - range)
function generateRandomNum(range) {
	return Math.floor(Math.random() * range);
}

// shuffle array
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// generate three options (given one correct option), 4 items in arr in total
function _getOptions(correctOption, allChoices) {
  let options = [correctOption];
  const length = allChoices.length;
  for (let i = 1; i < 4; i += 1) {
    let optionIndex = generateRandomNum(length - 1);
    while (options.indexOf(optionIndex) !== -1) {
      optionIndex = generateRandomNum(length - 1);
    }
    options[i] = optionIndex;
  }
  return shuffle(options);
}