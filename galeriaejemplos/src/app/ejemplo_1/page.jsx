'use client';
import React, { useEffect, useState } from 'react';
import LoadingIcon from '@/components/Helpers/LoadingIcon';
import MapPage from '@/components/pages/MapPage';
import { getConfig } from './config';

export default function Ejemplo1() {
    const [blocking, setBlocking] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        setHasMounted(true);
        getConfig().then(setConfig);
    }, []);

    useEffect(() => {
        if (!hasMounted || !window.IDEE || !blocking || !config) return;

        const handleInit = () => {
            setBlocking(false);
        };

        handleInit();
    }, [blocking, hasMounted, config]);

    if (!hasMounted) return null;


    return (
        <>
            {blocking ?
                <div className="block-loader-container">
                    <LoadingIcon width={256} height={256} />
                </div>
                :
                <MapPage config={config}/>
            }
        </>
    );
}





