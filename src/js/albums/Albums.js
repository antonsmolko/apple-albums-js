export default class Albums {
  constructor(matrix, albums) {
    this._matrix = matrix;
    this._albums = albums;
    this._matrixState = [];
    this._windowFocus = true;
    this._startAlbum = false;
    this._changeAlbumSpriteTimeout = null;
    this._startChangeAlbumSpriteTimeout = null;
  }

  async init(el) {
      if (!this._albums) return;

      this._albums.forEach((album) => {
        album.init();
      });

      this._startAlbum = true;
      await this.initMatrixState();
      this._startChangeAlbumSpriteTimeout = await setTimeout(() => {
        this.startChangeAlbumsSprite();
      }, 4000);

      window.onblur = () => {
        this._windowFocus = false; // Возобновление анимации
        console.log("window on focus");
      };

      window.onfocus = () => {
        this._windowFocus = true; // Остановка анимации
        this.startChangeAlbumsSprite();
        console.log("window on blur");
      };

      setTimeout(() => el.classList.add('start'));
  }

  /**
   * Функция собирает map на основании значений
   */

  initMatrixState() {
    return this._matrix.map((cell) => {
      const isBusy = this._albums.find(
        (album) =>
          +album.sprite[0] === +cell[0] &&
          +album.sprite[1] === +cell[1] &&
          +album.s === +cell[2]
      );

      this._matrixState.push({
        h: cell[0],
        v: cell[1],
        s: cell[2],
        busy: isBusy,
      });
    });
  }

  startChangeAlbumsSprite() {
    clearTimeout(this._startChangeAlbumSpriteTimeout);

    if (this._windowFocus) {
      const randTimer = Math.random() * 400 + 200;
      this._changeAlbumSpriteTimeout = setTimeout(async () => {
        const album = await this.getSelectedAlbum();
        const nextSprite = await this.selectNewSprite(album);
        await this.changeAlbumSprite(album, nextSprite);
        // console.log(`Vacant sprite size 1 count: ${this.getVacantCount1()}`);
        // console.log(`Vacant sprite size 2 count: ${this.getVacantCount2()}`);
        this._startAlbum && (await this.startChangeAlbumsSprite());
      }, randTimer);
    } else {
      clearTimeout(this._changeAlbumSpriteTimeout);
    }
  }

  /**
   * Случайный выбор альбома, у которого будет заменено изображение
   */
  getSelectedAlbum() {
    const selectedAlbumIndex = Math.floor(Math.random() * this._albums.length);
    return this._albums[selectedAlbumIndex];
  }

  /**
   * Функция выбирает следующий спрайт подходящего размера, который не занят
   * @param {Object} album
   */
  selectNewSprite(album) {
    return this._matrixState.find(
      (sprite) => !sprite.busy && +sprite.s === +album.s
    );
  }

  /**
   * Функция меняет значение busy спрайта выбранного альбома на false,
   * а значение следующего спрайта для этого альбома на true
   * @param {Object} album
   * @param {Object} nextSprite
   */
  changeAlbumSprite(album, nextSprite) {
    const matrixState = [...this._matrixState];
    matrixState.map((sprite) => {
      if (
        sprite.busy &&
        +sprite.h === +album.sprite[0] &&
        +sprite.v === +album.sprite[1]
      ) {
        sprite.busy = false;
      } else if (
        !sprite.busy &&
        +sprite.h === +nextSprite.h &&
        +sprite.v === +nextSprite.v
      ) {
        sprite.busy = true;
      }
    });
    this._matrixState = [...matrixState];
    album.sprite[0] = nextSprite.h;
    album.sprite[1] = nextSprite.v;
    album.setPositionAlt(album.sprite[0], album.sprite[1]);
  }

  destroy() {
    clearTimeout(this._startChangeAlbumSpriteTimeout);
    this._startAlbum = false;
  }

  getVacantCount1() {
    return this._matrixState.filter((cell) => !cell.busy && +cell.s === 1)
      .length;
  }

  getVacantCount2() {
    return this._matrixState.filter((cell) => !cell.busy && +cell.s === 2)
      .length;
  }

  getBusyCount() {
    return this._matrixState.filter((cell) => cell.busy).length;
  }

  getNotBusyCount() {
    return this._matrixState.filter((cell) => !cell.busy).length;
  }
}
