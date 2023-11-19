import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <ImageGalleryList>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          image={item.webformatURL}
          name={item.tags}
          largeImg={item.largeImageURL}
        />
      ))}
    </ImageGalleryList>
  );
};
