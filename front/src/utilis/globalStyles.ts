import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  ${css`
		*,
		*::after,
		*::before {
			box-sizing: border-box;
		}
		body,
		html {
			margin: 0;
			padding: 0;
		}
	`}
`;