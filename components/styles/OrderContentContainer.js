import styled from 'styled-components';

const size = {
  tablet: 'only screen and (max-width : 768px)',
  phone: 'only screen and (max-width : 548px)'
};

const ModalContainer = styled.div`
  margin-right: 24px;

  .modal-container-true {
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .order-content-container {
      display: flex;
      flex-wrap: wrap;
      width: 1024px;
      height: max-content;

      .title-bar {
        display: flex;
        justify-content: flex-end;
        background-color: #f5f6f7;
        padding: 6px;
        width: 100%;

        div {
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 4px;

          &:hover {
            background-color: #dfe2e4;
            cursor: pointer;
          }

          p {
            font-size: 16px;
            margin: 0 6px 0 0;
            letter-spacing: 1px;
          }

          svg {
            width: 20px;
            height: 20px;
            stroke-width: 1.5;
          }
        }
      }
      .user-actions {
        flex-direction: row;
        width: 100%;

        div {
          margin-right: 6px;
        }

        svg {
          margin: 0 6px 0 0;
        }

        .favorites {
          flex-direction: row;
        }
      }
    }
  }

  .modal-container {
    width: 100%;

    .order-content-container {
      .title-bar {
        display: none;
      }
    }
  }
`;

const OrderContentContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  margin-bottom: 32px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
  font-family: Nunito, sans-serif;
  display: flex;
  text-decoration: none;
  min-width: 360px;

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
      .order-name {
        margin-bottom: 12px;
      }

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
      flex-grow: 1;

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
            &:hover {
              background-color: #0067ff;
              color: #ffffff;
            }
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
      margin: 0 4px 4px 0;
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

export { ModalContainer, OrderContentContainer };
