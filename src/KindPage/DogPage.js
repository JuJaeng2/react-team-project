import React, { useState } from 'react';
import './Kind.css';
import ApiDog from './ApiDog';
import ApiCat from './ApiCat';
import ApiEtc from './ApiEtc';
import { useNavigate } from "react-router-dom";


function DogPage() {
    // const movePage = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('dog'); // Default category is 'dog'

    const goDogPage = () => setSelectedCategory('dog');
    const goCatPage = () => setSelectedCategory('cat');
    const goEtcPage = () => setSelectedCategory('etc');

    const renderSelectedCategory = () => {
    switch (selectedCategory) {
        case 'dog':
        return <ApiDog />;
        case 'cat':
        return <ApiCat />;
        case 'etc':
        return <ApiEtc />;
        default:
        return null;
    }
    };

    return (
    <div className="App">
        <div className="pageTop">
        <div className="titleBox">
            <h3><br/></h3>
            <h3>멍멍왈왈</h3>
        </div>
        </div>
        <div className="pageMiddle">
            <ul className="menuBox">
                <hr/>
                <li>
                    <a href="#"><p>메인 홈</p></a>
                    <a href="#"><p>보호소 찾기</p></a>
                    <a href="#"><p>품종별 검색</p></a>
                    <a href="#"><p>커뮤니티</p></a>
                </li>
                <hr/>
            </ul>
            <div className="textBox">
                마음이 가는 가족을 찾아보세요. <br /><br /><br />
                사진을 선택하여 세부정보를 볼 수 있습니다.<br /><br /><br />
                ＊<br />
                ＊<br />
                ＊
            </div>
            <ul className="Kategorie">
                <li className="kategorieButton">
                    <button onClick={goDogPage}>강아지</button>
                    <button onClick={goCatPage}>고양이</button>
                    <button onClick={goEtcPage}>그 외</button>
                </li>
            </ul>
        <div>
        {renderSelectedCategory()}
        </div>
        </div>
        <div className="pageBottom">

        </div>
    </div>
    );
}

export default DogPage;