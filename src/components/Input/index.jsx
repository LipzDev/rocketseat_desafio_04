import { Container } from "./styles";

const Input = ({ initialValue, ...rest }) => {

  return (
    <Container>
      <input
        type="text"
        defaultValue={initialValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
