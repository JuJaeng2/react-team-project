import React from 'react'
import '../CSS/Modal.css'
import Map from './Map';


export default function DetailModal(props) {
    const animalInfo = props.animalInfo;

    const modal_style = {
        display : 'block',
        zIndex: 1005, 
        opacity: 1,
        transform: 'scaleX(1)',
        top: '10%',
    };

  return (

    <div className='info_modal'>
        <div className='info_modal_content'>
            <div className='content_title'>
                <h4>세부사항</h4>
            </div>
            <div className='section1'>
                <div className='section2'>
                    <div>
                        <image src={animalInfo.filename}/>
                    </div>     
                    <table className='stripted'>
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
                            <tr>
                                <td>전화번호</td>
                                <td>{animalInfo.officetel}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Map
                careLocation={animalInfo.careAddr}
                carePlaceName={animalInfo.careNm}
                careTel = {animalInfo.officetel}
                />    
            </div>
            
        </div>
        <div className='info_modal_footer'>
            <a className='waves-effect waves-green btn-flat' onClick={props.closeModalMethod}>close</a>
        </div>
    </div>
    
  )
}