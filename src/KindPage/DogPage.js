import React, { useState } from 'react';
import './Kind.css';
import ApiDog from './ApiDog';
import ApiCat from './ApiCat';
import ApiEtc from './ApiEtc';
import { Link } from "react-router-dom";


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
                <nav>
                <div class="nav-wrapper brown lighten-2">
                    <Link to="/"><a href="#" class="brand-logo center">멍멍 왈왈</a></Link>
                    <ul id="nav-mobile" class="left hide-on-med-and-down">
                        <li><a><Link to="/local">보호소 찾기</Link></a></li>
                        <li><a><Link to="/dog-page">품종별 조회</Link></a></li>
                        <li><a><Link to="/login">로그인 / 회원가입</Link></a></li>
                    </ul>
                </div>
                </nav>
            </div>
        </div>
        <div className="pageMiddle">
            <div className="textBox">
                *<br />
                *<br />
                *<br /><br /><br />
                마음이 가는 가족을 찾아보세요. <br /><br />
                사진을 선택하여 세부정보를 볼 수 있습니다.<br /><br /><br />
                *<br />
                *<br />
                *<br /><br /><br />
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