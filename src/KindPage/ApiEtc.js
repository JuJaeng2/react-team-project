import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Kind.css';


function ApiEtc() {
    //요청 관리할 3개의 state
    const [data, setData] = useState(null); //요청의 결과 : data
    const [loading, setLoading] = useState(false); //로딩 상태 : loading
    const [error, setError] = useState(null); // 에러 : error

    const fetchData = async () => {
        try {
            setError(null); //요청 시작할 때 error와 data 초기화
            setData(null); // ''
            setLoading(true); //loading 상태 true로 변환

            //API에서 불러온 응답값을 response 변수에 저장
            const response = await axios.get('http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=Kuw7qz9iFZ7XGYZCYQEom6OIemqiDnE3X81FZwzJKlapn9l7WVSxtn9vlw75ae0pwIaGOZ2bc%2FepKIRAJ%2BJQPA%3D%3D', {
                params: {
                    bgnde: 20220101, //검색 시작일
                    endde: 20221231, //검색 종료일
                    upkind: 429900, //축종코드 = 고양이 422400 / 기타 429900
                    numOfRows: 30, //페이지당 노출 개수
                    _type: 'json', //응답 형태
                },
            });
            const responseData = response.data.response.body.items.item;
            setData(responseData); //response 값을 data에 저장
        } catch(e) {
            console.error('Error fetching data:', e);
            setError(e);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => { //App Component가 처음 load될 때만 실행
        fetchData();
    }, []);

    const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
    const [selectedEtc, setSelectedEtc] = useState(null); // 선택한 품종 정보 추가

    const openModal = (etc) => {
        setModalOpen(true);
        setSelectedEtc(etc);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedEtc(null);
    };


    if(loading) return <div className="loadMessage">Loading...</div>;
    if(error)   return <div>Error: {error.message}</div>;
    if(!data || !Array.isArray(data)) return null;

    return (//return 값
        <div className="middleArea">
            <div className="animalArea">
                {data.map((etc) => (   //JSX에서 'data'를 사용할 때, 'data'가 배열인지 확인하고 매핑하여 렌더링
                    <div className="animalBox" key={etc.kindCd}>
                        <div className="infoBox">
                            <img className="animalImg" 
                            src={etc.filename}
                            alt={`Etc ${etc.kindCd}`}
                            onClick={() => openModal(etc)}>
                            </img>
                            <div className="nameBox">
                                <p>품종: {etc.kindCd}</p>
                                <p>성별: {etc.sexCd}</p> 
                                <p>{etc.age}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div className="modal_1">
                    <div className="modalInfoBox">
                        <div className="modalImgBox">
                            <img className="modalAnimalImg" src={selectedEtc.filename}></img>
                        </div>
                        <div className="box">
                            <span className="close" onClick={closeModal}>
                                X
                            </span>
                            <p>품종 : {selectedEtc.kindCd} ({selectedEtc.sexCd})</p>
                            <p>색상 : {selectedEtc.colorCd}</p>
                            <p>나이 : {selectedEtc.age}</p>
                            <p>체중 : {selectedEtc.weight}</p>
                            <p>중성화 여부 (Y/N/U) : {selectedEtc.neuterYn}</p>
                            <p>특징 : {selectedEtc.specialMark}</p>
                            <p>보호소명 : {selectedEtc.careNm}</p>
                            <p>보호소 번호 : {selectedEtc.careTel}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApiEtc;