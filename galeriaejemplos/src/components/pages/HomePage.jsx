'use client';
import React, { Component } from 'react';

import SamplesCard from '@/components/Card/Card';
import Header from '@/components/Header/Header';

import './HomePage.css';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(query) {
        this.setState({ searchQuery: query });
    }

    render() {
        const { title1, title2, subtitle, description, metadatos } = this.props;
        const searchLower = (this.state.searchQuery || '').trim().toLowerCase();

        const filtered = (metadatos || []).filter(feature => {
            if (!feature.id) return false;
            if (!searchLower) return true;
            const title = (feature.title || '').toLowerCase();
            const desc = (feature.description || '').toLowerCase();
            return title.includes(searchLower) || desc.includes(searchLower);
        });


        return (
            <div className='home'>
                <Header onSearch={this.handleSearch} />
                <div id='viewer'>
                    <section className='intro'>
                        <h1 id="title1" dangerouslySetInnerHTML={{ __html: title1.es }}></h1>
                        <h1 id="title2" dangerouslySetInnerHTML={{ __html: title2.es }}></h1>
                        <h2 id='subtitle' dangerouslySetInnerHTML={{ __html: subtitle.es }}></h2>
                        <p id='description' dangerouslySetInnerHTML={{ __html: description.es }}></p>
                    </section>
                    <section className='cards'>
                        {filtered.map((feature, index) => (
                            <SamplesCard
                                key={`ejemplo_${index}`}
                                title={feature.title}
                                description={feature.description}
                                onClick={() => {
                                    const title = encodeURIComponent(feature.title || feature.id || 'Ejemplo');
                                    window.open(`/GaleriaEjemplos_API-IDEE/${feature.id}?title=${title}`, '_blank', 'noopener,noreferrer');
                                }}
                            />
                        ))}
                    </section>
                </div>
            </div>
        )
    }
}

export default Home;