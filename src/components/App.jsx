import * as ImageService from './Services/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useEffect, useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      if (!query) {
        setIsLoading(true);
      }
      try {
        const { hits, totalHits } = await ImageService.getImages(query, page);
        if (hits.length === 0) {
          setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsVisible(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(alert(`Something went wrong: ${error}`));
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page, isLoading]);

  const onHanldeSubmit = searchQuery => {
    return (
      setQuery(searchQuery),
      setPage(1),
      setImages([]),
      setError(null),
      setIsEmpty(false)
    );
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };
  return (
    <>
      <Searchbar onSubmit={onHanldeSubmit} />
      {isEmpty && (
        <h3 style={{ textAlign: 'center' }}>
          Sorry. There are no images ... 😭
        </h3>
      )}
      {error && (
        <h3 style={{ textAlign: 'center' }}>
          ❌ Something went wrong - {error}
        </h3>
      )}
      <ImageGallery>
        <ImageGalleryItem images={images} />
      </ImageGallery>
      {isVisible && !isLoading && images.length > 0 && (
        <Button onClick={onLoadMore}>
          {isLoading ? 'Loading' : 'Load more'}
        </Button>
      )}
      {isLoading && <Loader />};
    </>
  );
};

export default App;
