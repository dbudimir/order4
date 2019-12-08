import React, { Component } from 'react';
import Router from 'next/router';
import tagIndex from '../public/static/tag-index.json';

import SearchRow from './styles/Search';

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
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      selectedChain: '',
      // What the user has entered
      userInput: ''
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

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  runSearch = e => {
    let chainName = document.querySelector('.chain-select').value;
    let tagInput = '';

    if (e === undefined) {
      tagInput = document.querySelector('.tag-input').value;
    } else {
      tagInput = e.currentTarget.innerText;
    }

    //  let tagInput = typeof e === undefined ? e.currentTarget.innerText : currentTag;
    console.log(tagInput);

    this.setState(
      {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        selectedChain: chainName,
        userInput: tagInput
      },
      () => {
        Router.push(`/chains/${this.state.selectedChain}/${this.state.userInput}`);
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

    // User pressed the enter key, update the input and close the
    // suggestions
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
  };

  render() {
    const {
      onChange,
      runSearch,
      onKeyDown,
      state: { activeSuggestion, filteredSuggestions, showSuggestions, userInput }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
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
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <SearchRow>
        <div className="search-container">
          <div className="header-text">
            <h1>MEALdig</h1>
            <h2>
              Discover new meals and custom orders at your favorite fast-casual dining spots. Select
              a chain and search for a meal type to get started.
            </h2>
          </div>
          <div className="search-box-container">
            <div className="select-container">
              <select
                className="search-action chain-select"
                onChange={this.updateChain}
                name="chain"
              >
                <option value="" disabled selected>
                  Select chain
                </option>
                <option value="chipotle">Chipotle</option>
                <option value="&pizza">&Pizza</option>
              </select>
              <img src="../../static/arrow-down.svg" alt="link-out-icon" />
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
              <img src="../static/search.svg" alt="search" />
            </div>
          </div>
        </div>
      </SearchRow>
    );
  }
}
