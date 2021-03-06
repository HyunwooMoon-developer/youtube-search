import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import _ from "lodash";

import SearchBar from "./Components/SearchBar/SearchBar";
import VideoList from "./Components/VideoList/VideoList";
import VideoDetail from "./Components/VideoDetail/VideoDetail";

const API_KEY = "youtube-api-key";

// Create a new Component. This component should produce
// some HTML

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };

    this.videoSearch("dodge coin");
  }

  videoSearch = (term) => {
    YTSearch({ key: API_KEY, term: term }, (data) => {
      this.setState({ videos: data, selectedVideo: data[0] });
    });
  };

  render() {
    const videoSearch = _.debounce((term) => {
      this.videoSearch(term);
    }, 300);

    return (
      <div className="App">
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Take this component's HTML generated HTML and put it
// on the page [in the DOM]

ReactDOM.render(<App />, document.getElementById("container"));
