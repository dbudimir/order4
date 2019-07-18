import React, { useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../UserContext';
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

   .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
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
               console.log(response.data._id);
               Router.push({
                  pathname: '/orders/{response.data._id}',
                  query: { orderId: response.data._id },
               });
            });
      }
   };

   let userLoggedIn;
   if (localStorage.length === 0) {
      userLoggedIn = (
         <div>
            <p>Create an account so you can save this order to your list.</p>
            <br />
            <button onClick={() => updateModal('signup')} type="button">
               Create Account
            </button>
            <br />
            <button onClick={() => updateModal('login')} type="button">
               Login to Existing Account
            </button>
            <br />
            <button onClick={submitOrder} type="button">
               Submit Anonymously
            </button>
            <br />
            <span onClick={props.toggleSubmitConfirmation}>Go back</span>
         </div>
      );
   } else if (localStorage.length > 0) {
      userLoggedIn = (
         <div>
            <p>Rreview your order before submitting.</p>
            <br />
            <button onClick={submitOrder} type="button">
               Submit Order
            </button>
            <br />
            <span onClick={props.toggleSubmitConfirmation}>Go back</span>
         </div>
      );
   }

   let nextAction;
   switch (userStatus.nextAction) {
      case '':
         nextAction = <div></div>;
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

   return (
      <ModalOuter>
         <div className="modal-content">
            <h3>That sounds delicious!</h3>
            {nextAction}
            {userLoggedIn}
         </div>
      </ModalOuter>
   );
}
