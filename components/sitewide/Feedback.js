/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Utilities
import React, { Component } from 'react';
import axios from 'axios';
import { TwitterShareButton, TwitterIcon, EmailIcon } from 'react-share';
import styled from 'styled-components';

// Styles
const FeedbackIconContainer = styled.div`
  display: block;
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 16px;
  font-family: Nunito;
  cursor: pointer;

  * {
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }

  img {
    height: 24px;
    width: 24px;
    display: block;
  }

  .feedback-component-closed {
    display: flex;
    border-radius: 100px;
    box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    padding: 4px;
    background: #262f40;
    cursor: pointer;

    span {
      display: block;
      color: #ffffff;
      width: 0px;
      height: 0px;
      opacity: 0;
      margin-left: 0px;
    }
  }

  .feedback-component-open {
    display: flex;
    border-radius: 12px;
    box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    align-items: unset;
    padding: 12px;
    background: #262f40;
    border: 2px solid transparent;

    &:hover {
      border: 2px solid #8ca0f8;
    }

    .feedback-modal-open {
      width: 400px;
      height: max-content;
      padding: 6px;
      color: #ffffff;

      .feedback-modal-header {
        width: 100%;
        font-size: 22px;
        margin: 0 0 32px 0;
      }

      .react-share__ShareButton {
        width: 100%;
        margin-bottom: 24px;

        .email-feedback,
        .twitter-feedback {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #ffffff;
          border-radius: 8px;
          padding: 0 12px;
          font-size: 20px;
          font-weight: 700;
          transition-duration: 0.1s;

          p {
            transition-duration: 0.1s;
            margin: 12px 0;
          }

          &:hover {
            background-color: #ffffff;
            color: #262f40;
          }
        }
      }

      .email-input-container {
        display: none;
      }
    }

    .feedback-modal-open.email-input-open {
      .email-feedback {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        background-color: #ffffff;
        color: #262f40;
      }

      .email-input-container {
        display: block;
        padding: 0 12px 24px;
        margin-top: -24px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        background: #ffffff;

        .form-input-label {
          margin-bottom: 12px;

          span {
            color: #262f40;
            display: block;
            height: auto;
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 6px 0;
          }

          input,
          textarea {
            width: 100%;
            border: 1px solid #000000;
            border-radius: 6px;
            -webkit-appearance: none;
            display: block;

            font-size: 16px;
            padding: 6px;
            font-family: Nunito;
            box-sizing: border-box;
          }
        }

        .send-email-button {
          background: #262f40;
          width: 100%;
          margin: 0px;
          text-align: center;
          font-size: 18px;
          padding: 12px 6px;
          box-sizing: border-box;
          margin-top: 12px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
        }
      }
    }

    span {
      display: block;
      color: #ffffff;
      width: 280px;
      height: 46px;
      opacity: 1;
      margin: 0px 6px;
    }
  }
`;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      feedbackClass: 'feedback-component-open',
      feedbackModalClass: 'feedback-modal-closed',
      emailInputClass: 'email-input-closed',
    };
  }

  componentDidMount() {}

  updateState = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  sendFeedbackEmail = () => {
    this.setState(
      {
        pageURL: window.location.href,
      },
      () => {
        axios
          .post(`${process.env.api_key}/api/email/send-feedback`, {
            ...this.state,
          })
          .then(response => {
            console.log(response);
          });
      }
    );
  };

  openEmailUI = () => {
    this.setState(prevState => ({
      emailInputClass:
        prevState.emailInputClass === 'email-input-closed'
          ? 'email-input-open'
          : 'email-input-closed',
    }));
  };

  openFeedbackModal = e => {
    e.preventDefault();
    if (e.target.id === 'email-button') {
      this.openEmailUI();
    } else if (e.target.id !== 'email-input') {
      this.setState(prevState => ({
        feedbackModalClass:
          prevState.feedbackModalClass === 'feedback-modal-closed'
            ? 'feedback-modal-open'
            : 'feedback-modal-closed',
      }));
    }
  };

  minimizeFeedback = className => {
    this.setState(prevState => ({
      feedbackClass:
        prevState.feedbackClass === 'feedback-component-closed'
          ? 'feedback-component-open'
          : 'feedback-component-closed',
      feedbackModalClass:
        prevState.feedbackModalClass === 'feedback-modal-closed'
          ? 'feedback-modal-open'
          : 'feedback-modal-closed',
    }));
  };

  openCloseFeedback = className => {
    this.setState({
      feedbackClass: className,
    });
  };

  render() {
    const {
      feedbackClass,
      feedbackModalClass,
      emailInputClass,
      email,
      emailMessage,
      pageURL,
    } = this.state;

    // Determines which SVG icon to show
    const feedBackIcon =
      feedbackClass === 'feedback-component-open' ? (
        // Show when page loads
        <img
          src="/static/icons/close.svg"
          alt="Share Feedback Icon"
          onClick={e => this.minimizeFeedback('feedback-component-closed')}
        />
      ) : (
        // Show after user has hidden notification
        <img src="/static/icons/info.svg" alt="Share Feedback Icon" />
      );

    // Shows or hides modal on click
    const feedBackModal =
      feedbackModalClass === 'feedback-modal-open' ? (
        // Show when user clicks with intent to submit feedback
        <div className={`${feedbackClass}`} onClick={e => this.openFeedbackModal(e)}>
          <div className={`${feedbackModalClass} ${emailInputClass}`}>
            {/* Intro text */}
            <span className="feedback-modal-header">
              Something wrong? Let us know how you expected this page to work.
            </span>
            {/* Twitter button */}
            <TwitterShareButton url={pageURL} title="@mealdig" hashtags={['feedback']}>
              <div className="twitter-feedback">
                <p> Submit Via Twitter </p>
                <TwitterIcon size={32} round />
              </div>
            </TwitterShareButton>
            {/* Email button */}
            <div id="email-button" className="react-share__ShareButton">
              <div id="email-button" className="email-feedback">
                <p id="email-button"> Send Directly </p>
                <EmailIcon id="email-button" size={32} round />
              </div>
            </div>
            {/* Email input */}
            <div id="email-input" className="email-input-container">
              <div id="email-input" className="form-input-label">
                <span id="email-input">Email Address (optional)</span>
                <input
                  id="email-input"
                  name="email"
                  onChange={this.updateState}
                  value={email || ''}
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
              <div id="email-input" className="form-input-label">
                <span id="email-input">Message</span>
                <textarea
                  id="email-input"
                  name="emailMessage"
                  onChange={this.updateState}
                  value={emailMessage || ''}
                  rows="4"
                  placeholder="Share your thoughts..."
                />
              </div>
              <span className="send-email-button" onClick={this.sendFeedbackEmail}>
                Submit Feedback
              </span>
            </div>
          </div>
          <img src="/static/icons/close.svg" alt="Share Feedback Icon" />
        </div>
      ) : (
        // Show when page loads or when user hovers over icon to see notificaton.
        <div
          className={`${feedbackClass}`}
          onMouseEnter={e => this.openCloseFeedback('feedback-component-open')}
          onMouseLeave={e => this.openCloseFeedback('feedback-component-closed')}
          onClick={this.openFeedbackModal}
        >
          <span>We're a new website. Click here to share your feedback at anytime.</span>
          {feedBackIcon}
        </div>
      );

    return <FeedbackIconContainer>{feedBackModal}</FeedbackIconContainer>;
  }
}
