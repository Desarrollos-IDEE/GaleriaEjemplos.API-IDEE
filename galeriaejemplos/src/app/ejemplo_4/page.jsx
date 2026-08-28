'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingIcon from '@/components/Helpers/LoadingIcon';
import MapPage from '@/components/pages/MapPage';
import { getConfig } from './config';

export default function Ejemplo1() {
    const [blocking, setBlocking] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);
    const [config, setConfig] = useState(null);
    const searchParams = useSearchParams();
    const title = searchParams.get('title');

    useEffect(() => {
        setHasMounted(true);
    }, []);
    
    useEffect(() => {
        if (!hasMounted || !window.IDEE || !blocking ) return;
        
        const handleInit = () => {
            getConfig().then(setConfig);
            setBlocking(false);
        };

        handleInit();
    }, [blocking, hasMounted]);

    if (!hasMounted) return null;


    return (
        <>
            {blocking ?
                <div className="block-loader-container">
                    <LoadingIcon width={256} height={256} />
                </div>
                :
                <MapPage title={title} config={config}/>
            }
        </>
    );
}





