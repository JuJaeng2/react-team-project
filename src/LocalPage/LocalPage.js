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
        <li><a><Link to="/board">커뮤니티</Link></a></li>
      </ul>
    </div>
  </nav>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={map}
          alt="Korea Map"
          useMap="#image-map"
          style={{ maxWidth: '100%' }}
        />
        <map name="image-map">
          <area
            onClick={() => handleImageMapClick('6530000')}
            target="_blank"
            alt="강원도"
            code="6530000"
            title="강원도"
            coords="303,124,324,114,347,112,370,114,389,111,401,111,421,112,437,100,443,87,445,77,452,70,465,95,475,120,504,173,527,201,540,232,559,260,563,280,554,284,541,288,532,287,512,283,498,280,492,289,445,272,434,263,420,270,413,262,403,271,394,275,388,266,374,272,395,222,369,210,362,184,374,170,362,162,355,144,341,143,338,134,323,141" shape="poly"
          />
           <area 
           onClick={() => handleImageMapClick('6410000')}
           target="_blank" 
           alt="경기도" 
           title="경기도" 
           coords="254,187,267,187,270,164,302,126,325,142,338,138,340,145,356,150,362,165,372,171,363,186,367,206,390,227,365,280,336,306,300,304,269,271,275,242,282,232,284,222,293,230,302,233,314,232,323,220,321,208,319,201,342,185,354,179,356,170,349,165,298,165,289,171,293,177,300,182,327,185,307,200,283,210,258,199" shape="poly">
           </area>
           <area  onClick={() => handleImageMapClick('6280000')}target="_blank" alt="인천" title="인천"   coords="188,183,249,184,257,203,278,214,281,235,265,270,181,202" shape="poly"/>
    <area onClick={() => handleImageMapClick('6110000')}target="_blank" alt="서울" title="서울"  coords="282,212,315,198,332,180,305,180,294,175,301,168,346,166,354,174,349,179,322,197,320,220,312,230,295,229,281,222" shape="poly"/>
    <area onClick={() => handleImageMapClick('6430000')}target="_blank" alt="충청북도" title="충청북도" coords="335,308,373,274,392,274,413,267,415,275,433,265,443,276,482,287,457,309,459,318,447,318,437,312,415,324,417,332,405,332,392,346,398,360,390,394,413,398,404,415,399,424,381,428,368,415,356,395,362,373,344,363" shape="poly"/>
    <area onClick={() => handleImageMapClick('5690000')}target="_blank" alt="세종" title="세종"  coords="266,321,325,321,335,328,343,359,310,338,267,337,261,330" shape="poly"/>
    <area onClick={() => handleImageMapClick('6300000')}target="_blank" alt="대전" title="대전"  coords="266,359,270,352,330,352,360,373,341,394,329,388,335,378,311,366,268,366" shape="poly"/>
    <area onClick={() => handleImageMapClick('6440000')}target="_blank" alt="충청남도" title="충청남도"  coords="208,311,251,283,287,293,298,306,334,308,336,325,328,318,264,322,262,330,266,338,309,339,324,349,264,351,265,363,309,366,333,378,328,386,338,394,360,378,356,396,370,423,353,427,340,410,318,414,314,406,287,413,272,422,245,404" shape="poly"/>
    <area onClick={() => handleImageMapClick('6470000')}target="_blank" alt="경상북도" title="경상북도"  coords="396,390,400,360,397,346,407,332,421,338,417,326,438,315,457,322,462,309,485,288,497,293,502,282,537,289,567,283,583,421,577,443,537,448,532,457,536,466,569,464,558,473,529,470,520,481,480,484,473,471,493,460,495,424,478,422,471,412,414,414,407,423,414,432,455,434,462,442,463,450,460,462,467,475,455,478,437,473,431,457,412,447,403,441" shape="poly"/>
    <area onClick={() => handleImageMapClick('6270000')}target="_blank" alt="대구" title="대구"  coords="470,477,462,459,463,441,458,432,416,430,409,422,415,416,472,414,477,422,494,427,492,459,477,468" shape="poly"/>
    <area onClick={() => handleImageMapClick('6310000')}target="_blank" alt="울산" title="울산"  coords="539,465,535,456,540,449,591,443,601,459,573,478,567,494,556,499,531,499,522,495,522,486,528,476,534,471,542,471,551,473,557,475,567,474,571,463" shape="poly"/>
    <area onClick={() => handleImageMapClick('6260000')}target="_blank" alt="부산" title="부산"  coords="502,499,570,498,568,512,535,544,520,554,510,538,532,521,545,515,505,514,502,507" shape="poly"/>
    <area onClick={() => handleImageMapClick('6480000')}target="_blank" alt="경상남도" title="경상남도" coords="404,446,430,459,433,477,470,478,483,485,497,487,518,479,517,493,500,499,504,511,540,514,507,533,484,600,400,601,392,565,372,521,382,501,372,484,387,453" shape="poly"/>
    <area onClick={() => handleImageMapClick('6450000')}target="_blank" alt="전라북도" title="전라북도" coords="253,431,313,408,318,420,341,412,352,428,399,426,403,445,386,451,372,482,379,504,371,521,354,516,336,518,320,520,311,501,305,507,289,496,278,502,221,503,222,474,259,456" shape="poly"/>
    <area onClick={() => handleImageMapClick('6290000')}target="_blank" alt="광주" title="광주" coords="220,504,282,504,293,524,307,531,300,537,288,539,267,519,216,518" shape="poly"/>
    <area onClick={() => handleImageMapClick('6460000')}target="_blank" alt="전라남도" title="전라남도"  coords="282,502,292,499,307,510,313,503,318,522,369,518,401,621,250,678,170,606,206,519,266,522,287,541,306,536,308,527,294,525" shape="poly"/>
    <area onClick={() => handleImageMapClick('6500000')}target="_blank" alt="제주도" title="제주도" coords="213,778,230,761,286,746,296,753,287,779,253,790,224,793" shape="poly"/>
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