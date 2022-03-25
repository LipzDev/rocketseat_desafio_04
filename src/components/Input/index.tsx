import { Container } from "./styles";

type InputProps = {
  initialValue?: string;
  [x:string]: any;
}

const Input = ({ initialValue, ...rest }: InputProps) => {

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
