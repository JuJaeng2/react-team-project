import axios from 'axios';
import React, {useEffect, useState} from 'react'
import MainTop from './MainTop';
import GetData from './GetData';

export default function MainPage() {
        return (
        <div>
            <MainTop/>
            <GetData/>
        </div>
    )
}

