import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Owner = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueFilter = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: center;
  margin-top: 20px;

  li {
    margin-right: 5px;
  }

  button {
    background: #7159c1;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    height: 20px;
    min-width: 80px;
    padding: 4px 5px;
    margin-left: 10px;
    cursor: pointer;
    border: none;
    box-shadow: 1px 1px 0 1px #504085;
    transition: box-shadow 0, 3s ease, transform 0.3s ease;
  }

  button:active {
    box-shadow: 0px 0px 0 0px #504085, inset 1px 1px 0 1px #504085;
    transform: translate(1px, 1px);
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #fff;
          color: #7159c1;
          border: 1px solid #7159c1;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssuePagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

  button {
    background: #7159c1;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    height: 20px;
    min-width: 80px;
    padding: 4px 5px;
    margin-left: 10px;
    cursor: pointer;
    border: none;
    box-shadow: 1px 1px 0 1px #504085;
    transition: box-shadow 0, 3s ease, transform 0.3s ease;
  }

  button:active {
    box-shadow: 0px 0px 0 0px #504085, inset 1px 1px 0 1px #504085;
    transform: translate(1px, 1px);
  }

  .previous-button {
    cursor: ${props => (props.page === 1 ? 'not-allowed' : 'pointer')};
    opacity: ${props => (props.page === 1 ? '0.6' : '1')};
  }

  button + button {
    margin-left: 10px;
  }
`;
