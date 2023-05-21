import styled from "styled-components";

type Props = {
  thin?: boolean;
  error?: boolean;
};

const SubHeader = styled.h2<Props>`
  font-size: ${({ theme }) => theme.size.XL};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 1px;

  ${({ error, theme }) => (error ? `color: ${theme.colors.error};` : null)}

  ${({ thin }) =>
    thin
      ? `
        font-weight: 300;
    `
      : null}
`;

export default SubHeader;
