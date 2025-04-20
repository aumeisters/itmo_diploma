import styled from "styled-components";
import { isNullOrUndefined } from "../../utils/isNullOrUndefined";

export const Wrapper = styled.div<{
  $mrgt?: number;
  $maxw?: number;
  $shdw?: boolean;
  $flex?: boolean;
  $fspb?: boolean;
  $bdrr?: boolean;
}>`
  margin: 0 auto;
  ${(props) => !isNullOrUndefined(props.$mrgt) && `margin-top: ${props.$mrgt}rem;`}
  ${(props) => !isNullOrUndefined(props.$maxw) && `max-width: ${props.$maxw}rem;`}
  padding: 1rem;
  ${(props) => props.$bdrr && 'border-radius: 1rem;'}
  ${(props) => props.$shdw && `border: 1px solid var(--text-primary);`}
  ${(props) => props.$flex && `display: flex;`}
  ${(props) => props.$fspb && `justify-content: space-between;`}
`;