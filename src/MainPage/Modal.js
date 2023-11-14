import React from 'react'
import '../CSS/Modal.css'
import Map from './Map';

export default function Modal(props) {
    const animalInfo = props.animalInfo;
    console.log(animalInfo.weigth);
  return (
    <div className='modal-container'>
        <div className='container1'>
            <div className='detail'>
                <img src={animalInfo.filename}></img>
            </div>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>종</td>
                        <td>{animalInfo.kindCd}</td>
                    </tr>
                    <tr>
                        <td>발견 날짜</td>
                        <td>{animalInfo.happenDt}</td>
                    </tr>
                    <tr>
                        <td>발견 위치</td>
                        <td>{animalInfo.happenPlace}</td>
                    </tr>
                    <tr>
                        <td>색깔</td>
                        <td>{animalInfo.colorCd}</td>
                    </tr>
                    <tr>
                        <td>나이</td>
                        <td>{animalInfo.age}</td>
                    </tr>
                    <tr>
                        <td>몸무게</td>
                        <td>{animalInfo.weight}</td>
                    </tr>
                    <tr>
                        <td>성별</td>
                        <td>{animalInfo.sexCd}</td>
                    </tr>
                    <tr>
                        <td>보호장소</td>
                        <td>{animalInfo.careNm}</td>
                    </tr>
                    <tr>
                        <td>보호상태</td>
                        <td>{animalInfo.processState}</td>
                    </tr>
                    <tr>
                        <td>보호소 주소</td>
                        <td>{animalInfo.careAddr}</td>
                    </tr>
                    <tr>
                        <td>중성화 여부</td>
                        <td>{animalInfo.neuterYn}</td>
                    </tr>
                    <tr>
                        <td>특이점</td>
                        <td>{animalInfo.specialMark}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Map 
        careLocation={animalInfo.careAddr}
        carePlaceName={animalInfo.careNm}
        careTel = {animalInfo.officetel}
        />
    </div>
  )
}