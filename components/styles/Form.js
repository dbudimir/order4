import styled from 'styled-components';

const Form = styled.div`
  display: block;
  width: 280px;
  max-width: 92%;
  margin: 60px auto 0;
  font-family: Nunito, sans-serif;

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
    height: 36px;
    font-size: 16px;
    padding: 0px 0px 0px 10px;
    background-color: #f8f8f8;
    border-radius: 4px;
    box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 4px 0;
    box-sizing: border-box;
    border: 1px solid #00000030;
    font-family: Nunito, sans-serif;
    margin-bottom: 6px;
  }

  input[name='submit'] {
    border-radius: 6px;
    border-bottom: 0px;
    font-size: 18px;
    font-weight: 600;
    background-color: #0067ff;
    width: fit-content;
    padding: 6px 18px;
    height: auto;
    color: #ffffff;
    margin-top: 12px;
  }

  .sign-up-now {
    display: block;
    margin-top: 64px;

    a {
      font-weight: 800;
      text-decoration: none;
      color: #0067ff;
    }
  }
`;

export default Form;
