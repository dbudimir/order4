import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)'
};

const OrderContentContainer = styled.div`
  background-color: #ffffff;
  padding: 18px 12px;
  margin-bottom: 28px;
  flex-basis: 46%;
  border-radius: 12px;
  box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
  font-family: Nunito, sans-serif;
  display: flex;
  flex-direction: column;

  @media ${size.tablet} {
    flex-basis: 100%;
  }

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
      margin: 0px;
    }
  }

  h2 {
    text-transform: capitalize;
  }

  .description {
    margin-top: 12px;
    margin-bottom: 6px;
    font-weight: 400;
    border-bottom: 2px solid #eeeef1;
    padding-bottom: 12px;
    font-size: 18px;
  }

  .order-content {
    flex-grow: 100;

    p {
      line-height: 2;
      margin: 6px 0px;
      font-weight: 700;
    }
  }

  span {
    background-color: #eeeef1;
    padding: 1px 4px;
    border-radius: 4px;
    margin: 0 0 4px 4px;
    font-weight: 400;
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
      flex-direction: row;
      align-items: inherit;
    }

    .actions > * {
      margin-left: 8px;
      cursor: pointer;
      max-height: 24px;
    }
  }
`;

export default OrderContentContainer;
