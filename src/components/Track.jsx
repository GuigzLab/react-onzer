import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


function Track(props) {

     function onFavClick(music) {
          return (event) => {
               event.preventDefault();
               props.onClick(music);
          }
     }

     const music = props.music;
     const isFavorite = props.isFavorite;
     const favBtnClass = isFavorite ? 'btn-outline-danger' : 'btn-danger';

     return (
          <div className="card border-0 shadow p-3" style={{ flex: 'initial', width: '45%', margin: '2%' }}>
               <div className="card-body text-left">
                    <div className="media mb-2">
                         <img className="align-self-center mr-2 w-25 rounded" src={(music.album.cover !== "") ? music.album.cover : music.artist.picture} alt="" />
                         <div className="media-body">
                              <h5 className="card-title">{music.title_short}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{music.artist.name} / {music.album.title}</h6>
                         </div>
                    </div>
                    <audio src={music.preview} className="w-100 my-2" controls></audio><br />
                    <a href="#" onClick={onFavClick(music)} className={'btn btn-sm btn-danger mt-2 ' + favBtnClass}>
                         {isFavorite
                              ? <><i className="fas fa-heart-broken"></i> Retirer des favoris</>
                              : <><i className="fas fa-heart"></i> Ajouter aux favoris</>
                         }
                    </a>
                    <Link to={`/song/${music.id}`} className="float-right mt-2">
                         <i className="fas fa-info-circle fa-2x"></i>
                    </Link>
               </div>
          </div>
     );
}

export default Track;