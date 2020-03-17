import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)'
};

const OrderContentContainer = styled.div`
  background-color: #ffffff;
  margin-bottom: 32px;
  flex-basis: 46%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
  font-family: Nunito, sans-serif;
  display: flex;
  position: relative;

  @media ${size.tablet} {
    flex-basis: 100%;
  }

  .order-data {
    padding: 12px 12px;
    display: flex;
    flex-direction: column;
    width: 100%;

    .chain-logo {
      max-height: 26px;
      max-width: 120px;
      display: block;
      align-self: start;
    }

    .order-info {
      .description {
        margin-top: 12px;
        margin-bottom: 6px;
        font-weight: 400;
        border-bottom: 2px solid #eeeef1;
        padding-bottom: 12px;
        font-size: 18px;
      }
    }

    .order-content {
      p {
        line-height: 2;
        margin: 6px 0px;
        font-weight: 700;
        font-size: 16px;
      }
    }

    .order-meta {
      margin-top: auto;
      align-self: end;
      width: 100%;

      .tag-row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;

        .tags {
          border-top: 2px solid #eeeef1;
          padding: 12px 0px 0px 0px;
          margin: 0px;
          text-transform: capitalize;
          width: 100%;
          span {
            font-weight: 700;
          }
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

      .created-by {
        width: 100%;

        p {
          font-size: 14px;
          margin-bottom: 0px;

          span {
            padding: 0px;
            margin: 0px;
            background: transparent;
          }
        }
      }
    }

    span {
      background-color: #eeeef1;
      padding: 1px 4px;
      border-radius: 4px;
      margin: 0 0 4px 4px;
      font-weight: 400;
    }
  }

  .user-actions {
    background-color: #f5f6f7;
    padding: 6px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .favorites {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .like-count {
        font-size: 14px;
        font-weight: 700;
      }
    }

    svg {
      margin-bottom: 4px;
      fill: none;
      cursor: pointer;
    }

    img {
      cursor: pointer;
    }

    .svg-clicked {
      svg {
        stroke: #1774ff;
        fill: #1774ff;
      }
    }

    div {
      margin: 3px 0px;
    }
  }
`;

export default OrderContentContainer;
