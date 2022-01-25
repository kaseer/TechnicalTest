import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {memoize} from "lodash";
import {octokit} from "../../utils";

const searchRepo = memoize((owner, repo, callback) => {
    octokit.request(`/repos/{owner}/{repo}`, {
        owner,
        repo
    }).then(({status, data}) => {
        if (status === 200) {
            callback(data)
        }
    })
});


export const RepositoryInfo = () => {
    const {owner, repo} = useParams();
    const [repoDetail, setRepoDetail] = useState(null)
    useEffect(() => {
        if (!repoDetail) {
            searchRepo(owner, repo, setRepoDetail)
        }
    }, [owner, repo, repoDetail])
    if (!repoDetail) return <div>loading</div>
    return (
        <div className="container">
            <div className="m-1">
                <NavLink to="/">{`< Go back`}</NavLink>
                <h2 className="h2">Repository Information</h2>
            </div>
            <div className="d-flex align-items-center gap-2 m-1">
                <img src={repoDetail?.owner.avatar_url} alt={repoDetail?.owner.login} width="70" height="70"
                     className="rounded-circle flex-shrink-0"/>
                <p>{repoDetail?.owner.login}</p>
            </div>
            <ul className="list-group list-unstyled">
                <li className="list-group-item border-0"><b>Repository Name: </b>{repoDetail?.name}</li>
                <li className="list-group-item border-0"><b>Last Update: </b>{repoDetail?.updated_at}</li>
                <li className="list-group-item border-0"><b>Programing Language: </b>{repoDetail?.language}</li>
            </ul>
        </div>
    );
};
