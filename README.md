# A_Eye
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/b81fcb02-1485-4ef5-8a0f-ae98df7eb9b2" width="100%" height="100%">

</br>

# 1. 개요
## 💡 프로젝트 소개
### AI를 기반으로 한 맞춤형 광고 송출 및 광고 신청 플랫폼 서비스
  - 엘리베이터 CCTV를 통해 객체를 인식하여, 연령과 성별을 분석한다.
  - 분석된 결과를 기반으로 맞춤화된 광고를 제공한다.
  - 광고주는 노출되기 원하는 연령과 성별을 선택하여 광고를 신청한다.
  - 광고가 재생되는 횟수를 카운트하여 재생된 횟수만큼 결제가 가능하다.

</br>

## 💡 제안배경
- 엘리베이터 시장, 2028년까지 연평균 4.42% 성장 전망
- 전세계 광고비 지출 규모 2023년 대비 2024년 8.2% 증가 예상

- > 타겟팅 광고로 광고 효과 극대화 및 온디멘드 방식으로 사용한 만큼 결제하여 광고비 절감
  
</br>

# 2. 사용 언어
| 구분         | 내용               |
|--------------|-------------------|
| 사용 언어    | <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" /> <img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" /> <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/CSS-239120?style=for-the-badge&logo=css3&logoColor=white" /> |
| DB  | <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black" />|
| API |<img src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png" width="90"> <img src="https://github.com/KIMGUUNI/A_EyeF/assets/142488051/cf812fad-134d-4308-8f9a-b4c73dc10640" width="90"> <img src="https://github.com/KIMGUUNI/A_EyeF/assets/142488051/4df68764-35cb-4886-8d90-f105eb4ccf13" width="90">|
| BACK-END  |  <img src="https://blog.kakaocdn.net/dn/bpMn1w/btqEbuwPNvX/VNyzW4QFj1NGoCuQB3EwG0/img.jpg" height="30">|
| storage   | <img src="https://techrecipe.co.kr/wp-content/uploads/2020/08/200824_Google-Drive_001.jpg" width="100">  |
| 라이브러리| <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTc1aov4a4ONcOBVIXydQjhh5intGt6j8yz5D9vdHe4p-gJAth-jzTUsaMS9cyMpQy66Q&usqp=CAU" width="80">  |
| WebServer    | <img src="https://images.velog.io/images/dbfudgudals/post/2ec0586e-1d62-475d-85c4-0f78b9d2fc34/image.png" width="100">    |
| IDE   | <img src="https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=eclipse&logoColor=white" /> |

</br>

# 3. ERD 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/142488051/d002a731-40eb-4bec-9337-c2773b836a6a" width="100%" height="100%">

</br>

# 4. 시스템 아키텍처 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/118683437/25ef6622-a5e7-499e-8194-a85fb37de62d" width="100%" height="100%">

</br>

# 5. 시스템 흐름도 
<img src = "https://github.com/KIMGUUNI/A_EyeF/assets/118683437/cf6d6b0c-e1b0-4fe7-8c0f-80bb4685b7fc" width="100%" height="100%">

</br>

# 6. 기능

<details>

<summary>기능 보기</summary>

## 6.1 Security
![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/236167f1-2452-4775-bf4b-b063490f5811)

- JWT를 통해 페이지 권한 부여한다.
- 비밀번호를 암호화 한다.

</br>

## 6.2 객체 인식

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/35f870a4-92a9-4826-a4b3-ee89c3f1721b)


- YOLOv8을 통해 객체의 얼굴을 인식한다.
- CNN기반의 모델을 통해 나이와 성별을 예측한다.
- 예측된 값을 SQS Message Body에 담아 전송한다.

</br>

## 6.3 광고 송출

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/ff2119fd-ec08-46d3-accf-dda6792282e1)
![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/baf10eb0-9b1a-4bd8-ab9c-5b837b131dc7)



  - Message로 Lambda 함수 트리거가 작동한다.
  - S3 객체 URL 반환 후 API Gateway WebSocket으로 실시간으로 영상이 송출된다.

</br>

## 6.4 광고 신청
![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/a45c5e19-6983-4967-8d83-52d0f6b00479)



  - 사용자는 원하는 타겟의 성별과 연령을 선택한다.
  - 선택 후 광고 파일을 업로드한다.
  - 광고 신청 버튼을 클릭하면 데이터베이스 및 S3에 정보가 저장된다.

</br>

## 6.5 광고 승인

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/08cb2c11-c304-4a9b-be74-b9fa29640e87)

  - 광고 승인 대기 목록들이 보여진다.
  - 광고 승인 시, 기존 S3 URL 파일을 복사하여 새로운 폴더에 저장되고 기존의 파일은 삭제된다.


</br>

## 6.6 대시보드

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/a4b672bb-3706-4d58-ae6c-86527aa44961)
  
  - 클릭된 광고의 정보를 확인할 수 있다.
  - 클릭된 광고의 노출 횟수와 광고 타겟 정보가 대시보드로 보여진다.

</br>

## 6.7 광고 결제

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/8547053a-4efc-4f9e-9e1f-a770c049d704)


  - 신청한 광고의 현재 재생 횟수에 따른 결제 금액이 보여진다.
  - 결제를 원하는 광고를 선택하여 결제 가능하다.
  - 간편 결제가 가능하다. (카카오페이,삼성페이 등)

</br>

## 6.8 문의글 답변 및 삭제

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/20c8f44e-0cf9-45d6-a8dd-5c8a1dc61890)

  - 사용자는 문의글 작성이 가능하다.
  - 관리자는 모든 문의 내용 열람, 답변 및 삭제가 가능하다.

</br>

## 6.9 반응형 웹

![image](https://github.com/KIMGUUNI/A_EyeF/assets/118683437/20b82c41-1e28-4d95-9618-e1d76044d502)

  - 화면 크기에 따라 최적화되는 반응형 웹 페이지를 구현했다.

</details>





</br>

# 10. API 
날씨 https://openweathermap.org/

뉴스 https://newsapi.org/

결제 https://portone.io/
