/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Utilities
import React, { Component } from 'react';
import axios from 'axios';
import { TwitterShareButton, TwitterIcon, EmailIcon } from 'react-share';
import styled from 'styled-components';

// Styles
const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)',
};

const FeedbackIconContainer = styled.div`
  display: block;
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 16px;
  font-family: Nunito;
  color: #ffffff;
  cursor: pointer;

  * {
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }

  .feedback-container {
    background: #262f40;
    width: max-content;
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    border: 2px solid transparent;
    box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

    span {
      margin-right: 12px;
    }

    &:hover {
      border: 2px solid #8ca0f8;
    }

    .feedback-inputs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 400px;

      .feedback-modal-header {
        font-size: 22px;
        margin: 0 6px 18px 2px;
      }

      .react-share__ShareButton {
        width: 100%;
        display: flex;
      }

      .twitter-feedback,
      .email-feedback {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ffffff;
        border-radius: 8px;
        padding: 0 12px;
        font-size: 20px;
        font-weight: 700;
        transition-duration: 0.1s;
        margin-bottom: 12px;
        width: 100%;

        &.active {
          background-color: #ffffff;
          color: #262f40;
        }

        p {
          transition-duration: 0.1s;
          margin: 12px 0;
        }
        &:hover {
          background-color: #ffffff;
          color: #262f40;
        }
      }

      .email-input-container {
        display: block;
        padding: 0 12px 24px;
        margin-top: -18px;
        width: 100%;
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
          display: block;
          background: #262f40;
          width: 100%;
          margin: 0px;
          text-align: center;
          font-size: 18px;
          padding: 12px 6px;
          box-sizing: border-box;
          margin-top: 18px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
        }
      }
    }

    #close-feedback-button {
      align-self: baseline;
    }

    @media ${size.tablet} {
      position: absolute;
      bottom: 0px;
      width: calc(100vw - 50px);
      justify-content: space-between;

      .feedback-inputs {
        width: 100%;
      }
    }
  }

  .feedback-component-closed {
    background: #262f40;
    padding: 4px;
    border-radius: 100px;
    box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

    img {
      display: block;
    }
  }
`;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      feedbackDisplay: 'feedbackMessage',
      emailInputDisplay: false,
      emailFeedbackClass: 'email-feedback',
    };
  }

  componentDidMount = () => {
    this.setState({
      pageURL: window.location.href,
    });
  };

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
      emailInputDisplay: !prevState.emailInputDisplay,
      emailFeedbackClass:
        prevState.emailInputClass === 'email-feedback active'
          ? 'email-feedback'
          : 'email-feedback active',
    }));
  };

  openFeedbackModal = e => {
    if (e.target.id === 'close-feedback-button') {
      this.setState({
        feedbackDisplay: 'infoIcon',
      });
    } else if (e.target.id === 'open-feedback-ui') {
      this.setState({
        feedbackDisplay: 'feedbackMessage',
      });
    } else {
      this.setState(prevState => ({
        feedbackModalClass:
          prevState.feedbackModalClass === 'feedback-modal-open'
            ? 'feedback-modal-closed'
            : 'feedback-modal-open',
        feedbackDisplay: 'feedbackUI',
      }));
    }
  };

  render() {
    const {
      feedbackDisplay,
      emailInputDisplay,
      emailFeedbackClass,
      email,
      emailMessage,
      pageURL,
    } = this.state;

    console.log(this.state);

    let emailInputContainer = '';
    if (emailInputDisplay === true) {
      emailInputContainer = (
        <div className="email-input-container">
          <div className="form-input-label">
            <span>Email Address (optional)</span>
            <input
              name="email"
              onChange={this.updateState}
              value={email || ''}
              type="text"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-input-label">
            <span>Message</span>
            <textarea
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
      );
    } else {
      emailInputContainer = '';
    }

    let feedbackIcon = '';
    switch (feedbackDisplay) {
      case 'infoIcon':
        feedbackIcon = (
          <>
            <div className="feedback-component-closed" onClick={e => this.openFeedbackModal(e)}>
              <img id="open-feedback-ui" src="/static/icons/info.svg" alt="Share Feedback Icon" />
            </div>
          </>
        );
        break;
      case 'feedbackMessage':
        feedbackIcon = (
          <>
            <div className="feedback-container" onClick={this.openFeedbackModal}>
              <span>We're a new website. Click here to share your feedback at anytime.</span>
              <img
                id="close-feedback-button"
                src="/static/icons/close.svg"
                alt="Share Feedback Icon"
              />
            </div>
          </>
        );
        break;
      case 'feedbackUI':
        feedbackIcon = (
          <div className="feedback-container" onClick={e => this.openFeedbackModal(e)}>
            <div className="feedback-inputs">
              {/* Intro text */}
              <span className="feedback-modal-header">
                Something wrong? Tell us how you expected this page to work.
              </span>
              {/* Twitter button */}
              <TwitterShareButton url={`${pageURL}`} title="@mealdig" hashtags={['feedback']}>
                <div className="twitter-feedback">
                  <p> Submit Via Twitter </p>
                  <TwitterIcon size={32} round />
                </div>
              </TwitterShareButton>
              {/* Email button */}
              <div className={emailFeedbackClass} onClick={e => this.openEmailUI(e)}>
                <p> Send Directly </p>
                <EmailIcon i size={32} round />
              </div>
              {emailInputContainer}
            </div>
            <img
              id="close-feedback-button"
              src="/static/icons/close.svg"
              alt="Share Feedback Icon"
            />
          </div>
        );
        break;
      default:
        break;
    }

    return <FeedbackIconContainer>{feedbackIcon}</FeedbackIconContainer>;
  }
}
