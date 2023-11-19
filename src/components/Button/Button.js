import { LoadMoreBtn, ButtonContainer } from './Button.styled';

export const Button = ({ onLoad }) => {
  return (
    <ButtonContainer>
      <LoadMoreBtn onClick={onLoad}>Load more</LoadMoreBtn>
    </ButtonContainer>
  );
};
