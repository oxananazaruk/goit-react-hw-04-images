import { useState, useEffect } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchPhotos } from '../Services/api';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader'
import {Error} from './Error/Error'

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
 
 useEffect(() => {
   const userQuery = query.slice((query.indexOf("/") + 1), query.length);
   if ( userQuery.trim() === '') {
         return;
     };
   const onFetchPhotos = async () => { 
     const responce = await fetchPhotos(userQuery, page);
     const { hits, totalHits } = responce;
     if (hits.length === 0) {
         return toast.error("Sorry, there are no images matching your search query. Please try again.");
     };
     setImages(prevImages => ([...prevImages, ...hits]));
     setTotalPages(Math.ceil(totalHits / 12));

     if (page === 1) {
         toast(`Hooray! We found ${totalHits} images.`);
       } 
   }

   try {
      setIsLoading(true);
      setError(false);
      onFetchPhotos();
     } catch (error) {
       setError(true);
     } finally {
       setIsLoading(false);
     }
  }, [query, page, error ]);

  const handleSubmit = newQuery => {
    const userRequest = newQuery.query;
    setQuery(`${Date.now()}/${userRequest}`);
    setPage(1);
    setImages([]);
    setTotalPages(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    return (
      <div>
        <SearchBar onSubmit={handleSubmit} />
        {error && <Error/>}
        <ImageGallery items={images} />
        {images.length > 0 && (page === totalPages ?  <p>We're sorry, but you've reached the end of search results.</p> : <Button onLoad={handleLoadMore} />)}
        {isLoading && <Loader />}
        <GlobalStyle />
        <Toaster/>
      </div>
    );
};
