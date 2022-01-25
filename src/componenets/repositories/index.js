import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {debounce} from "lodash";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faSearch, faStar} from '@fortawesome/free-solid-svg-icons'

import './repository.css'
import {octokit} from "../../utils";

//used icons
const stars = <FontAwesomeIcon icon={faStar}/>
const watchers = <FontAwesomeIcon icon={faClock}/>
const searchIcon = <FontAwesomeIcon icon={faSearch}/>

// used debounce function to search repositories through query and passed callback to set Data
// data is sorted with stars and order is descending
const searchRepos = debounce((query, callback) => {
    octokit?.request('/search/repositories', {
        q: query,
        sort: 'stars',
        order: 'desc'
    }).then(({status, data}) => {
        if (status === 200) {
            callback(data?.items)
        }
    })
}, 500);


export const Repositories = () => {
    const [search, setSearch] = useState('')
    const [repos, setRepos] = useState([])

    useEffect(() => {
        // will only call when search has string
        if (search.length) {
            // calling search api function here and passing it search query and callback
            searchRepos(search, setRepos)
        }
        // search dependency
    }, [search])


    const onSearch = useCallback((event) => {
        setSearch(event.target.value)
    }, []);


    return (
        <div className="container">
            <h2>Search Github Repositories</h2>
            <div className="input-group input-group-lg ">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                    {searchIcon}
                </span>
                <input type="text" placeholder="Type here..." className="form-control"
                       aria-label="github repos search input"
                       aria-describedby="inputGroup-sizing-lg" onChange={onSearch}/>
            </div>
            <div className="repository-list-container">
                <div className="list-group">
                    {!repos.length ? <div className="d-flex justify-content-center">No Data</div> :
                        repos?.map(i =>
                            <NavLink key={i.id} to={`${i.owner.login}/${i.name}`}
                                     className="list-group-item list-group-item-action d-flex gap-3 py-3">

                                <img src={i.owner.avatar_url} alt="twbs" width="32" height="32"
                                     className="rounded-circle flex-shrink-0"/>
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0 ">{i.name}</h6>
                                        <p className="mb-0 opacity-75 "><b
                                            className="alert-primary">owner</b> : {i.owner.login}</p>
                                    </div>
                                    <div className="d-flex gap-4 ">
                                        <small className="d-flex align-items-center gap-1 text-muted ">
                                            {stars}
                                            {i.stargazers_count}
                                        </small>
                                        <small className="d-flex align-items-center gap-1 text-muted">
                                            {watchers}
                                            {i.watchers}
                                        </small>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
