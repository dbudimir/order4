import styled from 'styled-components';

const OrderContentContainer = styled.div`
   background-color: #ffffff;
   padding: 18px 12px;
   margin-bottom: 28px;
   flex-basis: 46%;
   border-radius: 12px;
   box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
   font-family: Roboto, sans-serif;
   display: flex;
   flex-direction: column;

   .chain {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .chain-logo {
         max-height: 26px;
         max-width: 120px;

         float: right;
      }

      h3 {
         text-transform: capitalize;
         margin: 0px;
      }
   }

   h2 {
      text-transform: capitalize;
   }

   .description {
      margin-top: 12px;
      font-weight: 400;
      border-bottom: 2px solid #eeeef1;
      padding-bottom: 12px;
      font-size: 18px;
   }

   .order-content {
      flex-grow: 100;
   }

   span {
      display: inline-block;
      background-color: #eeeef1;
      padding: 1px 4px;
      border-radius: 4px;
      margin: 0 0 4px 4px;
   }

   .tag-row {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;

      .tags {
         border-top: 2px solid #eeeef1;
         padding: 12px 0px 0px 0px;
         margin: 0px;
         text-transform: capitalize;
      }

      .actions {
         display: flex;
      }

      .actions > * {
         margin-left: 8px;
      }
   }
`;

export default OrderContentContainer;
