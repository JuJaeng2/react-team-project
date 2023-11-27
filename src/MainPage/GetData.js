import axios from 'axios';
import React, {useEffect, useState} from 'react';
import '../CSS/grid.css';
import '../CSS/Modal.css'
import DetailModal from './DetailModal';



export default function GetData() {

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
                    numOfRows : 50,
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

 
    if(loading) return <div class="progress white"><div class="indeterminate brown lighten-2"></div></div>
    if(error) return <div><h1>Error...</h1></div>
    return (
        <div className='grid_container'>
            <div className='grid_title'>
                <h1>유기동물 정보</h1>
            </div>
            <div className="card-container">
                {data.map(animal => (
                 <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator card_image" src={animal.filename}/>
                    </div>
                    <div class="card-content">
                        <span class="card-title grey-text text-darken-4">{animal.kindCd}
                            <i 
                            class="material-icons right more_info"
                            onClick={() => handleShowModal(animal)}
                            >add</i>
                        </span>
                        <p>종자 : {animal.kindCd}</p>
                        <p>나이 : {animal.age}</p>
                        <p>색상 : {animal.colorCd}</p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Information<i class="material-icons right more_info">close</i></span>
                        <img className='responsive-img' src={animal.filename}></img>
                        <p>종자 : {animal.kindCd}</p>
                        <p>발견 날짜 : {animal.happenDt}</p>
                        <p>발견 위치 : {animal.happenPlace}</p>
                        <p>색깔 : {animal.colorCd}</p>
                        <p>나이 : {animal.age}</p>
                        <p>몸무게 : {animal.weight}</p>
                        <p>성별 : {animal.sexCd}</p>
                        <p>보호장소 : {animal.careNm}</p>
                        <p>보호상태 : {animal.processState}</p>
                        <p>보호소 주소 : {animal.neuterYn}</p>
                        <p>중성화 여부 : {animal.kispecialMarkndCd}</p>
                    </div>
                </div>
                ))}
            </div>
            
        
            {showModal && (
                <div className='modal_overlay'>
                    <div className='my_modal'>
                        <DetailModal animalInfo={animalInfo} closeModalMethod={handleCloseModal}/>
                    </div>
                </div>
            )}
        </div>
    );
}

