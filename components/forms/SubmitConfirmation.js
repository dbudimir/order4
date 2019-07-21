import React, { useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../UserContext';
import OrderContent from '../order-content/OrderContent';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const ModalOuter = styled.div`
   position: fixed;
   z-index: 1;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgb(0, 0, 0);
   background-color: rgba(0, 0, 0, 0.4);
   font-family: Roboto, sans-serif;

   .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;

      .user-options {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         flex-basis: 46%;
         padding: 18px 12px;

         h3 {
            margin: 0px;
         }

         p {
            font-size: 20px;
            line-height: 1.4;
            font-weight: 300;
         }

         button {
            font-family: Roboto, sans-serif;
            font-size: 18px;
            padding: 8px 24px;
            border-radius: 4px;
            color: #ffffff;
            background: #42b5b4;
            border: none;
            margin: 0px 12px 12px 0px;
         }

         button:last-of-type {
            border: 2px solid #42b5b4;
            color: #808991;
            background: transparent;
         }

         .back-button {
            font-weight: 600;
            color: #0067ff;
            font-size: 18px;
         }
      }

      .order-content-container {
         margin-bottom: 0px;
         max-height: fit-content;

         h3 {
            font-size: 18px;
         }

         .actions {
            display: none;
         }
      }
   }
`;

export default function SubmitConfirmation(props) {
   const userStatus = useContext(UserContext);

   const updateModal = action => {
      userStatus.switchNextAction(action);
   };

   const submitOrder = event => {
      event.preventDefault();
      if (localStorage.length > 0) {
         const reqBody = { order: props.orderState.order, userId: localStorage.userId };
         axios
            .post('https://qsr-order-api.herokuapp.com/api/user-order/create/existing-user', {
               ...reqBody,
            })
            // .post('http://localhost:8040/api/user-order/create/existing-user', {
            //    ...reqBody,
            // })
            .then(response => {
               console.log(response.data);
               Router.push(`/user/${localStorage.userId}`);
            });
      } else if (localStorage.length === 0) {
         const reqBody = { order: props.orderState.order };
         axios
            .post('https://qsr-order-api.herokuapp.com/api/user-order/create/order', {
               ...reqBody,
            })
            // .post('http://localhost:8040/api/user-order/create/order', {
            //    ...reqBody,
            // })
            .then(response => {
               Router.push(
                  {
                     pathname: `/orders/${response.data._id}`,
                     query: { id: response.data._id },
                  },
                  `/orders/${response.data._id}`
               );
            });
      }
   };

   let userLoggedIn;
   if (localStorage.length === 0) {
      userLoggedIn = (
         <div>
            <p>
               Create an account so you can save this order to your profile. Or submit anonymously
               to get a shareable link.
            </p>
            <button onClick={() => updateModal('signup')} type="button">
               Create Account
            </button>
            <button onClick={() => updateModal('login')} type="button">
               Log In
            </button>
            <button onClick={submitOrder} type="button">
               Submit Anonymously
            </button>
         </div>
      );
   } else if (localStorage.length > 0) {
      userLoggedIn = (
         <div>
            <p>Review your order before submitting.</p>
            <br />
            <button onClick={submitOrder} type="button">
               Submit Order
            </button>
            <br />
         </div>
      );
   }

   let nextAction;
   switch (userStatus.nextAction) {
      case '':
         nextAction = '';
         break;
      case 'signup':
         nextAction = (
            <div>
               <SignupForm signIn={userStatus.signIn} updateUser={props.updateUser} />
            </div>
         );
         break;
      case 'login':
         nextAction = (
            <div>
               <LoginForm signIn={userStatus.signIn} updateUser={props.updateUser} />
            </div>
         );
         break;
      default:
         break;
   }

   console.log(props);

   return (
      <ModalOuter>
         <div className="modal-content">
            <div className="user-options">
               <h3>Nice!</h3>
					{userLoggedIn}
					{nextAction}
               <span className="back-button" onClick={props.toggleSubmitConfirmation}>
                  {'<< Go Back'}
               </span>
            </div>
            <OrderContent orderState={props.orderState} />
         </div>
      </ModalOuter>
   );
}
