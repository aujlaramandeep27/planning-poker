import React from 'react';
import {Link} from 'react-router-dom';
import rocket from '../resources/images/learning_small.jpg';
import styles from './CreateUser.css';

export default function CreateUser() {
    return (
        <div class="uk-flex uk-flex-middle uk-height-viewport default-background">
            <div class="uk-width-1-1">
                <img src={rocket}/>
            </div>
            <div class="uk-container uk-width-1-1 uk-margin-small">
                <h1>Welcome to planning poker</h1> 
                <h3>Create a new user to get started!</h3>            
                <div class="uk-inline uk-width-1-2 uk-margin">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input class="uk-input" placeholder="Name" type="text"/>
                </div>
                <Link to="/meetings/" className="uk-button uk-button-primary uk-width-1-4">CREATE</Link>

            </div>

        </div>
    );
}