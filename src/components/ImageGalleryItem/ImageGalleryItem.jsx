import { Component } from 'react';
import css from '../Styles/styles.module.css';
import { MyModal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    tags: '',
    largeImageURL: '',
  };
  onOpenModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };
  onCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '', tags: '' });
  };
  render() {
    return (
      <>
        {this.props.images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <>
            <li
              className={css.ImageGalleryItem}
              key={id}
              onClick={() => this.onOpenModal(largeImageURL, tags)}
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
          modalIsOpen={this.state.showModal}
          closeModal={this.onCloseModal}
          largeImg={this.state.largeImageURL}
          tags={this.state.tags}
        />
      </>
    );
  }
}
