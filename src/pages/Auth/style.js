import styled from "@emotion/styled";
export const Wrapper = styled("div")`
  display: flex;
  max-width: 450px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 352px;
  -webkit-box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  padding: 24px 32px 32px;
  border-radius: 8px;
  margin: 25px auto;
  background: #fff;
`;

export const LogoWrapper = styled("div")`
  width: 50%;
  height: 20%;
`;

export const ContentWrapper = styled("div")`
  margin-top: 30px;
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
`;

export const InputDiv = styled("div")`
  margin: 15px auto;
`;

export const Paragraph = styled("p")`
  font-size: 14px;
  text-align: center;
  color: var(--black-color-secondary);
  &:hover {
    color: var(--black-color);
  }
`;
