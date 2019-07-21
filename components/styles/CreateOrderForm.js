import styled from 'styled-components';

const Form = styled.div`
   max-width: 600px;
   display: block;
   margin: 60px auto 120px;

   h3 {
      font-family: Roboto, serif;
      min-width: fit-content;
      margin: 32px 0px 12px 0;
      font-size: 24px;
   }

   select {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
   }

   .field-label {
      font-family: Roboto, serif;
      font-weight: 500;
      font-size: 20px;
      margin: 24px 0 12px;
   }

   .select-chain {
      h3 {
         width: 100%;
      }

      select[name='chainName'] {
         width: 100%;
         height: 60px;
         font-size: 32px;
         border-radius: 8px;
         background-color: #e9e9f5;
         border: 0px;
         padding: 8px 12px;
         margin: 0px 12px;
      }

      form {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         align-items: center;
      }
   }

   .customize {
      padding: 0px 12px;

      select {
         width: 100%;
         height: 48px;
         font-size: 24px;
         border: 0px;
         padding: 8px 12px;
      }

      .fillings,
      .toppings,
      .sauces,
      .cheeses,
      .veggies,
      .proteins,
      .finishes {
         display: flex;
         flex-wrap: wrap;

         .checkbox-container {
            display: block;
            margin-right: 6px;
            font-size: 20px;
            border-radius: 4px;
            margin-bottom: 6px;
            display: flex;
            align-items: center;

            input {
               position: absolute;
               opacity: 0;
               cursor: pointer;
            }

            .checkbox-label {
               font-size: 20px;
               line-height: 24px;
               width: fit-content;
               cursor: pointer;
               font-family: Roboto;
               font-weight: 400;
               display: flex;
               align-items: center;
               border-radius: 6px;
               background-color: #f8f8f8;
            }

            .checkbox-label .checkbox-text {
               margin-right: 6px;
            }

            .checkbox-custom {
               height: 16px;
               width: 16px;
               background-color: transparent;
               border-radius: 5px;
               transition: all 0.3s ease-out;
               -webkit-transition: all 0.3s ease-out;
               -moz-transition: all 0.3s ease-out;
               -ms-transition: all 0.3s ease-out;
               -o-transition: all 0.3s ease-out;
               border: 2px solid #0067ff;
               margin: 6px;
            }

            input:checked + label {
               background-color: #0067ff;
               border-radius: 5px;
               color: #ffffff;
               font-weight: 500;
            }

            input:checked + label .checkbox-custom {
               background-color: #ffffff;
               border-radius: 5px;
               -webkit-transform: rotate(0deg) scale(1);
               -ms-transform: rotate(0deg) scale(1);
               transform: rotate(0deg) scale(1);
               opacity: 1;
               border: 2px solid #ffffff;
            }

            .checkbox-custom::after {
               position: absolute;
               content: '';
               left: 12px;
               top: 0px;
               height: 0px;
               width: 0px;
               border-radius: 5px;
               border: 2px solid #0067ff;
               border-width: 0 3px 3px 0;
               -webkit-transform: rotate(0deg) scale(0);
               -ms-transform: rotate(0deg) scale(0);
               transform: rotate(0deg) scale(0);
               opacity: 1;
               transition: all 0.3s ease-out;
               -webkit-transition: all 0.3s ease-out;
               -moz-transition: all 0.3s ease-out;
               -ms-transition: all 0.3s ease-out;
               -o-transition: all 0.3s ease-out;
            }

            input:checked + label .checkbox-custom::after {
               -webkit-transform: rotate(45deg) scale(1);
               -ms-transform: rotate(45deg) scale(1);
               transform: rotate(45deg) scale(1);
               opacity: 1;
               left: 4px;
               width: 6px;
               height: 12px;
               border: 2px solid #0067ff;
               border-width: 0 2px 2px 0;
               background-color: transparent;
               border-radius: 0;
            }
         }
      }
   }

   .submit-order {
      padding: 0px 12px;

      input[name='orderName'] {
         width: 100%;
         height: 48px;
         font-size: 24px;
         border: 0px;
         padding: 0px 0px 0px 12px;
         background-color: #f8f8f8;
         border-radius: 8px;
         box-shadow: inset rgba(0, 0, 0, 0.2) 0px 0px 4px 0;
         box-sizing: border-box;
      }

      textarea {
         width: 100%;
         font-size: 16px;
         border: 0px;
         padding: 12px 0px 0px 12px;
         background-color: #f8f8f8;
         border-radius: 8px;
         box-shadow: inset rgba(0, 0, 0, 0.2) 0px 0px 4px 0;
         box-sizing: border-box;
      }

      .small {
         font-size: 16px;
         width: fit-content;
         border-radius: 8px;
         height: 48px;
         padding: 0px 12px;
         margin-top: 6px;
         background-color: #42b5b4;
         border: none;
         color: white;
         font-family: Roboto;
         font-weight: 600;
      }

      .tag {
         width: 100%;
         display: flex;

         input {
            width: 100%;
            height: 48px;
            font-size: 24px;
            border: 0px;
            margin: 0px 6px 6px 0px;
            padding: 0px 0px 0px 12px;
            background-color: #f8f8f8;
            border-radius: 8px;
            box-shadow: inset rgba(0, 0, 0, 0.2) 0px 0px 4px 0;
         }

         button {
            font-size: 16px;
            width: 20%;
            max-width: 90px;
            margin: 0px;
            border-radius: 8px;
            padding: 0px;
            line-height: 0;
            background-color: red;
         }
      }

      button[name='submit'] {
         width: 80%;
         display: block;
         margin: 0 auto;
         height: 48px;
         margin-top: 32px;
         border-radius: 8px;
         font-size: 24px;
      }
   }
`;

export default Form;
