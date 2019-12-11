import styled from 'styled-components';

const TagPages = styled.div`
  max-width: 100%;

  .background-image-container {
    background-image: url('/static/chain-backgrounds/chipotle-chain-background.jpg');
    background-position: (50% 50%);
    height: 400px;
  }

  .content-container {
    max-width: 1024px;
    display: flex;
    margin: -300px auto;
    justify-content: space-between;

    .col-left {
      width: 62.5%;

      .headline-container {
        border-radius: 12px;
        box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
        background: #ffffff;
        padding: 18px;
        margin-bottom: 32px;

        h1 {
          font-family: Nunito, sans-serif;
          margin: 0px;
          text-transform: capitalize;
        }
      }
    }

    .col-right {
      width: 33.5%;

      .more-tag-cta {
      }

      .more-tag-cta,
      .more-chain-cta,
      .signup-cta {
        font-family: Nunito, sans-serif;
        text-align: center;
        margin-bottom: 24px;
        padding: 12px;
      }

      .more-tag-cta {
        background-color: #ffffff;
        border-radius: 4px;
        overflow: hidden;
        border-bottom: 12px solid #000000;
        font-size: 18px;
      }

      .more-chain-cta {
        background-color: #ffffff;
        border-radius: 4px;
        overflow: hidden;
        border-bottom: 12px solid #000000;
        font-size: 18px;
      }

      .signup-cta {
        border-radius: 10px;
        background: #0067ff;
        position: sticky;
        top: 100px;
        color: #ffffff;

        font-size: 24px;
      }
    }
  }
`;

export default TagPages;
