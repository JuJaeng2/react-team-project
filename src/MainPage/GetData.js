import axios from 'axios';
import React, {useEffect, useState} from 'react';
import '../CSS/grid.css';
import '../CSS/Modal.css'
import Modal from './Modal';

export default function GetData() {
    // 인증키
    // serviceKey=EJ5ad%2F7%2Fl4hCy%2BFbFes9e%2FcsQWSZzjf3sAemohfTwfu40P%2FO2QAHPQptK2mbiUNh13OosSiVUFzGPwVrUECQTw%3D%3D

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    const getApiData = async () => {
        try{
            const response = await axios.get('https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=EJ5ad%2F7%2Fl4hCy%2BFbFes9e%2FcsQWSZzjf3sAemohfTwfu40P%2FO2QAHPQptK2mbiUNh13OosSiVUFzGPwVrUECQTw%3D%3D', {
                params:{
                    bgnde : '20230101',
                    endde : '20231010',
                    pageNo : 1,
                    numOfRow : 10,
                    _type : 'json',
                }
            });
            const responseData = response.data.response.body.items.item;
        
            setData(responseData);
        }catch(e){
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        getApiData();
    }, []);

    const[showModal, setShowModal] = useState(false);
    const[animalInfo, setAnimalInfo] = useState(null);
    const handleShowModal = (information) => {
        setAnimalInfo(information);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    if(loading) return <div><h1>Loading...</h1></div>
    if(error) return <div><h1>Error...</h1></div>
    return (
        <div className='grid_container'>
            <div className='grid_title'>
                <h1>유기견 정보</h1>
            </div>
            <div className='grid'>
                {data.map(animal => (
                <div 
                key={animal.desertionNo} 
                className='animal_grid_item'
                
                >
                    <img 
                    src={animal.filename} 
                    className='grid_image' 
                    onClick={() => handleShowModal(animal)}
                    ></img>
                    <p>종자 : {animal.kindCd}</p>
                    <p>색상 : {animal.colorCd}</p>
                    <p>나이 : {animal.age}</p>
                </div>
                ))}
            </div>
            {showModal && (
                <div className='modal_overlay'>
                    {/* <Modal className='modal'/> */}
                    <div className='modal'>
                        {/* <img src={image}/> */}
                        <Modal animalInfo={animalInfo}/>
                        <button onClick={() => handleCloseModal()}>닫기</button>
                    </div>
                </div>
            )}
        </div>
            
    )
}

