import styled from "styled-components";
import Link from "next/link";

const MailToAll = styled(Link)`
  font-size: ${({ theme }) => theme.size.M};
  color: ${({ theme }) => theme.colors.link};
`;

export default MailToAll;
