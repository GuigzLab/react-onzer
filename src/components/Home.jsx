import React, { useState, useEffect, createRef } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Track from './Track';
import FavService from '../FavService';
import { useStateValue, StateProvider } from '../state';


function Home(props) {

     const [store, dispatch] = useStateValue();
     // const [title, setTitle] = useState('');
     // const [orderBy, setOrderBy] = useState('RANKING');
     // const [musics, setMusics] = useState([]);

     const inputTitle = createRef()
     const selectOrder = createRef()

     useEffect(() => {
          inputTitle.current.value = store.title
          // selectOrder.current.value = store.order
     })

     function newTitle(event) {
          // setTitle(event.target.value)
          dispatch({
               type: 'onTitle',
               newTitle: event.target.value
          })
     }

     function newOrder(event) {
          dispatch({
               type: 'onOrder',
               newOrder: event.target.value
          })
     }

     function onSearch(event) {
          event.preventDefault()
          const encodedTitle = encodeURIComponent(store.title);
          if (store.title.trim().length > 0) {
               fetchJsonp(`https://api.deezer.com/search?q=${encodedTitle}&order=${store.order}&output=jsonp`)
                    .then((response) => response.json())
                    .then(response => response.data)
                    .then(musics => dispatch({ type: 'onMusics', newMusics: musics }))
                    .catch((ex) => console.log('parsing failed', ex))
          }
     }

     function onFavorites(music) {
          FavService.toggleFavorite(music);
          dispatch({
               type: 'onMusics',
               newMusics: [...store.musics]
          })
     }


     return (
          <main className="container mt-3">
               <h1>Recherche</h1>
               <p>Recherchez un titre sur Deezer en utilisant le formulaire suivant :</p>
               <hr />
               <form onSubmit={onSearch}>
                    <div className="row">
                         <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Titre&nbsp;:</label>
                         <div className="col-sm-4">
                              <input type="text" className="form-control" id="searchText" ref={inputTitle}
                                   placeholder="Eminem, Armin Van Buuren, Rihanna, ..." onChange={newTitle} />
                         </div>
                         <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Trier par :</label>
                         <div className="col-sm-2">
                              <select id="order" className="custom-select" onChange={newOrder} ref={selectOrder} defaultValue="RANKING">
                                   <option value="ALBUM_ASC">Album</option>
                                   <option value="ARTIST_ASC">Artiste</option>
                                   <option value="TRACK_ASC">Musique</option>
                                   <option value="RANKING">Les plus populaires</option>
                                   <option value="RATING_ASC">Les mieux notés</option>
                              </select>
                         </div>
                         <div className="col-sm-2 text-right">
                              <input type="submit" className="btn btn-primary" value="Go" />
                         </div>
                    </div>
               </form>
               <hr />
               {/* <h3>Aucun résultat pour cette recherche ...</h3> */}
               <h2>Résultats</h2>
               <div className="card-group search-results">
                    {store.musics.map(music => <Track key={music.id} music={music} onClick={onFavorites} isFavorite={FavService.isFavorite(music)} />)}
               </div>

          </main>
     );
}

export default Home;