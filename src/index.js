import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YoutubeSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const YOUTUBE_API_KEY = 'AIzaSyCnXwOFAHlb5ovfvrvvBiXVFlbWwW6dhFI';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos       : [],
      selectedVideo: null
    };
  }

  videoSearch(term) {
      YoutubeSearch({ key : YOUTUBE_API_KEY, term }, (videos) => {
        this.setState({
          videos,
          selectedVideo: videos[0]
        });
      });
    }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
    return (
      <div>
      <SearchBar onSearchTermChange={ videoSearch }/>
      <VideoDetail video={ this.state.selectedVideo }/>
      <VideoList
        onVideoSelect={ selectedVideo => this.setState({ selectedVideo })}
        videos={ this.state.videos }/>
    </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));