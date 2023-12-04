import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router';
import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import Movies from '../movies/Movies';
import SavedMovies from '../saved-movies/SavedMovies';
import Profile from '../profile/Profile';
import Login from '../login/Login';
import Register from '../register/Register';
import NotFound from '../not-found/NotFound';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../protected-route/protectedRoute';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import mainApi from '../../utils/MainApi';
import { SavedMoviesContext } from '../../contexts/savedMoviesContext';
import { BASE_URL, NAMES } from '../../utils/constants';
import { IMovieBit, IMovieSaved, IPatchMe, ISignin, ISignup, TMovieSavedInput } from '../../types/types';

function App() {
  const [currentUser, setCurrentUser] = useState<IPatchMe | null>(null);
  const [movies, setMovies] = useState<IMovieBit[]>([]);
  const [savedMovies, setSavedMovies] = useState<IMovieSaved[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [loginErr, setLoginErr] = useState('');
  const [registerErr, setRegisterErr] = useState('');
  const [profileErr, setProfileErr] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const onProfile = location.pathname === '/profile';


  const getData = () => {
    setIsLoading(true);
    Promise.all([mainApi.getMe(), mainApi.getMovies()])
      .then(res => {
        setCurrentUser(res[0].data);
        setSavedMovies(res[1].data);
      })
      .catch(err => {
        if (err.message !== 'Необходима авторизация') console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const signin = ({ email, password }: ISignin) => {
    setLoginErr('');
    setIsFormLoading(true);
    mainApi.signin({ email, password })
      .then(() => {
        getData();
      })
      .then(() => navigate('/movies'))
      .catch(err => {
        setLoginErr(err.message)
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  };

  const signup = ({ email, name, password }: ISignup) => {
    setIsFormLoading(true);
    setRegisterErr('');
    mainApi.signup({ email, name, password })
      .then(() => signin({ email, password }))
      .catch(err => setRegisterErr(err.message))
      .finally(() => setIsFormLoading(false));
  };

  const signout = () => {
    mainApi.signout()
      .then(() => {
        setCurrentUser(null);
        setSavedMovies([]);
        NAMES.forEach(name => {
          localStorage.removeItem(`searchInput-${name}`);
          localStorage.removeItem(`shorts-${name}`);
        });
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id: string) => {
    mainApi.deleteMovie(id)
      .then(() => setSavedMovies(prev => prev.filter(item => item._id !== id)))
      .catch(err => console.log(err))
  };

  const handleAdd = (params: TMovieSavedInput) => {
    mainApi.addMovie(params)
      .then(res => setSavedMovies([...savedMovies, res.data]))
      .catch(err => console.log(err));
  };

  const handleAllMovies = (movie: IMovieBit) => {
    const currentMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);
    if (currentMovie) {
      handleDelete(currentMovie._id);
    } else {
      handleAdd({
        country: movie.country,
        description: movie.description,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        trailerLink: movie.trailerLink,
        movieId: movie.id,
        image: `${BASE_URL}${movie.image.url}`,
        thumbnail: `${BASE_URL}${movie.image.formats.thumbnail.url}`,

      })
    }
  };

  const handleSavedMovies = (movie: IMovieSaved) => {
    handleDelete(movie._id);
  };

  const editProfile = ({ name, email }: IPatchMe) => {
    setProfileErr('');
    setIsFormLoading(true);
    mainApi.patchMe({ name, email })
      .then(res => setCurrentUser(prev => {
        return { ...prev, email: res.data.email, name: res.data.name };
      }))
      .catch(err => setProfileErr(err.message))
      .finally(() => setIsFormLoading(false));
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page">
      <SavedMoviesContext.Provider value={savedMovies}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/signin' element={
              <ProtectedRoute onlyUnauth isLoading={isLoading}>
                <Login signin={signin} isFormLoading={isFormLoading} loginErr={loginErr} />
              </ProtectedRoute>
            } />
            <Route path='/signup' element={
              <ProtectedRoute onlyUnauth isLoading={isLoading}>
                <Register signup={signup} isFormLoading={isFormLoading} registerErr={registerErr} />
              </ProtectedRoute>
            } />
            <Route path='/404' element={
              <NotFound />
            } />
            <Route path='/*' element={
              <>
                <Header isLoggedIn={!!currentUser} />
                <Routes>
                  <Route path='/' element={
                    <Main />
                  } />
                  <Route path='/movies' element={
                    <ProtectedRoute isLoading={isLoading}>
                      <Movies handleMovie={handleAllMovies} movies={movies} setMovies={setMovies} />
                    </ProtectedRoute>
                  } />
                  <Route path='/saved-movies' element={
                    <ProtectedRoute isLoading={isLoading}>
                      <SavedMovies handleMovie={handleSavedMovies} />
                    </ProtectedRoute>
                  } />
                  <Route path='/profile' element={
                    <ProtectedRoute isLoading={isLoading}>
                      <Profile signout={signout} editProfile={editProfile} profileErr={profileErr} isFormLoading={isFormLoading} />
                    </ProtectedRoute>
                  } />
                  <Route path='/*' element={<Navigate to='/404' />} />
                </Routes>
                {!onProfile && <Footer />}
              </>
            }>
            </Route>
          </Routes>
        </CurrentUserContext.Provider>
      </SavedMoviesContext.Provider>
    </div>
  );
}

export default App;
