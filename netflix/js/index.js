(() => {
  var youtubeIds = [
    'UC7tUsO3S7424TMcgSCUOCow', //Noders
    'UCO1cgjhGzsSYb1rsB4bFe4Q', //Fun fun function
    'UCzoVCacndDCfGDf41P-z0iA', //JSConf
  ]
  var $row = document.getElementById('mainView').getElementsByClassName('rows')[0];

  function Row(){
    this.$el = null;
    this.videos = [];
  }

  Row.prototype.init = function init(id) {
    this.id = id;
    this.youtube = new Youtube().setChannel(id);
    this.youtube
      .getChannelVideos()
      .then((data) => {
        this.setVideos(data.items);
      })
    this.update$El();
    return this;
  }


  Row.prototype.setVideos = function setVideos(videos) {
    this.videos = videos;
    // console.log(this.videos)
    this.update$El();
  }


  Row.prototype.update$El = function update$El() {
    if(!this.$el || !$row.getElementsByClassName(this.id)[0]) {
      var rowContainer = document.createElement('div');
      rowContainer.className = `${this.id} row-container`;

      var row = document.createElement('div');
      row.className = 'row'

      rowContainer.append(row);

      this.$el = rowContainer;
      this.$row = rowContainer.getElementsByClassName('row')[0];
      console.log(this.$el)
      $row.appendChild(this.$el);
    } else if(this.videos) {
      this.videos.forEach(el => {
        var cell = this.createCell(el);
        this.$row.appendChild(cell);
      })
    }
  }

  Row.prototype.createCell = function createCell(data) {
    // console.log(data);
    var body = document.createElement('div');
    body.className = 'cell';

    var image = document.createElement('div');
    image.className = 'image';
    image.setAttribute('style', `
      background-image: url('${data.snippet.thumbnails.default.url}');
      background-repeat: no-repeat;
      background-size: cover;
    `);

    var text = document.createElement('div');
    text.className = 'text'
    text.innerHTML = `<span>${data.snippet.title}<span>`

    body.appendChild(image);
    body.appendChild(text);

    return body;
  }
  var row = youtubeIds.map((el) => {
    return new Row().init(el)
  })
})()
