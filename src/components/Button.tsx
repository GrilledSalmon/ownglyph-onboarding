import './Button.scss';

const Button = ({ text }: { text: string }) => {
  return (
    <>
      <button className="Button">{text}</button>
    </>
  );
};

export default Button;