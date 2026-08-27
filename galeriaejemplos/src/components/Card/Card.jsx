'use client';
import React, { Component } from 'react';

import './Card.css'

class SamplesCard extends Component {

    render() {
        const { title, description, onClick } = this.props;

        return (
            <div className="card-container">
                <div className="card-body">
                    <div id="card-title">{title}</div>
                    <div id="card-description">{description}</div>
                    <button id="card-button" onClick={onClick}>Ejemplo</button>
                </div>
            </div>
        );
    }
}

export default SamplesCard;
