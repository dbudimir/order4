//Utilities
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import tagIndex from '../public/static/tag-index.json';
//Styles
import SearchRow from './styles/Search';
//Components
import ErrorMessageBar from '../components/forms/ErrorMessageBar';

export default class Search extends Component {
  static propTypes = {
    suggestions: tagIndex
  };

  static defaultProps = {
    suggestions: tagIndex
  };

  constructor(props) {
    super();
    this.state = {
      suggestions: tagIndex,
      // Numbber of current suggestions provided
      suggestionCount: 0,
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      selectedChain: '',
      // What the user has entered
      userInput: '',
      // Error toggles
      errorMessages: {
        noInputError: false,
        noChainError: false,
        noTagError: false
      }
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    //Count number of suggestions
    let suggestionCount = document.querySelectorAll('.suggestions > li').length;

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    if (e.target.className !== 'search-action chain-select')
      this.setState({
        activeSuggestion: 0,
        suggestionCount,
        filteredSuggestions,
        showSuggestions: true,
        userInput: e.currentTarget.value,
        errorMessages: {
          noInputError: false,
          noChainError: false
        }
      });
  };

  // Event fired when the user clicks on a suggestion
  runSearch = e => {
    let chainName = document.querySelector('.chain-select').value;
    let tagInput = '';

    if (e === undefined) {
      tagInput = document.querySelector('.tag-input').value;
    } else {
      tagInput = this.state.userInput;
    }

    this.setState(
      {
        selectedChain: chainName,
        userInput: tagInput,
        errorMessages: {
          noInputError: false,
          noTagError: false
        }
      },
      () => {
        console.log(this.state);
        if (this.state.selectedChain === '' && this.state.userInput === '') {
          this.setState({
            errorMessages: {
              noInputError: true
            }
          });
          console.log('error for missing both');
        } else if (this.state.selectedChain === '') {
          this.setState({
            errorMessages: {
              noChainError: true
            }
          });
          console.log('missing chain');
        } else if (this.state.userInput === '') {
          this.setState({
            errorMessages: {
              noTagError: true
            }
          });
          console.log('missing tag');
        } else {
          // Execute search
          if (this.state.suggestionCount > 0) {
            Router.push(`/chains/${this.state.selectedChain}/${this.state.userInput}`);
          }
        }
      }
    );
  };

  onEnter = e => {
    if (e.keyCode === 13) {
      // Trigger the button element with a click
      this.runSearch();
    }
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
    // Keep user input up to date
    else {
      this.setState({ userInput: document.querySelector('.tag-input').value });
    }
  };

  render() {
    const {
      onChange,
      runSearch,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        selectedChain,
        userInput,
        errorMessages
      }
    } = this;

    let suggestionsListComponent;
    let errorBarComponent;
    let noSuggestionsComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = 'suggestion-active';
              }

              return (
                <li className={className} key={suggestion} onClick={runSearch}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        noSuggestionsComponent = (
          <div className="no-suggestions">
            <div className="copy">
              <h3>Oh no!</h3>
              <span>
                We cant find any {userInput} custom meals. Be the first to submit your facorrite
                custom meal in this category.
              </span>
            </div>
            <Link
              href={{
                pathname: '/create-order'
              }}
              as={{ pathname: `/create-order` }}
            >
              <a href={`/create-order`}>Build Custom Meal</a>
            </Link>
          </div>
        );
      }
    }

    if (errorMessages.noInputError === true) {
      errorBarComponent = (
        <ErrorMessageBar message={'Please enter a chain and tag before searching.'} />
      );
    } else if (errorMessages.noChainError === true) {
      errorBarComponent = <ErrorMessageBar message={'Please enter a chain before searching.'} />;
    } else if (errorMessages.noTagError === true) {
      errorBarComponent = <ErrorMessageBar message={'Please enter a tag before searching.'} />;
    }

    return (
      <React.Fragment>
        {errorBarComponent}
        <SearchRow>
          <div className="search-container">
            <div className="header-text">
              <h1>MEALdig</h1>
              <h2>
                Discover new meals and custom orders at your favorite fast-casual dining spots.
                Select a chain and search for a meal type to get started.
              </h2>
            </div>
            <div className="search-box-container">
              <div className="select-container">
                <select
                  className="search-action chain-select"
                  onChange={this.onChange}
                  name="chain"
                >
                  <option value="" disabled selected>
                    Select chain
                  </option>
                  <option value="chipotle">Chipotle</option>
                  <option value="&pizza">&Pizza</option>
                </select>
              </div>
              <div className="autocomplete-input">
                <input
                  className="search-action tag-input"
                  type="text"
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  onKeyUp={this.onEnter}
                  value={userInput}
                  placeholder="low carb, vegan, keto..."
                />
                {suggestionsListComponent}
              </div>
              <div className="search-action search-submit" onClick={this.runSearch}>
                <span>Search</span>
                <img src="../static/search.svg" alt="search" />
              </div>
            </div>
            {noSuggestionsComponent}
          </div>
        </SearchRow>
      </React.Fragment>
    );
  }
}
