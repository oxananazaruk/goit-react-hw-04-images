import { Component } from 'react';
import { ImageModal } from '../Modal/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { image, name, largeImg } = this.props;
    return (
      <>
        <GalleryItem onClick={this.openModal}>
          <GalleryItemImage src={image} alt={name} />
        </GalleryItem>
        <ImageModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          modalImg={largeImg}
        />
      </>
    );
  }
}
