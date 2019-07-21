import styled from 'styled-components';

const Form = styled.div`
   display: block;
   margin: 60px auto 0;
   width: fit-content;
   font-family: Roboto, sans-serif;

   h3 {
      margin-bottom: 32px;
      font-size: 28px;
   }

   .label {
      margin-top: 12px;
      font-weight: 800;
   }

   input {
      width: 100%;
      height: 48px;
      font-size: 24px;
      border: 0px;
      padding: 0px 0px 0px 10px;
      background-color: #f8f8f8;
      border-radius: 8px;
      box-shadow: inset rgba(0, 0, 0, 0.2) 0px 0px 4px 0;
      box-sizing: border-box;
   }

   /* input::placeholder {
      font-size: 32px;
      padding: 6px 6px 0;
      line-height: 1;
   } */

   input[name='submit'] {
      border-radius: 6px;
      margin-bottom: 64px;
      border-bottom: 0px;
      font-size: 24px;
      font-weight: 800;
      background-color: #fa8320;
      width: 200px;
   }

   span {
      display: block;
   }
`;

export default Form;
