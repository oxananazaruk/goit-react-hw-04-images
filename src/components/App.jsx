import { Component } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchPhotos } from '../Services/api';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader'
import {Error} from './Error/Error'

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: false,
    totalPages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const userQuery = query.slice((query.indexOf("/") + 1), query.length);
     if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
     ) { 
      try {
      this.setState({ isLoading: true, error: false });
        const responce = await fetchPhotos(userQuery, page);
        const { hits, totalHits } = responce;
        if (hits.length === 0 || userQuery.trim() === '') {
        return  toast.error("Sorry, there are no images matching your search query. Please try again.");
    };
        
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...hits],
            isLoading: false,
            totalPages: Math.ceil(totalHits / 12),
          }
        });
        if (page === 1) {
          toast(`Hooray! We found ${totalHits} images.`);
        }
        
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
    }
  }

  handleSubmit = newQuery => {
    const userRequest = newQuery.query;
    this.setState({
      query: `${Date.now()}/${userRequest}`,
      page: 1,
      images: [],
      totalPages: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, isLoading, error, page, totalPages } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {error && <Error/>}
        <ImageGallery items={images} />
        {images.length > 0 && (page === totalPages ?  <p>We're sorry, but you've reached the end of search results.</p> : <Button onLoad={this.handleLoadMore} />)}
        {isLoading && <Loader />}
        <GlobalStyle />
        <Toaster/>
      </div>
    );
  }
};
