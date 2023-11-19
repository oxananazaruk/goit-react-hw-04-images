import { useState } from 'react';
import { ImageModal } from '../Modal/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, name, largeImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GalleryItem onClick={openModal}>
        <GalleryItemImage src={image} alt={name} />
      </GalleryItem>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalImg={largeImg}
      />
    </>
  );
};
