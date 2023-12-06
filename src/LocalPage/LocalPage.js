import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
  import axios from 'axios';
  import map from "./localmap.jpg";
  import './LocalPage.css';

  const Popup = ({ data, onClose }) => {
    return (
      <div className="popup">
        <button onClick={onClose}>닫기</button>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>{item.careNm}</strong>
              <div>주소: {item.careAddr}</div>
              <div>전화번호: {item.careTel}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const App = () => {
    const [ldata,setldata]=useState([]);
    const [sdata,setsdata]=useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    

    const getApiData = async (areaCode) => {
      try {
        const response = await axios.get('https://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?serviceKey=EJ5ad%2F7%2Fl4hCy%2BFbFes9e%2FcsQWSZzjf3sAemohfTwfu40P%2FO2QAHPQptK2mbiUNh13OosSiVUFzGPwVrUECQTw%3D%3D', {
          params: {
            upr_cd: areaCode,
            _type: 'json',
          },
        });
    
        const responseData = response.data?.response?.body?.items?.item; // Optional chaining 사용
    
        if (!responseData) {
          console.error('API 응답 형식이 예상과 다릅니다:', response.data);
          setError('API 응답 형식이 예상과 다릅니다');
          setLoading(false);
          return;
        }
    
        console.log('응답 데이터:', responseData);
    
        // API 호출이 완료될 때까지 대기
        await Promise.all(responseData.map((item) => getShelterData(item.uprCd, item.orgCd)));
    
        setData(responseData);
        setLoading(false);
    
      } catch (e) {
        console.error('API 데이터 가져오기 오류:', e);
        setError(e);
        setLoading(false);
      }
    };
    
    
    const getShelterData = async (uprCd, orgCd) => {
      try {
        const response = await axios.get('https://apis.data.go.kr/1543061/abandonmentPublicSrvc/shelter?serviceKey=EJ5ad%2F7%2Fl4hCy%2BFbFes9e%2FcsQWSZzjf3sAemohfTwfu40P%2FO2QAHPQptK2mbiUNh13OosSiVUFzGPwVrUECQTw%3D%3D', {
          params: {
          
            upr_cd: uprCd,
            org_cd: orgCd,
            _type: 'json',
          },
        });
    
        const shelterData = response.data.response.body.items.item;
    
        // API 호출이 완료될 때까지 대기
        await Promise.all(shelterData.map((item) => getLastData(item.careRegNo)));
    
        setsdata((prevData) => [...prevData, ...shelterData]);
        
      } catch (e) {
        console.error('보호소 데이터 가져오기 오류:', e);
      }
    };
    
    const getLastData = async (careRegNo) => {
      try {
        const response = await axios.get('https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=EJ5ad%2F7%2Fl4hCy%2BFbFes9e%2FcsQWSZzjf3sAemohfTwfu40P%2FO2QAHPQptK2mbiUNh13OosSiVUFzGPwVrUECQTw%3D%3D', {
          params: {
            care_reg_no: careRegNo,
            pageNo: 1,
            numOfRow: 1,
            _type: 'json',
          }
        });
    
        const LastData = response.data.response.body.items.item;
    
        if (Array.isArray(LastData) && LastData.length > 0) {
          setldata(prevData => [...prevData, LastData[0]]);
        }
    
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    
    
    

    useEffect(() => {
      console.log({ data });
    }, [data]);
    
    useEffect(() => {
      console.log({ sdata });
    }, [sdata]);
    useEffect(() => {
      console.log({ ldata });
    }, [ldata]);
    const closePopup = () => {
      setldata([]);
      setSelectedRegion(null);
    };
  
    const handleImageMapClick = (areaCode) => {
      // 필요한 경우 여기에서 추가적인 로직을 수행할 수 있습니다.
      console.log('이미지 맵이 클릭되었습니다. 지역 코드:', areaCode);
      getApiData(areaCode);
      setSelectedRegion(areaCode);
    };
    return (
      <>
<nav>
    <div class="nav-wrapper brown lighten-2">
      <Link to="/"><a class="brand-logo center">멍멍 왈왈</a></Link>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a><Link to="/local">보호소 찾기</Link></a></li>
        <li><a><Link to="/dog-page">품종별 조회</Link></a></li>
        <li><a><Link to="/login">로그인 / 회원가입</Link></a></li>
      </ul>
    </div>
  </nav>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={map}
          alt="Korea Map"
          useMap="#image-map"
          style={{ maxWidth: '50%' }}
        />
        <map name="image-map">
          <area
            onClick={() => handleImageMapClick('6530000')}
            target="_blank"
            alt="강원도"
            code="6530000"
            title="강원도"
            coords="401,166,439,150,456,146,473,151,513,148,518,152,554,153,574,144,584,132,592,113,589,102,597,94,605,102,613,126,627,158,645,194,661,222,680,244,692,258,696,270,698,280,705,287,713,301,721,318,727,322,739,336,747,368,735,381,713,378,685,379,665,370,655,383,620,374,613,374,591,355,572,350,552,359,541,349,532,363,521,358,493,361,523,291,485,277,483,245,496,227,483,212,470,194,451,190,449,179,435,182,427,190,424,186,410,172"
            shape="poly"
          />
           <area 
           onClick={() => handleImageMapClick('6410000')}
           target="_blank" 
           alt="경기도" 
           title="경기도" 
           coords="399,171,426,193,438,189,449,193,469,199,474,213,485,221,491,228,481,242,482,281,517,296,476,389,439,411,423,401,406,404,358,333,375,313,374,297,391,309,409,310,422,306,432,295,426,285,479,230,446,213,382,218,390,244,438,246,376,288,340,257,366,268,356,221" 
           shape="poly">
           </area>
           <area  onClick={() => handleImageMapClick('6280000')}target="_blank" alt="인천" title="인천"  coords="368,312,371,287,357,279,324,242,289,236,252,281,354,341" shape="poly"/>
    <area onClick={() => handleImageMapClick('6110000')}target="_blank" alt="서울" title="서울"  coords="385,220,468,218,473,238,409,306,373,293,441,243,391,241" shape="poly"/>
    <area onClick={() => handleImageMapClick('6430000')}target="_blank" alt="충청북도" title="충청북도"  coords="444,413,497,565,536,567,551,533,527,523,528,453,553,445,580,420,602,426,640,387,569,354,489,365" shape="poly"/>
    <area onClick={() => handleImageMapClick('5690000')}target="_blank" alt="세종" title="세종"  coords="346,438,355,429,432,430,453,453,453,478,434,462,412,448,355,448" shape="poly"/>
    <area onClick={() => handleImageMapClick('6300000')}target="_blank" alt="대전" title="대전"  coords="353,477,357,469,429,470,439,480,471,492,471,515,446,521,438,499,414,488,357,488" shape="poly"/>
    <area onClick={() => handleImageMapClick('6440000')}target="_blank" alt="충청남도" title="충청남도"  coords="289,410,343,389,374,395,380,419,391,413,415,414,432,411,444,431,376,427,321,435,442,468,351,464,358,559,489,556,421,490,309,492,298,451,291,436" shape="poly"/>
    <area onClick={() => handleImageMapClick('6470000')}target="_blank" alt="경상북도" title="경상북도"  coords="612,623,609,642,576,632,532,571,548,525,528,462,581,425,608,433,660,375,754,379,769,422,758,555,685,643,636,643,632,624,651,610,658,575,610,548,545,552,546,571,617,580,612,591" shape="poly"/>
    <area onClick={() => handleImageMapClick('6270000')}target="_blank" alt="대구" title="대구"  coords="612,637,642,610,652,577,609,551,552,554,548,571,615,580" shape="poly"/>
    <area onClick={() => handleImageMapClick('6310000')}target="_blank" alt="울산" title="울산"  coords="692,638,767,551,804,609,735,663,691,656" shape="poly"/>
    <area onClick={() => handleImageMapClick('6260000')}target="_blank" alt="부산" title="부산"  coords="671,663,759,665,755,677,694,743,677,711,722,687,669,690" shape="poly"/>
    <area onClick={() => handleImageMapClick('6480000')}target="_blank" alt="경상남도" title="경상남도" coords="538,582,495,640,505,667,494,690,560,832,695,748,676,698,706,686,665,682,670,658,690,656,690,638,626,632,583,634" shape="poly"/>
    <area onClick={() => handleImageMapClick('6450000')}target="_blank" alt="전라북도" title="전라북도"  coords="350,555,526,569,531,584,494,636,501,668,492,691,428,692,386,663,323,669" shape="poly"/>
    <area onClick={() => handleImageMapClick('6290000')}target="_blank" alt="광주" title="광주" coords="291,670,377,672,375,687,367,690,377,697,400,703,402,715,381,720,372,703,353,693,290,690" shape="poly"/>
    <area onClick={() => handleImageMapClick('6460000')}target="_blank" alt="전라남도" title="전라남도"  coords="405,717,400,697,370,689,378,677,378,666,384,662,400,674,417,691,489,693,549,839,318,915,234,787,297,721,272,700,292,687,369,700,380,722" shape="poly"/>
    <area onClick={() => handleImageMapClick('6500000')}target="_blank" alt="제주도" title="제주도"  coords="274,1038,301,1009,380,996,400,1009,386,1040,298,1061" shape="poly"></area>
        </map>
        {selectedRegion && (
          <div className={`popup ${selectedRegion ? 'popup-active' : ''}`}>
        <Popup data={ldata} onClose={closePopup} />
        <div className="popup-background" onClick={closePopup}></div>
        </div>
      )}
      </div>
      </>
    );
  };

  export default App;