import {keyframes } from "styled-components"

const shake = keyframes`
    10%,
    90% {
        transform: rotate(180deg) translate3d(0, -1px, 0);
    }

    20%,
    80% {
        transform: rotate(180deg) translate3d(0, 2px, 0);
    }

    30%,
    50%,
    70% {
        transform: rotate(180deg) translate3d(0, -4px, 0);
    }

    40%,
    60% {
        transform: rotate(180deg) translate3d(0, 4px, 0);
    }
`

export default shake;