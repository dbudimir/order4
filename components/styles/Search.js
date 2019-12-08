import styled from 'styled-components';

const SearchRow = styled.div`
  background: #1774ff;
  display: flex;

  .search-container {
    display: flex;
    flex-direction: column;
    padding: 200px 0;
    width: 768px;
    max-width: 96%;
    margin: 0 auto;

    .header-text {
      width: 100%;
      text-align: center;
      color: #ffffff;

      h1 {
        font-family: Nunito;
        font-size: 48px;
        font-weight: 900;
        margin: 0px;
      }

      h2 {
        margin: 16px auto 48px;
        font-family: Roboto, sans-serif;
        font-weight: 100;
        font-size: 18px;
        max-width: 580px;
        line-height: 1.5;
        letter-spacing: 0.5px;
      }
    }

    .search-box-container {
      display: flex;
      justify-content: space-between;

      .search-action {
        height: 50px;
        background: #ffffff;
        flex-grow: 1;
        border: none;
        padding: 0;
        -webkit-appearance: none;
        border-radius: 3px;
      }

      .select-container {
        position: relative;

        .chain-select {
          width: 260px;
          font-size: 22px;
          padding: 0 18px;
          font-family: Nunito, sans-serif;
        }

        img {
          position: absolute;
          right: 0;
          height: 42%;
          margin: 0 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .autocomplete-input {
        width: 100%;
        margin: 0px 18px;
        display: flex;
        flex-direction: column;
        position: relative;
        font-family: Nunito, sans-serif;

        .tag-input {
          padding: 0 18px;
          font-size: 22px;
        }

        .suggestions {
          list-style: none;
          margin-top: 0;
          overflow-y: auto;
          position: absolute;
          top: 60px;
          padding: 6px;
          background: #ffffff;
          border-radius: 3px;
          overflow: hidden;
          border: none;
          max-height: 300px;
          box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
          z-index: 1;

          li {
            padding: 6px 12px;
            font-size: 22px;
          }

          .suggestion-active,
          .suggestions li:hover {
            background-color: #5196e836;
            color: #000000;
            cursor: pointer;
            font-weight: 700;
            border-radius: 3px;
          }
        }
      }

      .search-submit {
        min-width: 50px;
        display: flex;
        justify-content: center;
      }
    }
  }
`;

export default SearchRow;
