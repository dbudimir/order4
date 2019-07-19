import styled from 'styled-components';

const Form = styled.div`
   max-width: 600px;
   display: block;
   margin: 60px auto 60px;

   h2 {
      font-size: 48px;
      font-family: Roboto, serif;
      margin: 0 12px 32px;
   }

   select {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
   }

   input[type='checkbox'] + label {
      font-weight: 400;
   }

   input[type='checkbox']:checked + label {
      font-weight: 700;
   }

   .field-label {
      font-family: Roboto, serif;
      font-weight: 500;
      font-size: 22px;
      margin: 24px 0 12px;
   }

   .select-chain {
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
         justify-content: space-between;
         align-items: center;
      }
   }

   .customize {
      padding: 0px 12px;

      h3 {
         font-family: Roboto, serif;
         min-width: fit-content;
         margin: 24px 0px 12px 0;
         font-size: 24px;
      }

      select {
         width: 100%;
         height: 48px;
         font-size: 28px;
         border: 0px;
         padding: 8px 12px;
      }

      .fillings,
      .toppings {
         display: flex;
         flex-wrap: wrap;

         span {
            display: block;
            padding: 2px 4px;
            background-color: #e9e9f5;
            margin-right: 6px;
            font-size: 20px;
            border-radius: 4px;
            margin-bottom: 6px;
            display: flex;
            align-items: center;

            label {
               font-family: Roboto;
               margin: 0px 4px;
            }
         }
      }
   }
`;

export default Form;
