'use client';
import React, { useEffect, useState } from 'react';
import LoadingIcon from '@/components/Helpers/LoadingIcon';
import MapPage from '@/components/pages/MapPage';
import { getConfig } from './ejemplo_1';

export default function Ejemplo1() {
    const [blocking, setBlocking] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);
    const [feature, setFeature] = useState(null);

    useEffect(() => {
        setHasMounted(true);
        getConfig().then(setFeature);
    }, []);

    useEffect(() => {
        if (!hasMounted || !window.IDEE || !blocking || !feature) return;

        const handleInit = () => {
            setBlocking(false);
        };

        handleInit();
    }, [blocking, hasMounted, feature]);

    if (!hasMounted) return null;


    return (
        <>
            {blocking ?
                <div className="block-loader-container">
                    <LoadingIcon width={256} height={256} />
                </div>
                :
                <div className="m-container">
                    <MapPage feature={feature}/>
                </div>
            }
        </>
    );
}





