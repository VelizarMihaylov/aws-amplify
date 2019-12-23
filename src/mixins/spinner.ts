type SpinnerProps = {
  border: string
  topBorder: string
  width: number
  height: number
}

export const spinner = ({
  border,
  topBorder,
  width,
  height
}: SpinnerProps): string => `
  border: ${border};
  border-top: ${topBorder};
  border-radius: 50%;
  width: ${width}rem;
  height: ${height}rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
`
