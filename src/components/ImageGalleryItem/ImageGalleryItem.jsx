import { useState } from 'react';
import css from '../Styles/styles.module.css';
import { MyModal } from '../Modal/Modal';

export const ImageGalleryItem = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

  const onOpenModal = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };
  const onCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTags('');
  };
  return (
    <>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <>
          <li
            className={css.ImageGalleryItem}
            key={id}
            onClick={() => onOpenModal(largeImageURL, tags)}
          >
            <img
              className={css.ImageGalleryItemImage}
              src={webformatURL}
              alt={tags}
            />
          </li>
        </>
      ))}
      <MyModal
        modalIsOpen={showModal}
        closeModal={onCloseModal}
        largeImg={largeImageURL}
        tags={tags}
      />
    </>
  );
};
