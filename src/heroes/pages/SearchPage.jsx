import React from 'react'
import { HeroCard } from '../components'
import { useForm } from '../../hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string'
import { getHeroByName } from '../helpers';


export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  const heros = getHeroByName(q);

  const showSearch = q === '';
  const showError = heros.length === 0 && q !== '';

  const { searchText, onInputChange, onResetForm } = useForm({
    searchText: q,
  })

  const onSearchSubmit = (e) => {
    e.preventDefault();

    // if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searchs</h4>
          <hr />

          <form onSubmit={onSearchSubmit}>
            <input type="text" name="searchText" id="searchText" placeholder='Search a hero' className='form-control' autoComplete='off' value={searchText} onChange={onInputChange} />

            <button className='btn btn-outline-primary mt-1'>Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div className="alert alert-primary animate__animated animate__fadeIn" style={{ display: !showSearch && 'none' }}>Search a hero</div>

          <div className="alert alert-danger animate__animated animate__fadeIn" style={{ display: !showError && 'none' }}>There is no hero with <b>{q}</b></div>

          {
            heros.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }

          {/* <HeroCard /> */}
        </div>
      </div>
    </>
  )
}
